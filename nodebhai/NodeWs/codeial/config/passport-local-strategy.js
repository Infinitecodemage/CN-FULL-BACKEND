const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//Authentication using passport
passport.use(new LocalStrategy(
    { usernameField: 'email',},
    async function(email, password, done){
        //find a user and establish the identity.
        try{
            const user = await User.findOne({email : email});

                console.log('new Local strategy, User.findOne user', user);
                console.log('user-password: ', user.password, '-- and -- password: ', password);
                // if(err){ return done(err); }

                if(!user || user.password != password){ return done(err, false); }

                return done(null, user);  //--> user is whole              
            
        }catch(err){
            console.log("new LocalStrategy: callback func failed.");
            return done(err);
        }
       
    }    
))

// Serializing the user to decide which key is to be kept in the cookies.
// Function does not involve any asynchronous operations, It is a synchronous operation, there is no need to convert it into an asynchronous function.
passport.serializeUser(function(user, done){
    console.log('serialize user.id: ', user.id);
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id).exec();
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//             console.log('findById executed.-- deserializeUser')
//             done(err, user);
//         })
// })
        


// deserializeUser
// passport.deserializeUser(async function(id, done){
//     try{
//         console.log('findById executed.-- deserializeUser');

//         let user;                //--> don't need to do, if error occur findById() It will create 
//         try {
//             user = await User.findById(id);
//             done(null, user);
//         }
//         catch(err){
//             done(err, null);
//         }
//     }catch(err){
//         done(err, null);
//     }
// });

  


// passport.checkAuthentication = function(req, res, next){       // --> Check if the user is authenticated.
//     if(req.isAuthenticated()){                                 //--> If the user is signed in, then pass on the req to the next func(Controller's action)
//         return next();
//     }
//     return res.redirect('/users/sign-in');
// }



// passport.checkAuthentication = async function(req, res, next){       // --> Check if the user is authenticated.
//     try{
//         if(req.isAuthenticated()){                                 // --> If the user is signed in, then pass on the req to the next func(Controller's action)
//         return next();
//         }
//         return res.redirect('/users/sign-in');           // --> No Error in executing function.
//     }
//     catch{
//         console.log('error in executing passport.checkAuth..')
//         return res.redirect('/users/sign-in');
//     }

// }

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        console.log('from setAuthenticatedUser --res.locals.user: ', res.locals.user, ' req.user: ', req.user)
        res.locals.user = req.user;
    }
    next()
}

// passport.setAuthenticatedUser = async function(req,res, next){
//     try{
//         if(req.isAuthenticated()){          //--> req.user contains the current signed in user from the session cookie and we are just sending this to the locals file views
//                             console.log(req.user, "(: req.user setAuthUser");
//             res.locals.user = req.user;
//                             console.log(req.locals, '---- (: res.locals in setAuthenticatedUser.');
//         }
//         next();    }
    
//     catch{
//         console.log('problem in executing setAuthenticatedUser');
//         return res.redirect('/users/sign-in');
//     }
// }

module.exports = passport;