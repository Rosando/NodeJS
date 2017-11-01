var express = require('express');

var app = express(); //create a instance of express

var port = 5000;

app.listen(port, function(){
	console.log("Server running on port: " + port);
});