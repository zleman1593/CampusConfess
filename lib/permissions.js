// check that the userId specified owns the documents



ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}

Accounts.config({sendVerificationEmail: true},{ restrictCreationByEmailDomain: function() {return false;}});


/*

  var loginAttemptVerifier = function(parameters) {
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
    }*/




   Meteor.users.allow({

    remove: function() { return true; }


  });