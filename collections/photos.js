Photos = new Meteor.Collection("photos");






  Meteor.methods({


submitPhotoAndPost:  function(imageData) {

     var photoId = Photos.insert({
      image: imageData,
      createdAt: new Date(),
    });



return photoId;

},





  submitPhoto: function(data) {
    imageData = data.imageData;
    postId = data.postId;
    //alert(imageData);
     //alert(postId);
     var photoId = Photos.insert({
      image: imageData,
      createdAt: new Date(),
      postId: postId,
    });



    Posts.update({_id: postId}, {
      $set: {"photoId": photoId}}
      );


}
});