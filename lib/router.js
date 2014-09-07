 SinglePageLogin.config({
      loginTitle: ' ',
      signupTitle: ' ',
      forgotPasswordTitle: 'Retrieve password',
      canRetrievePassword: true,
      passwordSignupFields: 'EMAIL_ONLY',
      forbidClientAccountCreation: false,
      routeAfterLogin: '/',
      routeAfterSignUp: '/',
      forceLogin: true,
  });

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { 
    return [Meteor.subscribe('notifications'), Meteor.subscribe('userData')];
  }
});

PostsListController = RouteController.extend({


  template: 'postsList',
  increment: 5, 
 yieldTemplates: {
      'header': {to: 'header'},
      'footer': {to: 'footer'}
    },
  limit: function() { 
    return parseInt(this.params.postsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.limit() };
  },
waitOn:  function() {//The wait on is a better idea, but doe snot seem to be working right now.

 return Meteor.subscribe('postsWithPhotos', getSchoolFromUser(),this.findOptions());

     //return Meteor.subscribe('posts', getSchoolFromUser(),this.findOptions());
  },

  /*waitOn: function() {
    //return Meteor.subscribe('posts',this.findOptions());
     return Meteor.subscribe('posts', getSchoolFromUser(),this.findOptions());
  },*/
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.limit();
    return {
      posts: this.posts(),
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

NewPostsListController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},

  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.limit() + this.increment})
  }
});

BestPostsListController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  onBeforeAction: function(blank) {
   this.layout("layout")
  },
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.limit() + this.increment});
  }
});




mostCommentedPostsListController = PostsListController.extend({
  sort: {commentsCount: -1, votes: -1, submitted: -1, _id: -1},
  onBeforeAction: function(blank) {
   this.layout("layout")
  },
  nextPath: function() {
    return Router.routes.mostCommentedPosts.path({postsLimit: this.limit() + this.increment});
  }
});

Router.map(function() {

  this.route('termsAndConditions', {
    path: '/termsAndConditions',
template: 'termsAndConditions'
  });

 this.route('initialMenu', {
    path: '/',
    layoutTemplate: 'startPage'
  });


  this.route('newPosts', {
    path: '/new/:postsLimit?',
    controller: NewPostsListController
  });


  this.route('mostCommentedPosts', {
    path: '/mostCommentedPosts/:postsLimit?',
    controller: mostCommentedPostsListController
  });

  this.route('about', {
    path: '/about',
yieldTemplates: {
      'header': {to: 'header'},
      'footer': {to: 'footer'}
    },
    waitOn: function() {
    //return  [Meteor.subscribe('userData')]
      
  },
  template: 'about'
  });

 this.route('pref', {
    path: '/pref',
yieldTemplates: {
      'header': {to: 'header'},
      'footer': {to: 'footer'}
    },
    waitOn: function() {
    //return  [Meteor.subscribe('userData')]
      
  },
  template: 'pref'
  });


  
  this.route('bestPosts', {
    onBeforeAction: function(blank) {
  },
    path: '/best/:postsLimit?',
    controller: BestPostsListController
  });
  
  this.route('postPage', {
    path: '/posts/:_id',
    yieldTemplates: {
      'header': {to: 'header'},
      'footer': {to: 'footer'}
    },
    waitOn: function() {

      
      return [
        Meteor.subscribe('singlePost', this.params._id),
        Meteor.subscribe('comments', this.params._id),
        Meteor.subscribe('photos',this.params._id),
      ];
    },
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('postEdit', {
    path: '/posts/:_id/edit',
    waitOn: function() { 
      return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() { return Posts.findOne(this.params._id); }
  });
  
  this.route('postSubmit', {
    path: '/submit',
    layoutTemplate: 'postSubmitOuter',
     yieldTemplates: {
      'header': {to: 'header'},
      'footer': {to: 'footer'}
    },
  template: 'postSubmit',
    progress: {enabled: false}
  });
});


requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    
    pause();
  }
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {except:['singlePageLogin','singlePageSignUp','singlePageForgotPassword','about','termsAndConditions']});
Router.onBeforeAction(function() { 

  clearErrors() },{only: ['pref', 'postPage']});

Router.onBeforeAction(function() { 

  scroll(0,0) });//,{except:['newPosts','bestPosts','mostCommentedPosts']});

/*
Router.onAfterAction(function() { 


setTimeout(function(){
alert(Session.get('currentScroll'));
  window.scrollTo(0, 5000);}, 2000);

   });

*/


animateContentOut = function() {
    
    return $('footer').addClass("hide");
}

fadeContentIn = function() {
    $('#main').addClass("animated fadeInRight");
    $('.small-title').addClass("animated fadeInRight");
     $('.glyphicon-chevron-left').removeClass("animated fadeInRight");

setTimeout(doSomething, 2000);

function doSomething() {
  $('#main').removeClass("animated fadeInRight");
  $('.small-title').addClass("animated fadeInRight");
   $('.glyphicon-chevron-left').removeClass("animated fadeInRight");

}

    return $('footer').removeClass("hide");
}

// define this as a global onAfterAction so it happens all the time
//Router.onAfterAction(fadeContentIn);

// define this as a global onBeforeAction so it happens all the time
Router.onBeforeAction(fadeContentIn);

var getSchoolFromUser = function() {
if (Meteor.user()){

return Meteor.user().school.toLowerCase();

}
return null;


};


