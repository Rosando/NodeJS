var express = require('express');

var app = express();

var port = process.env.PORT || 8000;

app.get('/', function(request, response){
	response.send('Application started');
});

app.listen(port, function(){
	console.log('Application started on port: ' + port);
});