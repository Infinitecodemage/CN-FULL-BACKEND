const mongoose = require('mongoose');

const userSchema=  new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: unique
    },
    name:{
        type: String,
        required: true
    }
}, {
    timestamp: true
})

// model name      : User;  
// collection name : users;   
// db name         : contact_list_db

const User = mongoose.model('User', userSchema);  // Create a User model from the schema.
module.exports = User;                            // Export the User model.
