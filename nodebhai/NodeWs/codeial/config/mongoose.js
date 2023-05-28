const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/contact_list_db');
const db = mongoose.connection;
                                                                
db.on('error', console.error.bind(console, 'error connecting to db')); 


db.once('open', function(){         // --used to listen for the standardized 'open' event.
                                    // & db.once() execute the provided callback func when the event is emitted.
    console.log('successfully connecting to the database.mongoose is added to dependency');
})