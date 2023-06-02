const User = require('../models/user'); //--> User variable for importing 'User' model from model/user.js.

module.exports.profile=function(req, res){
    console.log('controllerusers: user: ', req.user);
    //  return res.end('<h1>This is my profile page </h1>');    
    return res.render('user_profile', {title: 'user-profile'});
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


//  create user.
// module.exports.create = function(req, res){
//     console.log('req.body: ', req.body);
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email})
//     // .exec() //-> create already return promise.
//     .then(user => {
//         if(!user){
//             User.create(req.body)
//             // .exec()  // -> already return promise.
//             .then(newUser => {
//                 // return res.end('<h1>new user is created is created.</h1>');
//                 console.log('user created goto sign-in page.')
//                 return res.render('user_sign_in', { title: 'signUp-SignIn'}); // your url : /users/create
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

module.exports.createOriginal = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
}

module.exports.createThen = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email})
    .then(existingUser =>{
        if(existingUser){
            return res.redirect('back');
        }

        User.create(req.body)
        .then(newUser => {
            return res.redirect('/users/sign-in');
        }).catch(err =>{
            console.log('Error in creating user while signing up: ', err);
            return res.redirect('back');
        });
        
    }).catch(err => {
        console.log('Error in finding user in signing up: ', err);
        return res.redirect('back');
    });

};


// async/await and try/catch block:
module.exports.create = async function(req, res){
    try{
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }

        const existingUser = await User.findOne({email: req.body.email});

            if(existingUser){
                return res.redirect('back');
            }

            let newUser ;
            try{
                newUser = await User.create(req.body);                
            }catch(err){
                console.log('Error in creating user while signing up: ', err);
                return res.redirect('back');
            }            
            return res.redirect('/users/sign-in');

    }catch(err){
        console.log('Error: in finding user : ', err);
        return res.redirect('back');
    }
};


//Create-sessions function
module.exports.createSession = function(req, res){
        console.log('CreateSession controllers called. goto homepage / .');      
        return res.redirect('/');
}