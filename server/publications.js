Meteor.publish('posts', function(school, options) {
  return Posts.find({flagCount: {$lt: 5}, school: school }, options);
});

Meteor.publish('postsWithPhotos', function(school, options) {


var posts = Posts.find({flagCount: {$lt: 5}, school: school }, options);
 var postIds = posts.map(function(p) { return p._id });
console.log(postIds);
var test = Photos.find({postId: {$in: postIds}});
  return [
posts,test]
});





Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id);
});


Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

Meteor.publish('photos', function(postId) {
  return Photos.find({postId:postId});
});

Meteor.publish('photosWithPhotoId', function(photoId) {
  return Photos.find(photoId);
});

Accounts.onCreateUser(function(options, user) {
 
var emailInfo = _.find(user.emails, function(thisEmail) { return thisEmail });
var email =  emailInfo["address"];
var tag = [];
var tagParts = [];


function GetEmailParts( strEmail ){
    // Set up a default structure with null values 
    // incase our email matching fails.
    var objParts = {
        user: null,
        domain: null,
        ext: null
        };
    
    // Get the parts of the email address by leveraging
    // the String::replace method. Notice that we are 
    // matching on the whole string using ^...$ notation.
   strEmail.replace( 
        new RegExp( "^(.+)@(.+)\\.(\\w+)$" , "i" ), 
        
        // Send the match to the sub-function.
        function( $0, $1, $2, $3 ){
            objParts.user = $1;
            console.log( "user: " + $1);
            objParts.domain = $2;
             console.log( "domain: " + $2);
            console.log($2);
              console.log( "log: " + $2);
            objParts.ext = $3;
        }
        );
    
    // Return the "potentially" updated parts structure.
    return( objParts );
}



 //user.school =  GetEmailParts(email).domain;
schools = [{'schoolName': 'Bowdoin College','emailDomain': 'bowdoin' },{'schoolName': 'University of New Hampshire','emailDomain': 'unh' }];//temp data structure
 //obj = _.find(schools, function(obj) { return obj.emailDomain == GetEmailParts(email).domain });
  var emailDomain = GetEmailParts(email).domain;
for (i = 0; i < schools.length; i++) { 

emailDomain.indexOf(schools[i].emailDomain) > -1;
if (emailDomain.indexOf(schools[i].emailDomain) > -1){
var schoolName = schools[i].schoolName;
  break;
}
}


user.school = schoolName;

  return user;
});




Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                              {fields: {'school': 1, 'tagParts': 1, 'tags': 1}});
                          
  } else {
    this.ready();
  }
});

   Accounts.validateLoginAttempt(function(parameters) {

      if (parameters.user && parameters.user.emails && (parameters.user.emails.length > 0)) {
        // return true if verified email, false otherwise.
        var found = _.find(
                           parameters.user.emails, 
                           function(thisEmail) { return thisEmail.verified }
                          );

        if (!found) {
          throw new Meteor.Error(333, 'Thank you for registering. Please open your confirmation email to complete registration.');
        }
        return found && parameters.allowed;
      } else {
        console.log("user has no registered emails.");
        return false;
      }
    });

