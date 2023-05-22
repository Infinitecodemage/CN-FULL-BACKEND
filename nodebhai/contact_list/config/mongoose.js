// import library, ODM lib for MongoDB to interact with mongodb and js
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the connection(to check if it is successful)
const db = mongoose.connection;

// 'error': name of event emitted by mongoose lib whenever error in connection to mongoDB database. 
// --> bind creates a new func sets 'console' as 'this' context inside the function.
// --> here, console.error func is essentially "pre-configured" with msg 'error connecting to db'
db.on('error', console.error.bind(console, 'error connecting to db'));

// The event name 'open' is a specific event emitted by the mongoose library 
// when it successfully connects to the MongoDB database.
db.once('open', function(){
    console.log('successfully connected to the database.');
})