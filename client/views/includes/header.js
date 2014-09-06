Template.header.helpers({


 school: function(){

 if (Meteor.user()){

      function capitaliseFirstLetter(string){
          return string.charAt(0).toUpperCase() + string.slice(1);
      }
      return capitaliseFirstLetter(Meteor.user().school.toLowerCase());
}

return '';

  },


  title: function() {

   /* var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.name === name
    });*/
    
if (Router.current().route.name    === 'postPage'){

  return 'Confession Details';
} else if (Router.current().route.name   === 'pref'){
    return 'Preferences';
  }
  return '';
  },


activeRoute: function() {

//$(".navbar").off( "touchstart", ".glyphicon-chevron-left");
//$(".glyphicon-chevron-left").off( "click");

/*function notify() {
   e.preventDefault();
history.back();
}

$( ".glyphicon-chevron-left").on( "touchstart", notify );*/

   /* var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.name === name
    });*/
    
if (Router.current().route.name    === 'postPage' || Router.current().route.name    === 'pref'){

  return false;
} else{
    return true;
  }
  },

	
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.name === name
    });
    
    return active && 'active';
  }
});

Template.header.events({


'click li': function(e) {
        // check if window is small enough so dropdown is created
    $(".navbar-collapse").removeClass("in").addClass("collapse");
  

},

'click #logOut': function(e) {
    e.preventDefault();
Meteor.logout();
},



'click .glyphicon-chevron-left' : function(e) {
    e.preventDefault();
history.back();

},

'click .discuss' : function(e) {
    e.preventDefault();
history.back();

},

/*

'touchstart .glyphicon-chevron-left' : function(e) {
    e.preventDefault();
history.back();
     // e.stopPropagation();
  //    history.back();
//history.back();
//Location.back();
},

*/


'click .navSubmit': function(e) {
    e.preventDefault();
 Session.set('submit', true);
},


});
/*
Touche($('.glyphicon-chevron-left')).on('click', handleClicks);


function handleClicks(){
alert('touch');


};*/


//href="{{pathFor 'newPosts'}}"

