Posts = new Meteor.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({

  post: function(postAttributes,photoId) {
    var user = Meteor.user();
    
    
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new confessions");
    
    
    // pick out the whitelisted keys
    var post = _.extend(_.pick(postAttributes,'confession','photoId'), {
      userId: user._id, 
      author: user.username, 
      submitted: new Date().getTime(),
      commentsCount: 0,
      flagCount: 0,
      flaggers: [], 
      school: Meteor.user().school,
      upvoters: [],
      votes: 0,
      baseScore: 0,
      score: 0,
      inactive: false,
    });
    
    var postId = Posts.insert(post);


 Photos.update({_id: photoId}, {
      $set: {"postId": postId}}
      );


    
    return postId;
  },
  
  upvote: function(postId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to upvote");
    
    Posts.update({
      _id: postId, 
      upvoters: {$ne: user._id}
    }, {
      $addToSet: {upvoters: user._id},
      $inc: {votes: 1}, 
    });
  },


  flagUp:function(postId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to flag");
     Posts.update({
      _id: postId,
      flaggers: {$ne: user._id}, 

    }, {
      $inc: {flagCount: 1},
      $addToSet: {flaggers: user._id},
    });
     // alert('This post has been flagged as inappropriate. Thank you');
  }
});