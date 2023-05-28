const express = require('express');
const router = express.Router(); // create the router object.console.log('*** userjs ***');
const userController = require('../controllers/users_controller');

router.get('/profile', userController.profile); // set controller(route handler) for path '/profile' get req.

router.get('/sign-up', userController.signIn);   // --> route: /users-sign-up
router.get('/sign-in', userController.signUp);   // --> route: /users/sign-in

module.exports = router;