//IronRouterProgress.configure({spinner : false});


Template.pref.helpers({


first: function() {
    if(Meteor.user().tagParts[0]){
        
        return Meteor.user().tagParts[0];

    } else{
        return 'First name'
    }
    },

last: function() {
             return Meteor.user().tagParts[2];
    },


nick: function() {
            return Meteor.user().tagParts[1];
    },

tags: function() {
            return Meteor.user().tag[0];
    },



    email: function() {
        return Meteor.user().emails[0].address;
    },



    userName: function() {

return GetEmailParts(Meteor.user().emails[0].address).user;

},
 school: function() {

return Meteor.user().school;

}


});



Template.pref.events({

'click .verifyName': function(e) {
    e.preventDefault();

var r =  confirm('This will give you the option to use your real name while commenting, but commenting will always default to anonymous. Verify with Facebook? ');

if (r == true) {

name = 'placeholder';
    alert('Name Verified: ' + name);
} else {

}

},



'click .logOut': function(e) {
    e.preventDefault();
    Router.go('newPosts');
Meteor.logout();
},
'click .removeAccount': function(e) {
    e.preventDefault();
var r =  confirm('Are you sure you want to permanently delete this account?');

if (r == true) {

Meteor.users.remove(Meteor.userId()); 
    alert('Your account has now been deleted');
} else {

}
 
},
});




var GetEmailParts = function(strEmail) {
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
                new RegExp("^(.+)@(.+)\\.(\\w+)$", "i"),

                // Send the match to the sub-function.
                function($0, $1, $2, $3) {
                    objParts.user = $1;
                    console.log("user: " + $1);
                    objParts.domain = $2;
                    console.log("domain: " + $2);
                    console.log($2);
                    console.log("log: " + $2);
                    objParts.ext = $3;
                }
            );

            // Return the "potentially" updated parts structure.
            return (objParts);
        }