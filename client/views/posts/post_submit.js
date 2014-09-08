 Session.set('photoId', '');



Template.postSubmit.helpers({


alreadTookPhoto: function () {

if (Session.get('photoId') == '') {

  return true;
} else{
return false;
}
  },
});

Template.photoToSubmit.helpers({


 photo: function () {
//if (Session.get('photoId') != ''){
return   Photos.findOne(Session.get('photoId'));
      //return Photos.find({ '_id':Session.get('photoId')});

   // } else {
 //return Photos.find({});

  //  }
    },


    });

Template.postSubmit.events({

"click .add-photo-main-page": function (e, template) {
      MeteorCamera.getPicture(function (error, data) {
        // we have a picture
        if (!error) {
          onSuccess(data, template);

        } else{
          alert('Error');
        }
      });
    },


'click .closeSubmit': function(e) {
    e.preventDefault();
    
  $('.main-submit').addClass('magictime slideUp');
    $('.posts').addClass('magictime slideUpLess');
   
  
setTimeout(doSomething, 500);

function doSomething() {
    Session.set('submit', false);
  $('.post-confession').addClass('animated fadeIn');
 //$('.main-submit').removeClass('magictime slideUp');
  $('.posts').removeClass('magictime slideUpLess');

}

    },



  'submit form': function(e) {
    e.preventDefault();


var textbox = document.getElementById("confession");
    if(textbox.value.length >= 180 || Session.get('photoId') != ''){
    
    if(textbox.value.length >= 10) {

     $('.main-submit').addClass('magictime slideUp');

    var post = {
      confession: $(e.target).find('[name=confession]').val(),

      photoId: Session.get('photoId'),
    }
    
    Meteor.call('post', post, Session.get('photoId'), function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        
        if (error.error === 302)
          Router.go('postPage', {_id: error.details})
      } else {
         Session.set('submit', false);
      }
    });
        photoId: Session.set('photoId', '');

 Router.go('newPosts');
} else {
  alert('Please type a bit more');
 }

 } else {
  alert('Please type a bit more');
 }

   }
});



var onSuccess = function (imageData, template) {
  Meteor.call('submitPhotoAndPost', imageData, function(error, photoId) {
      if (error){
        alert('Could not save photo');
        throwError(error.reason);
      } else {
 Meteor.subscribe('photosWithPhotoId', photoId);
Session.set('photoId', photoId);

      }
    });

}

