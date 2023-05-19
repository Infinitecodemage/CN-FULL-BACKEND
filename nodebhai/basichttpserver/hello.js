console.log("hello to the world.");
const http = require('http');
// import http from 'http';// loading the http module 

const host = 'localhost';
const port = 8000; // endpoit/door to Ip address.

const requestlistener = function(req, res){
    // res.setHeader("content-type", "application/json");
    // res.writeHead(200);
    // res.end(`{"message": "My fourth Server: "}`);

    // csv: comma separated view

    res.setHeader("content-type", "text/csv");
    res.setHeader("content-Disposition", "attachment; filename=oceanpals.csv")
    res.writeHead(200);
        res.end(`id, name\n 1, Ritesh Raj Prasad`);
}
// create our server via http module's createServer()
const server= http.createServer(requestlistener);
// Bind the server to a network address 
// (all are optional arg.)
server.listen(port, host, () =>{
    console.log(`server is running on http://${host}:${port}`);
})