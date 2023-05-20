// const express = require('express');
//  const app = express();

const app = require('express')();
const port = 8000;
const host = 'localhost';

app.get('/', function(req,res){
    res.send('<h1>cool, It is running! or is it? </h1>');
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

// In the given code, the server.listen() method is called on the server object, 
// and the arrow function is defined in the same scope as the method call. 
// Therefore, the "this" context inside the arrow function will refer to the server object.
// 
// In summary, the "this" context inside the arrow function () => {} 
// in the given code will refer to the server object.