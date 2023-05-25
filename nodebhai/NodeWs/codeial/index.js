const express = require('express');
const app = express();
const port = 8000;

app.use('/', require('./routes'));


app.use((req, res, next) => {
    console.log(`req.method: ${req.method} | :*:*: | req.url: ${req.url}`);
    next();
});

// Callback functions are commonly used in asynchronous programming, 
// where the execution of a function may not immediately produce a result.

// The 'err' parameter in a callback function is typically used to handle or propagate errors 
// that occur during the execution of the asynchronous operation.

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);       // -> Interpolation or Template string.
    }console.log(`Your server is running on port: ${port}`);
})