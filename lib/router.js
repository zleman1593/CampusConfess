 var subs = new SubsManager();

var subs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 50,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 10
});

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
  fastRender: true,
/*
  action: function() {
    if(this.ready()) {
       this.layout("layout")
      this.render();  //render your templates as normal when data in onWait is ready
    } else {
      this.render('loading');
    }
  },
*/
  template: 'postsList',
  increment: 10, 
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
onBeforeAction:  function() {//The wait on is a better idea, but doe snot seem to be working right now.
 Session.set('loadingMore',true);

 setTimeout(reset, 1000);

function reset() {
  Session.set('loadingMore',false);

}

if(this.limit() > 10) {
return subs.subscribe('postsWithPhotos', getSchoolFromUser(),this.findOptions());
} 


if(this.limit() == 10) {
  scroll(0,0);
  }
     //return Meteor.subscribe('posts', getSchoolFromUser(),this.findOptions());
     //return Meteor.subscribe('postsWithPhotos', getSchoolFromUser(),this.findOptions());
  },

  waitOn: function() {
    //return Meteor.subscribe('posts',this.findOptions());
if(this.limit() > 10) {

} else{
  return subs.subscribe('postsWithPhotos', getSchoolFromUser(),this.findOptions());
}
    // return Meteor.subscribe('posts', getSchoolFromUser(),this.findOptions());
  },
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
  onBeforeAction: function(blank) {
 Session.set('numberOfNewPost',0);
 $('.glyphicon-time').removeClass("symbols2");
       $('active').removeClass("red");
 },

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
template: 'termsAndConditions',
onBeforeAction: function(){
  fadeContentIn();
}
  });

 this.route('initialMenu', {
    path: '/',
    layoutTemplate: 'startPage',
    /*onBeforeAction: function(){
      return Meteor.subscribe('postsWithPhotos', getSchoolFromUser(),{sort: {submitted: -1, _id: -1}, limit: 10});
    }*/
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
    onBeforeAction: function(){
  fadeContentIn();
},
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
    onBeforeAction: function(){
  fadeContentIn();
},
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
    onBeforeAction: function(){



  fadeContentIn();
},
    yieldTemplates: {
      'header': {to: 'header'},
      'footer': {to: 'footer'}
    },
    waitOn: function() {

      console.log('martin' + !!Posts.findOne(this.params._id));
      return [
        subs.subscribe('singlePost', this.params._id),
        subs.subscribe('comments', this.params._id),
        subs.subscribe('photos',this.params._id),
      ];
    },
    data: function() { return Posts.findOne(this.params._id); },
    post: function() { return Posts.findOne(this.params._id); }
  });

  /*this.route('postEdit', {
    path: '/posts/:_id/edit',
    waitOn: function() { 
      return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() { return Posts.findOne(this.params._id); }
  });
  */

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

/*Router.onBeforeAction(function() { 

  scroll(0,0) });//,{except:['newPosts','bestPosts','mostCommentedPosts']});
*/
Router.onAfterAction(function() { 


if ($('.myElements').wookmarkInstance) {
            $('.myElements').wookmarkInstance.clear();
          }

setTimeout(doSomething, 500);

function doSomething() {
   //do whatever you want here

        handler = $('.myElements');
          handler.wookmark( {
          // Prepare layout options.
          autoResize: true, // This will auto-update the layout when the browser window is resized.
          container: $('.js-masonry'), // Optional, used for some extra CSS styling
          offset: 5, // Optional, the distance between grid items
          outerOffset: 20, // Optional, the distance to the containers border
          //itemWidth: 310 // Optional, the width of a grid item
          fillEmptySpace: false // Optional, fill the bottom of each column with widths of flexible height
         
    
      });

}

});



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
//Router.onBeforeAction(fadeContentIn);

var getSchoolFromUser = function() {
if (Meteor.user()){

return Meteor.user().school.toLowerCase();

}
return null;


};


