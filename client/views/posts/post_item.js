var POST_HEIGHT = 250;
var Positions = new Meteor.Collection(null);


Template.postItem.helpers({


  removeWookMarkOnSmallScreen: function() {
   if( !Session.get('removeWookMarkOnSmallScreen')){

return 'myElements';

   }
   return '';
    },


  /* photos: function () {

     return Photos.findOne({'_id':this.photoId});// ,{sort: {"createdAt": -1}});
    },*/

     image: function () {

     return Photos.findOne({'_id':this.photoId}).image;// ,{sort: {"createdAt": -1}});
    },

 photoexist: function () {

      if(this.photoId != ''){
 //Meteor.subscribe('photos',this.photoId);
  Session.set('photoForItem', this.photoId);
 return true;
}
        return false;
    },

  activeRoute: function() {
   /* var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.name === name
    });*/
    
if (Router.current().route.name    === 'postPage'){
  return false;
} else{
    return true;
  }
  },


date: function date(){

 test = (new Date(this.submitted)).toISOString()
return jQuery.timeago(test);   
},


comments: function() {
    return Comments.find({postId: this._id});
  },

 showComments: function(commentsCount) {
    return commentsCount!==0;
  },

  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return true;
    } else {
      return false;
    }
  },

   upvotedClass2: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'upvotable';
    } else {
      return '';
    }
  },

     postWidth: function() {
   
if (Router.current().route.name    === 'postPage'){
     return '';
    } else {
        return 'post-width';
    
    }
  },
  attributes: function() {
  /*  var post = _.extend({}, Positions.findOne({postId: this._id}), this);
    var newPosition = post._rank * POST_HEIGHT;
    var attributes = {};
    
    if (_.isUndefined(post.position)) {
      attributes.class = 'post invisible';
    } else {
      var delta = post.position - newPosition;      
      attributes.style = "top: " + delta + "px";
      if (delta === 0)
        attributes.class = "post animate"
    }
    
    Meteor.setTimeout(function() {
      Positions.upsert({postId: post._id}, {$set: {position: newPosition}})
    });
    
    return attributes;
    */
  }
});

Template.postItem.events({


'click .removalRequest': function(e) {
    e.preventDefault();
    
r = confirm("Remove post?");

if (r === true) {
   var currentPostId = this._id;
      Posts.remove(currentPostId);
      history.back();
//Router.go('newPosts');
}

    },



'click .showPlaceToComment': function(e) {
    e.preventDefault();

},

  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  },


    'click .flag': function(e) {
    e.preventDefault();
    Meteor.call('flagUp', this._id);
  },

  });
/*
 'click .discuss': function(e) {
    e.preventDefault();
Session.set('postPagePhoto',this.photoId);
  },

*/


/*
 'click .makeCommentsGoAway': function(e) {
    e.preventDefault();
    

var $myself = $(e.target);
       
   //$('.overlay').css("display","block");
   //$($me).next(".writeComment").removeClass('.writeComment')
   $($myself).closest('.writeComment').css("display","none").fadeOut(1000);
  $($myself).css("visibility","hidden").fadeOut(1000);
//$($me).css("visibility","visible");

$('.goAway').css("visibility","visible");
$('.goAway').css("display","inline-block");

  },*/
/*
 'click .goAway': function(e) {
  e.preventDefault();

Meteor.subscribe('comments',this._id);


  var $me = $(e.target);
       
   //$('.overlay').css("display","block");
   //$($me).next(".writeComment").removeClass('.writeComment')
   $($me).next('.writeComment').css("display","block").hide().fadeIn(1000);
  $($me).css("visibility","hidden").fadeOut(1000);
  $('.makeCommentsGoAway').css("visibility","visible");
$('.makeCommentsGoAway').css("display","inline-block");
 }*/








  



