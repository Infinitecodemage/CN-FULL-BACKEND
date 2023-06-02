const express = require('express');
const router = express.Router(); // create the router object.console.log('*** userjs ***');
const passport = require('passport');
const userController = require('../controllers/users_controller');
const session = require('express-session');

router.get('/profile', passport.checkAuthentication, userController.profile); // set controller(route handler) for path '/profile' get req.

router.get('/sign-in', userController.signIn);   // --> route: /users-sign-up
router.get('/sign-up', userController.signUp);   // --> route: /users/sign-in

router.post('/create', userController.create);

// router.post('/create-session', userController.createSession);

//using passport as a middleware to authenticate.
// -->  .authenticate is middleware function provided by passport lib.
// --> 'local' : The 'local' strategy refers to a common authentication strategy used for username and password-based authentication. 
router.post('/create-session', 
              passport.authenticate( 'local', {failureRedirect: '/users/sign-in', //session: false
                                    }),
              userController.createSession
            );

module.exports = router;

// , session: false
