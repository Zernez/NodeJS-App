var fs = require('fs');

//How to append file content 
fs.appendFile('test.rtf', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
  }); 

//Read file content
var data = fs.readFile('TestFile.rtf', 
    function (err, data){
        if (err) throw err;          
    
        console.log(data.toString());
        }
);

//Write file content
fs.writeFile('test.rtf', 'Hello World!', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });   // 1st parameter is the file name, 2nd parameter is the data to be written, 3rd parameter is the callback function

//delete file
fs.unlink('test.rtf', function (err) {
    if (err) throw err;
    console.log('File deleted!');
} ); 