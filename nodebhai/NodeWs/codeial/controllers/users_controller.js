const User = require('../models/user');  //--> User variable for importing 'User' model from model/user.js.

module.exports.profile=function(req, res){
    console.log('usersContoller of profile: ');
    console.log('cookies *** ',req.cookies, "*** cookies");
    if(req.cookies.user_id){                        //--> check if cookies is empty or not.
        User.findById(req.cookies.user_id)          //--> user is founded inside teh cookies.
        .then((user) => {
            if(user){                               // --> if returned is not undefined.
                console.log('user:### ', user, '####');
                return res.render('user_profile', {title: 'profile info',bodyTitle: '2nd-profile', user: user});
            }            
            return res.redirect('back');            //--> if what you got is undefined.
        })
        .catch(err => {   
            console.log('Not able to execute the findById(). Error in execution');
            return res.redirect('back');
        })
    }else{
        return res.redirect('back');
    }
}

// render the sign up page:                    // don't think about response url
module.exports.signUp = function(req, res){    // what action controller would take.
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
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email})
    // .exec() //-> create already return promise.
    .then(user => {
        if(!user){
            User.create(req.body)
            // .exec()  // -> already return promise.
            .then(newUser => {
                // return res.end('<h1>new user is created is created.</h1>');
                console.log('user created goto sign-in page.')
                return res.render('user_sign_in', { title: 'signUp-SignIn'});
            })
            .catch((err) => {
                console.log('Error in User.create() function execution.');
                return;
            })
        }
        else{
            // -- Error in creating . perhaps user already existed.
            console.log('user seems to be already signed up.')
            return res.redirect('back');
        }
    })
    .catch(err => {
        console.log('Erro in findOne() execution.');
        return res.redirect('back');
    })
}

  
//Create-sessions function
//sign in and create a session for the user.
module.exports.createSession = function(req, res){
    // Steps to authenticate
    // find the user.
    User.findOne({email: req.body.email})
    // handle user found.
    .then((getUser) => {
        if(getUser){
            if(getUser.password != req.body.password){
                // handle the user which doesn't match.
                console.log('username found but not same same password.') //--> bad practice to reveal this kind of info. //just for practive.
                return res.redirect('back');
            }
            //handle the session creation
            res.cookie('user_id', getUser.id);
            return res.redirect('/users/profile');
        }else{
            // if no error in executing findOne(), but user not found.
            console.log('user not found,but no error in executing findOne()');
            return res.redirect('back');
        }
    })
    .catch(err => {  //error in executing findOne();
        console.log('err is in authenticating user.')
        return res.redirect('back');
    })
}