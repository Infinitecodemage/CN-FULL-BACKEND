const User = require('../models/user'); //--> User variable for importing 'User' model from model/user.js.

module.exports.profile=function(req, res){
    console.log('controllerusrs');
    //  return res.end('<h1>This is my profile page </h1>');
    return res.render('layout', {title: 'user-profile'})
}

// render the sign up page:                    // don't think about response url
module.exports.signUp = function(req, res){            // what action controller would take.
    return res.render('user_sign_up.ejs', {    // response will perfom action of rendering a page.
        title: "Codeial | sign Up"
    })                  
}

// render the sign up page:
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {  
        title: "Codeial | Sign In ---"
    });
}


// //  create user.
// module.exports.create = function(req, res){
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email})
//     // .exec() //-> create already return promise.
//     .then(user => {
//         if(!user){     //--> if findOne() gives null/undefined. Means findOne executed but null object return. not found.
//             User.create(req.body)
//             // .exec()  // -> already return promise.
//             .then(newUser => {
//                 // return res.end('<h1>new user is created is created.</h1>');
//                 console.log('create() executed & added a new document in collection.')
//                 return res.redirect('home');
//             })
//             .catch((err) => {
//                 console.log('Error in User.create() function execution.');
//                 return;
//             })
//         }
//         else{
//             // -- Error in creating . perhaps user already existed.
//             console.log('user seems to be already signed up.')
//             return res.redirect('back');
//         }
//     })
//     .catch(err => {
//         console.log('Erro in findOne() execution.');
//         return res.redirect('back');
//     })
// }


// Route handler using async/await
module.exports.create = async function(req, res){
    try{
        if(req.body.password != req.body.confirm_password){
            console.log("from create sessions");
            return res.redirect('back');
        }
        const user = await User.findOne({email: req.body.email});

        if(!user){
            const newUser = await User.create(req.body);
            console.log('user created -- create():  ');
            return res.redirect('/users/sign-in');
        }else{
            return res.redirect('back');
        }

    }catch(err) {
            console.log('Error in creating user while signing up: ', err);
            return res.status(500).json({message: 'Internal Server Error'});
    }
}



//Create-sessions function
module.exports.createSession = function(req, res){ 
    console.log("from create sessions");
    return res.end('<h1>This is great</h1>');
}
