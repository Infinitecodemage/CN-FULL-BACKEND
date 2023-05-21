const express = require('express');
const app = express(); 

const path = require('path');

const port = 8000;
const host = 'localhost';



app.set('view engine', 'ejs');    
app.set('views', path.resolve(__dirname, './views'));   

// middleware 1
//  -- when extended is set to true, the parsed data is represented as an object 
//     with arrays for each key, allowing multiple values for the same key.
app.use(express.urlencoded({extended: true}));

// middleware 2:
app.use(function(req, res, next){
    console.log('middleware 2 called.');
    req.myName_mw2 = 'Shirone-mw2';
    //--> if not specified the web page won't goto the next middleware.
    // console.log('req.myName_mw3 cannot be accessed', req.myName);
    next(); 
});

app.use(function(req, res, next){    
    console.log('From middleware 3');
    console.log('from mw3, calling req.myName declared in mw2', req.myName);
    // req.myName_mw3 = 'Shirone-mw3';
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

// controller for post.
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
