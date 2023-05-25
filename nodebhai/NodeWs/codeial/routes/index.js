// -- Imports the express module-framework for 
// web app in node.js
const express = require('express');

// --> creates a router object using this method.
// provides a way to define routes and middleware
// for handling requests in a modular and organized manner.
const router = express.Router(); 
// imports the module homeC_controller modules.
// It has home function.
const homeController = require('../controllers/home_controller');

// defines a route handler for the GET request method onthe root path'/'
// it associate the 'home' function as handler of '/'(root path) route.
router.get('/', homeController.home);

console.log('Router Loaded: - ');

//-- exports the router object from the module.
module.exports = router;