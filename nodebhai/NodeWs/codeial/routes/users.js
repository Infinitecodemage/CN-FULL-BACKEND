const express = require('express');
// create the router object.
const router = express.Router();

const userController = require('../controllers/users_controller');

// set controller(route handler) for path '/profile' get req.
router.get('/profile', userController.profile);



module.exports = router;

