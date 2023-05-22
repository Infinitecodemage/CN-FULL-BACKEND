const mongoose = require('mongoose');

const playfulMongoose_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
});

//Create a model based on the Schema
const PlayfulMong = mongoose.model('PlayfulMong', playfulMongoose_Schema);

// ---> Creating a new document using the model:


// const john = new PlayfulMong(
//     {name: 'John Doe', age: 30, email: 'prdamy@gmail.com'
// });
// const sharielle = new PlayfulMong( 
//     {name: 'Sharielle', age :19, email:'stttt@gmail.com'
// });
// const miro = new PlayfulMong(   
//     { name:"miro",age: 50,email: 'miroj@gmail.com' 
// });

// -- Save the document tothe Schema.
// john.save();
// sharielle.save();
// miro.save();

// //Querying documents using the model
// // --gte: greater than equal
// PlayfulMong.find({age: {$gte: 25}})
//     .then(persons=>{
//         console.log(persons);
//     })
//     .catch(error => {
//         console.log(error);
//     });

// //Updating a document using the model
// PlayfulMong.findOneAndUpdate({name: 'John Doe'}, {age: 31})
//     .then(updatedPerson => {
//         console.log(updatedPerson);
//     })
//     .catch(error => {
//         console.error(error);
//     });

// //Deleting a document using the model.
// PlayfulMong.findOneAndDelete({name: 'John Doe'})
//     .then(deletedPerson => {
//         console.log(deletedPerson);
//     })
//     .catch(error => {
//         console.error(error);
//     });


// export the moduel( js repre of MongoDB collection.)
module.exports  = PlayfulMong;