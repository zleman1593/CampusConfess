

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();
     if (confirm("Request Removal of your post?")) {
 var currentPostId = this._id;
            var postProperties = {
            reason: $(e.target).find('[name=reason]').val()};
            // add to the to be reviewed queue
             //Posts.update(currentPostId, {$inc: {flagCount: 58}});
              Router.go('newPosts');

      }
}
  
  
});
