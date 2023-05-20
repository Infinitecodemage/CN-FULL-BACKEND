const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const host = 'localhost';
const port = 8000; 





let mainFile;
const requestlistener = function(req, res){
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(mainFile);
}

// create our server via http module's createServer()
const server= http.createServer(requestlistener);
const filepath = path.resolve(__dirname, 'main.html');

// Efficient way of serving html file. 
// -- Instead of loading data at every request.
// -- we shift the file reading logic from the 
//    requestListener() function to our server startup.
fs.readFile(filepath)
    .then(contents => {
        mainFile = contents;
        server.listen(port, host, ()=>{
            console.log(`Server is running on http://${host}:${port}`);
        });
        
    })
    .catch(err => {
        console.log(`Could not read main.html file: ${err}`);
        process.exit(1);
    });




// server.listen(port, host, (err) =>{
//     if(err){
//         console.log('error');
//     }else{
//         console.log(`server is running on http://${host}:${port}`);
//     }

// })