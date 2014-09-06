Comments = new Meteor.Collection('comments');

Meteor.methods({
  comment: function(commentAttributes) {
    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to make comments");
      
    if (!commentAttributes.body)
      throw new Meteor.Error(422, 'Please write some content');
      
    if (!post)
      throw new Meteor.Error(422, 'You must comment on a post');
    
    comment = _.extend(_.pick(commentAttributes, 'postId', 'body', 'commenter','tag'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });
    
    // update the post with the number of comments
    Posts.update(comment.postId, {$inc: {commentsCount: 1}});
    
    // create the comment, save the id
    comment._id = Comments.insert(comment);
    


   /* console.log(comment.tag);
    var userTagged = Users.findOne({'nameTag':comment.tag[0]});
   // TODO: restrict to search people at this school
    // now create a notification, informing the user that there's been a comment
    if (userTagged) {
      comment = _.extend(comment, {personTagged:userTagged})
    createCommentNotification(comment);

  }*/
    
    return comment._id;
  }
});