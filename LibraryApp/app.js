var express = require('express');

var app = express(); //create a instance of express

var port = 5000;

//setup middleware to access the files from public directory
app.use(express.static('public'));

app.use(express.static('src/views'));

app.get('/', function(req, res){
	console.log(req.url);
	res.send("Helloworld");
});

app.get('/books', function(req, res){
	console.log(req.url);
	res.send("Hello Books");
});

app.listen(port, function(){
	console.log("Server running on port: " + port);
});