
const express = require('express');
const app = express(); 

const port = 8000;
const host = 'localhost';

const path = require('path');


app.set('view engine', 'ejs');    
app.set('views', path.resolve(__dirname, './views'));   
app.use(express.urlencoded({extended: true}));  //-> middleware
// assets folder for static files.
app.use(express.static('assets'));              //-> middleware

// middleware 2:
app.use(function(req, res, next){
    // console.log('middleware 2 called.');
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

app.get('/practice', function(req, res){
    return res.render('practice', { title: "practice & play with ejs"});
});

app.get('/profile', function(req, res){
    return res.send('<h1> This is profile </h1>');
});


// 
app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let phone = req.query.phone;
    console.log(phone);
    // -- method 1 : findIndex() with splice()
            // let contactIndex = contactList.findIndex(
            //     contact => contact.phone == phone
            //     );
            //     console.log(contactIndex)
            //     if(contactIndex !== -1){
            //         // contactList = contactList.splice(contactIndex, 1);
            //         contactList.splice(contactIndex, 1);
            //     }

    // -- method 2: filter   
            // contactList  = contactList.filter(currentObj => 
                        //    Note: use == rather than ===
            //     currentObj.phone != phone
            // );
    // method 3: reduce
        contactList = contactList.reduce((accumulator, currObj)=>{
            if(currObj.phone != phone){
                accumulator.push(currObj);
            }
            return accumulator;
        },[]);

    


    return res.redirect('back');
});


app.post('/create-contact', function(req,res){
    // console.log(req.body);   
    contactList.push(req.body);
    return res.redirect('back');
})


 app.listen(port, host, (err) =>{   
    if(err){
        console.log(`Error in running the server`, err);
    }
    console.log('Yup! my express server is running on port: ', port);
 });