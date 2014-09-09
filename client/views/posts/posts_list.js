
Session.set('submit', false);



Template.postsList.rendered = function() {
  $('#example-offset-pixels').get(0).click();
/*

$('#example-offset-pixels').waypoint(function() {
   //Router.go('nextPath');
alert('here');
$('#example-offset-pixels').get(0).click();
}, { offset: '50%' });*/

      /*function onScroll() {
        // Check if we're within 100 pixels of the bottom edge of the broser window.
        var winHeight = window.innerHeight ? window.innerHeight : $window.height(), // iphone fix
            closeToBottom = ($window.scrollTop() + winHeight > $document.height() - 300);

        if (closeToBottom) {
        Router.go('nextPath');
        }
      };


  window.onscroll = onScroll();*/
};

Template.postsList.helpers({
  postsWithRank: function() {
    this.posts.rewind();
    return this.posts.map(function(post, index, cursor) {
      post._rank = index;
      return post;
    });
  },

submit: function() {
   return  Session.get('submit');
    }
 


});



Template.postsList.events({
'click .post-confession': function(e) {
    e.preventDefault();
/*

var allEdus = parseEduFile('/rawSchools.txt');

alert(Meteor.call('parseEduFile', allEdus ));
*/
Session.set('submit', true);

},
/*
'click .load-more': function(e) {
  //var currentScroll = window.pageYOffset;

  var node = e.getDOMNode();
  node.scrollTop = node.scrollHeight;
alert( node.scrollTop);
//Session.set('currentScroll', node.scrollTop);
},
*/

});

/*
function parseEduFile(path) {
  var allEdus = [];
    $.get(path, function(data) {
        var lines = data.split('\n');

        for(var i = 0; i < lines.length; i++) {
      var data = lines.split(': ');
      allEdus.push({
        name: data[1],
        edu: data[0]
      });
    }
    });
    return allEdus;
};
*/


