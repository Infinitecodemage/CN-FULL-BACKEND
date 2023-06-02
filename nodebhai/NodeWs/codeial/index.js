const express           = require('express');
const cookieParser      = require('cookie-parser');
const app               = express();
const db                = require ('./config/mongoose.js');
const port              = 8000;
const expressLayouts    = require('express-ejs-layouts'); //-- express framework, allows for easy layout rendering in EJS.

//used for session cookie:
const session           = require('express-session');
const passport          = require('passport');
const passportLocal     = require('./config/passport-local-strategy.js');
// const mongoStore        = require('connect-mongo')(session);

app.use(cookieParser());

app.use(express.static('./assets')); //--> middlware to setup a 'Static file Server' for serving static files.
app.use(expressLayouts);  // -->middleware, layout rendering in EJS (Embedded js) templates, for common layout for your application's views

app.use(express.urlencoded({extended: true}));
//app.use(express.urlencoded({extended: true})); //--> parse URL-encoded request bodies.


app.set('view engine', 'ejs'); // -- app.set() in express used to setup various config file.// app.set(name, value);// --Setting ejs as the view engine
app.set('views', './views');   // -- views can be directory, array of directory, // -- directory of the appn view.

app.set('layout extractStyles', true); // sets sets a configuration option for express-ejs-layouts using app.set(). --enables the extraction of styles from subpages into the layout view
app.set('layout extractScripts', true);// configuration option 'layout extractScripts' -> enables the extraction of scripts from subpages into the layout view


app.use((req, res, next) => {
    console.log(`req.method: ${req.method} | :*:*: | req.url: ${req.url}`);
    next();
});

// middleware for the express-session.
app.use(session({
    name: 'Codeial',
    secret: 'your-secret-key', // Replace with a secure secret key
    resave: false,    
    saveUninitialized: false,    
    cookie: {
        maxAge: (1000*60*100)
    }
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);  //-->// If the user is authenticated, set the authenticated user in the request object

app.use('/', require('./routes')); // middleware func in express.js // used to mount a middleware function or                                   

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
