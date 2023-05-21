const express = require('express');
const app = express(); 

const path = require('path');

const port = 8000;
const host = 'localhost';



app.set('view engine', 'ejs');    
app.set('views', path.resolve(__dirname, './views'));   
app.use(express.urlencoded({extended: true}));  //-> middleware
// assets folder for static files.
app.use(express.static('assets'));              //-> middleware

// middleware 2:
app.use(function(req, res, next){
    console.log('middleware 2 called.');
    next(); 
});
// middleware 3:
app.use(function(req, res, next){    
    console.log('From middleware 3');
    next()
});


let contactList = [
    {name: "sharielle", phone:1223568},
    {name: "Dante", phone:1234567890},
    {name: "Alpheas", phone:98765321}
]


// controller- route handler for the root URL ("/").
app.get('/', function(req,res){    
    console.log('__dirname: ',path.resolve(__dirname, './views'));  
    return res.render('home', {
        // locals or context
         title: "Contact List", contact_list:contactList
        });
});

app.get('/practice', function(req, res){
    return res.render('practice', { title: "practice & play with ejs"});
});

app.get('/profile', function(req, res){
    return res.send('<h1> This is profile </h1>');
})

app.post('/create-contact', function(req,res){
    console.log(req.body);   
    contactList.push(req.body);
    return res.redirect('back');
})


 app.listen(port, host, (err) =>{   
    if(err){
        console.log(`Error in running the server`, err);
    }
    console.log('Yup! my express server is running on port: ', port);
 });