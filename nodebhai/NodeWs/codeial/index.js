const express = require('express');
const cookieParser = require('cookie-parser');
const db = require ('./config/mongoose.js');
const app = express();
const port = 8000;


app.use(express.urlencoded({extended: true})); 
app.use(cookieParser());
app.use(express.static('./assets')); 
app.use('/', require('./routes')); 

const expressLayouts = require('express-ejs-layouts'); 
app.set('view engine', 'ejs'); 
app.set('views', './views');   

const session = require('express-session');  // --> Used for session cookie.
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');




app.use(expressLayouts);  
app.set('layout extractStyles', true); //--> extract style & scripts from subpages into the layout.
app.set('layout extractScripts', true);


app.use((req, res, next) => {
    console.log(`req.method: ${req.method} | :*:*: | req.url: ${req.url}`);
    next();
});

//middleware 
app.use(session({
    name: 'Codeial-create-1st-session',
    secret: 'string-to-create-secret-before-deployment.',
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    }

}));

app.use(passport.initialize());
app.use(passport.session());

                            
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);    
    }
        console.log(`Your server is running on port: ${port}`);       
})
