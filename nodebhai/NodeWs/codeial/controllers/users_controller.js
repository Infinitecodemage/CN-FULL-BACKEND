module.exports.profile=function(req, res){
    console.log('controllerusrs');
    //  return res.end('<h1>This is my profile page </h1>');
    return res.render('layout', {title: 'user-profile'})
}