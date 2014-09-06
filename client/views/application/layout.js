



Template.layout.events({
'click #logOut': function(e) {
    e.preventDefault();
Meteor.logout();
}



});



  var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled+700) + 'px');
}

$(window).scroll(function(e){
    parallax();
    var s = $(window).scrollTop(),
            d = $(document).height(),
            c = $(window).height(),
            opacityVal = (s / 550);
        $('.blurred-image').css('opacity', opacityVal);
});

/*Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY'
});*/
