Template.startPage.events({
    'click .confessions': function(e) {
    e.preventDefault();
  $(this).removeClass('magictime puffIn');
  $('.missed').removeClass('magictime puffIn');
   $('.about').removeClass('magictime puffIn');
   $('.welcometitle').removeClass('magictime puffIn');
  $(this).addClass('magictime tinLeftOut');
     $('.missed').addClass('magictime tinLeftOut');
     $('.about').addClass('magictime tinLeftOut');
          $('.welcometitle').addClass('magictime tinLeftOut');

var tester = function () {
 //Session.set('showChoicePage', false);

      Router.go('bestPosts');}
      var fader = function () {
         $('.macawBody').addClass('animated  fadeOut ');}
setTimeout(fader,500);
 setTimeout(tester,1000);

    },
  

  'click .missed': function(e) {
    e.preventDefault();
 $(this).removeClass('magictime puffIn');
  $('.confessions').removeClass('magictime puffIn');
   $('.about').removeClass('magictime puffIn');
      $('.welcometitle').removeClass('magictime puffIn');
  $(this).addClass('magictime tinLeftOut');
     $('.confessions').addClass('magictime tinLeftOut');
     $('.about').addClass('magictime tinLeftOut');
        $('.welcometitle').addClass('magictime tinLeftOut');
var tester = function () {
 //Session.set('showChoicePage', false);

      Router.go('bestPosts');}
      var fader = function () {
         $('.macawBody').addClass('animated  fadeOut ');}
setTimeout(fader,500);
 setTimeout(tester,1000);

    },


 'click .about': function(e) {
    e.preventDefault();
     $(this).removeClass('magictime puffIn');
  $('.confessions').removeClass('magictime puffIn');
   $('.missed').removeClass('magictime puffIn');
      $('.welcometitle').removeClass('magictime puffIn');
  $(this).addClass('magictime tinLeftOut');
     $('.confessions').addClass('magictime tinLeftOut');
     $('.missed').addClass('magictime tinLeftOut');
        $('.welcometitle').addClass('magictime tinLeftOut');
var tester = function () {
 //Session.set('showChoicePage', false);
      Router.go('about');}
      var fader = function () {
         $('.macawBody').addClass('animated  fadeOut ');}
setTimeout(fader,500);
 setTimeout(tester,1000);
},


});