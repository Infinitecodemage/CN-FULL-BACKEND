module.exports.profile=function(req, res){
    console.log('controllerusrs');
    //  return res.end('<h1>This is my profile page </h1>');
    return res.render('layout', {title: 'user-profile'})
}

// render the sign up page:                    // don't think about response url
module.exports.signUp = function(req, res){            // what action controller would take.
    return res.render('user_sign_up.ejs', {    // response will perfome action of render a page.
        title: "Codeial | sign Up"
    })                  
}

// render the sign up page:
module.exports.signIn = function(req, res){
    return res.render('user_sign_in.ejs', {  
        title: "Codeial | Sign In"
    });
}

