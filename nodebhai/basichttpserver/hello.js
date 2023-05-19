console.log("hello to the world.");
const http = require('http');
// import http from 'http';// loading the http module 

const host = 'localhost';
const port = 8000; // endpoit/door to Ip address.

const requestlistener = function(req, res){
    res.writeHead(200); // status code 200: "Ok"
    res.end("My fourth Server: ");// http response.
};

// create our server via http module's createServer()
const server= http.createServer(requestlistener);
// Bind the server to a network address 
// (all are optional arg.)
server.listen(port, host, () =>{
    console.log(`server is running on http://${host}:${port}`);
})