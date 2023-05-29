// -- defines a mddule in node.js, using 'module.exports'
// -- function --"home"-- takes 2 parameter: 'req' & 'res'

// home function purpose: handle specific routes here '/' -- root path-- homepage,
// when a req is made the router function is executed. 


module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for codeial! </h1>');    
    console.log('req.cookies: ', req.cookies);
    res.cookie('user_id: ', 25);  // --> this is how you can use cookie lib to store data in cookies.
    return res.render('home', {title:'HomePage', bodyTitle:'HomePageBody'}); //--> render home.ejs
}

