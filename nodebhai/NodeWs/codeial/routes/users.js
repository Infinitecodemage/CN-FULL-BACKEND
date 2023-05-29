const express = require('express');
const router = express.Router(); // create the router object.console.log('*** userjs ***');
const userController = require('../controllers/users_controller');

router.get('/profile', userController.profile); // set controller(route handler) for path '/profile' get req.

router.get('/sign-in', userController.signIn);   // --> route: /users-sign-up
router.get('/sign-up', userController.signUp);   // --> route: /users/sign-in

router.post('/create', userController.create);
router.post('/create-session', userController.createSession);
router.get('/logout', userController.logout);

module.exports = router;