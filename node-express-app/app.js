var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

//body parser is used to parse the incoming request bodies in a middleware before your handlers, available under the req.body property
//define routing
//refers to how the application endpoint (URI) responds to a client request
//the app will implement obejcts such as get, post, put, delete

app.get('/', function (req, res) {
    // res.send('<html> <body><h1>Hello world</h1></body> </html>');
    res.sendFile(__dirname + '/index.html');
    });

app.post('/submit-contact-data', function (req, res) {
    var name = req.body.FirstName + ' ' + req.body.LastName;
    res.send(name + ' Submitted Successfully!');
    });

app.put('/update-data', function (req, res) {
    res.send('PUT request');
    });

app.delete('/delete-data', function (req, res) {
    res.send('DELETE request');
    });

var server = app.listen(3000, function () {
    console.log('Node server is running..');
    });

