Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: ownsDocument
});
/*
createCommentNotification = function(comment) {
  var post = Posts.findOne(comment.postId);
 // if (comment.userId !== post.userId) {
    Notifications.insert({
      userId: comment.personTagged,
      postId: post._id,
      commentId: comment._id,
      commenterName: comment.commenter,
      read: false
    });
 // }
};

*/