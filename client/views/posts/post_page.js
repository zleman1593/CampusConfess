Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  },

  owner: function() {
   /* var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.name === name
    });*/
    
//if (Router.current().route.name   === 'postPage' && Session.get('postPagePhoto') === 0 && this.userId == Meteor.userId()){
if (Router.current().route.name   === 'postPage'  && this.userId == Meteor.userId()){
  return true;
} else{
    return false;
  }
  },
});


Template.postPage.events({
"click .photo-link": function (e, template) {
      MeteorCamera.getPicture(function (error, data) {
        // we have a picture
        if (!error) {
          onSuccess(data, template);
        } else{
          alert('Error');
        }
      });
    },
});




var onSuccess = function (imageData, template) {
alert('test');
   var data = {
      imageData: imageData,
      postId: template.data._id
    };

  Meteor.call('submitPhoto', data, function(error, photoId) {
      if (error){
        alert('meteor method error');
        throwError(error.reason);
      } else {
          alert('Sucess');
      }
    });

}