var http = require ("http"); //Import node.js core module
var fs = require('fs'); //Import node.js core module

//Server creation 
//Request and response both are callback function parameter
var server= http.createServer (function(req,res) {    
    
    if (req.url == '/') { //check the URL of the current request
        //Set response header
        res.writeHead(200, {'Content-type': 'text/html'});
        
        //Read file content
        var data = fs.readFile('web/demofile1.html', 
            function (err, data){
                if (err) throw err;          
            
        //Set reponse content
        res.write(data.toString());
        res.end();
        });
        
    }
    else if (req.url == '/contact') { //check the URL of the current request
        //Set response header
        res.writeHead(200, {'Content-type': 'text/html'});
        //Set reponse content
        res.write('<html> <body> <p> This is contact page </p> </body> </html>')
        res.end();
    } else res.end('Invalid Request!'); //If request for other page, set response code 404

});

server.listen(4000);  //Listen to incoming request
console.log("Node.js web server at port 4000 is running...")