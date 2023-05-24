
const express = require('express');

const port = 8000;
const host = 'localhost';
const path = require('path');

// import mongoose config.
// --> Allows for establishing a connection tothe mongoDB db.
// --> & Performing various db operations.
const db = require('./config/mongoose');
// importing the Contact model. 
// -- we usually create a model in the folder with same, lowercase.
const Contact = require('./models/contact');
const { title } = require('process');
// const PlayfulMong = require('./models/playfulMongoose');

const app = express(); 

app.set('view engine', 'ejs');    
app.set('views', path.resolve(__dirname, './views'));   
app.use(express.urlencoded({extended: true}));  //-> middleware
app.use(express.static('assets'));              //-> middleware

// middleware 2:
app.use(function(req, res, next){    
    console.log(`req method: ${req.method} |/(:)\| req.url: ${req.url}`)
    // console.log(req.body, " :req.body");
    next(); 
});


let contactList = [
    {name: "sharielle", phone:1223568},
    {name: "Dante", phone:1234567890},
    {name: "Alpheas", phone:98765321}
]


// controller USING promise-then()-catch().
    // app.get('/', function(req,res){    
    //         Contact.find({})
    //             .then((contact_mongoose) =>{
    //                 res.render('home', {
    //                     title:'Contacts List', 
    //                     contact_list: contact_mongoose
    //                 })
    //             })
    //             .catch((err) =>{
    //                 console.log("Error in getting contact from Contact model & contact_list_db.")
    //             })
    // });

// controller: chain methods -- async await
    // app.get('/', async function(req,res){    
    //     await Contact.find({}).exec()
    //         .then((contact_mongoose) =>{
    //             return res.render('home', {
    //                 title:'Contacts List', 
    //                 contact_list: contact_mongoose
    //             })
    //         })
    //         .catch((err) =>{
    //             console.log("Error in getting contact from Contact model & contact_list_db.")
    //         })   
    // });

// async - try catch
    app.get('/', async function(req,res){   
        try{
            let contact_mngoseModel_collection = await Contact.find({}); //--> No need to exec()
            return res.render('home', 
                                {title: 'Contact Lista', 
                                contact_list: contact_mngoseModel_collection
                    });
        } 
        catch(err){
            console.log("Error in getting contact from Contact model & contact_list_db.");
            res.status(500).send('Error in Retrieving contacts');
        }      
             
    });



// --Route handler
app.get('/practice', function(req, res){
    return res.render('practice', { title: "practice & play with ejs"});
});
// -- Route handler
app.get('/profile', function(req, res){
    return res.send('<h1> This is profile </h1>');
});

// delete contact
    // app.get('/delete-contact/', function(req, res){
    //     // console.log(req.query);
    //     let phone = req.query.phone;
    //     console.log(phone , "to delete");

    //     // -- method 1 : findIndex() with splice()  
    //     // -- method 2: filter   
    //     // -- method 3: reduce
    //         contactList = contactList.reduce((accumulator, currObj)=>{
    //             if(currObj.phone != phone){
    //                 accumulator.push(currObj);
    //             }
    //             return accumulator;                             

    //         },[]);                  
            
    //     return res.redirect('back');
    // });



app.get('/delete-contact/', async function(req, res){
        // console.log(req.query);
        let phone = req.query.phone;
        console.log("To delete : ", phone);
        // Contact
        Contact.deleteMany({phone: phone}).exec()
        .then(function(){
            console.log("Data deleted");
            return res.redirect('back');
        })
        .catch((err)=> {
            console.log('Error : ', err);
        })
    });


// app.get('/delete-contact/', async function(req, res) {
//     try {
//       let phone = req.query.phone;
//       console.log("To delete:", phone);
  
//       await Contact.deleteMany({ phone: phone }).exec();
//       console.log("Data deleted");
  
//       return res.redirect('back');
//     } catch (err) {
//       console.log('Error:', err);
//       return res.status(500).send('Internal Server Error');
//     }
//   });



app.post('/create-contact', function(req,res){    
    Contact.create(req.body)
        .then((newContact)=>{
            console.log("model:*** (:--", newContact);
        })
        .catch((err) =>{
            console.log('Error in creating new document (new contact in collection)--')
        })                 

    return res.redirect('back');
});


 app.listen(port, host, (err) =>{   
    if(err){
        console.log(`Error in running the server`, err);
    }
    console.log('Yup! my express server is running on port: ', port);
 });