Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  },

  owner: function() {
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
   var data = {
      imageData: imageData,
      postId: template.data._id
    };

  Meteor.call('submitPhoto', data, function(error, photoId) {
      if (error){
        throwError(error.reason);
      } else {
      }
    });

}