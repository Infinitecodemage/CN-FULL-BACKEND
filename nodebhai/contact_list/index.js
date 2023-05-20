// What is EJS and how do I learn it?
// EJS (Embedded JavaScript) is a simple templating language that enables 
// developers to generate HTML markup with plain JavaScript. 

const app = require('express')(); 
const path = require('path');

const port = 8000;
const host = 'localhost';

// set property-'view engine' value to 'ejs' template engine.
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));        //-- use path.join or path.resolve()
app.set('views', path.resolve(__dirname, './views'));      // in resolve you must give: "./"

app.get('/', function(req,res){
    // console.log('this is req: ', req);
    console.log('__dirname: ',path.resolve(__dirname, './views'));
    // res.send('<h1>cool, It is running! or is it? </h1>');
    return res.render('home');
});

app.get('/practice', function(req, res){
    return res.render('practice', { title: "practice & play with ejs"});
});


// for route profile
app.get('/profile', function(req, res){
    res.send('<h1> This is profile </h1>');
})

 app.listen(port, host, (err) =>{   
    if(err){
        console.log(`Error in running the server`, err);
    }
    console.log('Yup! my express server is running on port: ', port);
 });
