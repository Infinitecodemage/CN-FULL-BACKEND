const fs = require('fs').promises;
const path = require('path');
const http = require('http');
// import http from 'http';// loading the http module 

const host = 'localhost';
const port = 8000; // endpoit/door to Ip address.

const requestlistener = function(req, res){
    // -- The path.resolve() method ensures that the resulting file 
    //    path is normalized and valid across different platforms.
    const filepath = path.resolve(__dirname, '../main.html')

    fs.readFile(filepath)
    .then(contents => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
    })
    .catch(err => {
        res.writeHead(500);
        res.end(err);
        return;
    })

}
// create our server via http module's createServer()
const server= http.createServer(requestlistener);
server.listen(port, host, (err) =>{
    if(err){
        console.log('error');
    }else{
        console.log(`server is running on http://${host}:${port}`);
    }

})