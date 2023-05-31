const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy(
            {usernameField: 'email'},
            function(email, password, done){  //--> verification callback func for the local auth strategy.                
                User.findOne({email: email}, function(err, user){   // --> find a user and establish the identity.
                    if(err){
                        console.log('Error in finding user --> passport');
                        return done(err);
                    }
                    if(!user || user.password != password){
                        console.log("Invalid username/password");
                        return done(null, false);
                    }
                    return done(null, user); //--> you need to require the 'passport-local' module and access the Strategy object it provides.
                                            //--> Using .Strategy is simply a convention specific to Passport and its strategy modules.
                                            // --> It signifies that you are creating a new instance of the strategy object. 
                                            // --> Other Passport strategy modules may have different naming conventions, 
                                            // --> but they typically provide an object or constructor that you use to create a strategy instance.
                });
            }//-- End of verification callaback.
));

// done = It is a callback function indicate the result of the authentication process.

// serialization: passport.js need a way to store info about the user in the session.
// serializing involves converting an object into a format that can be easily stored, transmitted, or persisted, 
// uch as a string or binary representation. 


passport.serializeUser(function(user, done){
done(null, user.id);                        //--> passport.serializer func is used to define how a user object
})                                          //--> should be serialized into the session. 
                                            //--> The provided callback func specifies how the user's ID should be extracted
                                            //--> and stored as the serialized representation of the user. 

//-->  deserializing: It is the process of reconstructing an object from its serialized form.
//     It takes this serialized data and converts it back into an object that can be used in memory.

//deserialzing the user from the key in the cookies:
passport.deserializeUser(function(id, done){         // deserializerUser() is used for session management and user authentication purpose.
    User.findById(id, function(err, user){           // allow the app to retrieve and use the user obj from the session data for subsequent request handling.
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null, user);
    })    
})          


module.exports = passport;