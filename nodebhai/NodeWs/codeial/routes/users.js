const passport = require('passport');
const express = require('express');
const router = express.Router(); // create the router object.console.log('*** userjs ***');

const userController = require('../controllers/users_controller');

router.get('/profile', userController.profile); // set controller(route handler) for path '/profile' get req.

router.get('/sign-in', userController.signIn);   // --> route: /users-sign-up
router.get('/sign-up', userController.signUp);   // --> route: /users/sign-in

router.post('/create', userController.create);
router.post('/createsession', passport.authenticate(
                                'local',
                                {failureRedirect: '/users/sign-in'}
                                ),
                            userController.createSession);

module.exports = router;