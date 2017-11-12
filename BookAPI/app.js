var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost:27017/BookAPI', { useMongoClient: true}); //open connection to db

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 8000;

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

var bookRouter = require('./routes/bookRouter')(Book);

app.use('/api/books', bookRouter);

app.get('/', function(request, response){
	response.send('Welcome to Book API');
});

app.listen(port, function(){
	console.log('Application started on port: ' + port);
});