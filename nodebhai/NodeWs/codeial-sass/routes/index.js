// -- Imports the express module-framework for 
// web app in node.js
const express = require('express');

// --> creates a router object using this method.
// provides a way to define routes and middleware
// for handling requests in a modular and organized manner.
const router = express.Router(); 

// imports the module home_controller modules.
// It has 'home' func to handle that will handle the routes.
const homeController = require('../controllers/home_controller');

// defines a route handler for the GET request method onthe root path'/'
// it associate the 'home' function as handler of '/'(root path) route.
router.get('/', homeController.home);

// ------------- middleware in express.js
// It is used to mount a middleware function or a router 
// on the specified path, in this case, ('/profile').

// Mount the router for the '/profile' path
router.use('/users', require('./users'));

console.log('Router Loaded: - from route/index.js');

//-- exports the router object from the module.
module.exports = router;