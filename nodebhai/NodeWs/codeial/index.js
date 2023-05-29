const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts'); //-- express framework, allows for easy layout rendering in EJS.
const port = 8000;

const db = require ('./config/mongoose.js');

// app.use(express.urlencoded); // --> Error: body-parser deprecated undefined extended: provide extended option node_modules/express/lib/router/layer.js:95:5

app.use(express.urlencoded({extended: true})); //--> parse URL-encoded request bodies.
app.use('/', require('./routes')); // middleware func in express.js // used to mount a middleware function or                                   
app.use(expressLayouts);  // -->middleware, layout rendering in EJS (Embedded js) templates, for common layout for your application's views
app.use(express.static('./assets')); //--> middlware to setup a 'Static file Server' for serving static files.



                                   // register all the routes defined. it returns router objects.
                                   // or mount a router on the specified path, in this case, the root path ('/').


app.set('layout extractStyles', true); // sets sets a configuration option for express-ejs-layouts using app.set(). --enables the extraction of styles from subpages into the layout view
app.set('layout extractScripts', true);// configuration option 'layout extractScripts' -> enables the extraction of scripts from subpages into the layout view

app.set('view engine', 'ejs'); // -- app.set() in express used to setup various config file.// app.set(name, value);// --Setting ejs as the view engine
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
    }
        console.log(`Your server is running on port: ${port}`);       
})
