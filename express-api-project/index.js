var express = require('express');
var app = express();

app.use(express.json()); //middleware to parse incoming request with JSON payloads

//setting the routes
app.use('/api/employees', require('./routes/api/employees'));

const PORT = process.env.PORT || 3000;   //in dev

app.listen(PORT, () => { console.log(`Our app is running on port ${ PORT }`);});
