
const express = require('express');

const port = 8000;
const host = 'localhost';
const path = require('path');

// import mongoose config.
// --> Allows for establishing a connection tothe mongoDB db.
// --> & Performing various db operations.
const db = require('./config/mongoose');
// importing Contact model.
const Contact = require('./models/contact');
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


// controller- route handler for the root URL ("/").
app.get('/', function(req,res){    
        return res.render('home', {
        // locals or context
         title: "Contact List", contact_list:contactList
        });
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
app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let phone = req.query.phone;
    console.log(phone);

    // -- method 1 : findIndex() with splice()  
    // -- method 2: filter   
    // -- method 3: reduce
        contactList = contactList.reduce((accumulator, currObj)=>{
            if(currObj.phone != phone){
                accumulator.push(currObj);
            }
            return accumulator;                             

        },[]);                  
        
    return res.redirect('back');
});


app.post('/create-contact', function(req,res){
    // console.log(req.body);   // note: req.body is an object.
    // contactList.push(req.body);
    Contact.create(req.body)
        .then((newContact)=>{
            console.log("model:*** (:--", newContact);
        })
        .catch((err) =>{
            console.log('Error in creating new document (new contact in collection)--')
        });                    

    return res.redirect('back');
})


 app.listen(port, host, (err) =>{   
    if(err){
        console.log(`Error in running the server`, err);
    }
    console.log('Yup! my express server is running on port: ', port);
 });