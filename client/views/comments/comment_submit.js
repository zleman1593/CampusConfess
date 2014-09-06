Session.set('commenter','Anonymous');
Session.set('clickedAlready',false);


Template.commentSubmit.events({


  'submit form': function(e, template) {
    e.preventDefault();
    
    var $body = $(e.target).find('[name=body]');



var words =  $body.val();
var tagslistarr = words.split(' ');
var arr=[];
$.each(tagslistarr,function(i,val){
    if(tagslistarr[i].indexOf('#') == 0){
      arr.push(tagslistarr[i]);  
    }
});

    var comment = {
      body: $body.val(),
      postId: template.data._id,
      commenter: Session.get('commenter'),
      tag: arr
    };
    
    Meteor.call('comment', comment, function(error, commentId) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  },


/*
  'click .name-choice': function(e) {
e.preventDefault();
 value = $(e.target).attr('value');
            Session.set('commenter',value); 
       
 },*/


  'click .switch': function(e) {

if (!Session.get('clickedAlready')){
      if (Session.get('commenter') == 'Anonymous'){

             Session.set('commenter',GetEmailParts(Meteor.user().emails[0].address).user); 
             Session.set('clickedAlready',true);
       } else {
              Session.set('commenter','Anonymous');
              Session.set('clickedAlready',true);
      }
} else {
Session.set('clickedAlready',false);

     }      
       
 },


});

Template.commentSubmit.helpers({


commentas: function() {


return Session.get('commenter');

},

username: function() {
return GetEmailParts(Meteor.user().emails[0].address).user;

},


});



 GetEmailParts = function(strEmail) {
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