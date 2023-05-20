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

let contactList = [
    {name: "sharielle", phone:1223568},
    {name: "Dante", phone:1234567890},
    {name: "Alpheas", phone:98765321}
]


// route handler for the root URL ("/").
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
    // return res.redirect('/practice');
    console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.phone);

    // --pushing an object in contactList array.
    contactList.push(req.body);
    return res.redirect('/');
})



 app.listen(port, host, (err) =>{   
    if(err){
        console.log(`Error in running the server`, err);
    }
    console.log('Yup! my express server is running on port: ', port);
 });
