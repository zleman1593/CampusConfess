
Session.set('loadingMore',true);
 Session.set('numberOfNewPost',0);
Session.set('submit', false);


Template.postsList.created = function() {

$(".photoExists a:lang(it)").fancybox({
      openEffect  : 'elastic',
      closeEffect : 'elastic',

      helpers : {
        title : {
          type : 'inside'
        }
      }
    });


$(".popup-with-form").fancybox({
    maxWidth  : 800,
    maxHeight : 600,
    fitToView : false,
    width   : '70%',
    height    : '70%',
    autoSize  : false,
    closeClick  : false,
    openEffect  : 'none',
    closeEffect : 'none'
  });


 $('.popup-with-form').magnificPopup({
    type: 'inline',
    preloader: false,
    //focus: '#name',

    // When elemened is focused, some mobile browsers in some cases zoom in
    // It looks not nice, so we disable it:
    callbacks: {
      beforeOpen: function() {
        alert('alive');
        if($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = '#name';
        }
      }
    }
  });

};

Template.postsList.rendered = function() {
   $('.js-masonry').magnificPopup({
        delegate: '.photoExists a:lang(it)',
        type: 'image',
        gallery: {
          enabled: true,
        },
      image: {
    tError: 'No image is associated with this submission.' // Error message when image could not be loaded
  },
      });
 

  handler = $('.myElements');

      handler.wookmark({
          // Prepare layout options.
          autoResize: true, // This will auto-update the layout when the browser window is resized.
          container: $('.js-masonry'), // Optional, used for some extra CSS styling
          offset: 5, // Optional, the distance between grid items
          outerOffset: 20, // Optional, the distance to the containers border
          //itemWidth: 400, // Optional, the width of a grid item
          fillEmptySpace: false // Optional, fill the bottom of each column with widths of flexible height
      });

      $('.popup-with-form').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#name',

    // When elemened is focused, some mobile browsers in some cases zoom in
    // It looks not nice, so we disable it:
    callbacks: {
      beforeOpen: function() {
        if($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = '#name';
        }
      }
    }
  });


/*$('.popup-youtube').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });*/


};

Template.postsList.helpers({

removeWookMarkOnSmallScreen: function() {
   if( !Session.get('removeWookMarkOnSmallScreen')){

return 'masonry_container';

   }
   return '';
    },

    removeWookMarkOnSmallScreenPart2: function() {
   if( !Session.get('removeWookMarkOnSmallScreen')){

return 'js-masonry';

   }
   return '';
    },


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
'click #example-offset-pixels': function(e) {




}
});
/*
var allEdus = parseEduFile('/rawSchools.txt');

alert(Meteor.call('parseEduFile', allEdus ));
*/

/*
'click .load-more': function(e) {
  //var currentScroll = window.pageYOffset;

  var node = e.getDOMNode();
  node.scrollTop = node.scrollHeight;
alert( node.scrollTop);
//Session.set('currentScroll', node.scrollTop);
},
*/



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





