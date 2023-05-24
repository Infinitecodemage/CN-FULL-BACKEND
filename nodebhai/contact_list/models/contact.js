// allowing the code to interact with MongoDB and perform database operations.
const mongoose = require('mongoose');

// creating schema.
// Note: Schema is a class.
// Below model() is a func
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    phone:{
        type: String,
        required: true
    }
});

// creating model: model is a javascript representation of a MongoDB collection.
// const Contact = mongoose.model('Model',   schemal,      'MongoDB Collection')
   const Contact = mongoose.model('Contact', contactSchema);


module.exports = Contact;