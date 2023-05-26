const express = require('express');
const app = express();
const port = 8000;

app.use('/', require('./routes'));// middleware func in express.js 
                                  // used to mount a middleware function or a router 
                                  // on the specified path, in this case, the root path ('/').

app.set('view engine', 'ejs'); // -- app.set() in express used to setup various config file. // app.set(name, value);// --Setting ejs as the view engine
app.set('views', './views');   // -- views can be directory, array of directory, // -- directory of the appn view.


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