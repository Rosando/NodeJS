var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost:27017/BookAPI', { useMongoClient: true}); //open connection to db

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 8000;

var bookRouter = express.Router();

bookRouter.route('/Books')
		.get(function(request, response){
			//console.log(request.params);
			//console.log(request.query);
			
			var query = {};
			
			if(request.query.id)
				query.id = request.query.id;
			
			if(request.query.title)
				query.title = request.query.title;
			
			if(request.query.author)
				query.author = request.query.author;
			
			if(request.query.genera)
				query.genera = request.query.genera;
			
			if(request.query.read)
				query.read = request.query.read;
			
			//console.log(query);
			
			Book.find(query, function(error, books){
				if(error)
					response.status(500).send(error);
				else
					response.json(books);
			});
		});

bookRouter.route('/Books/:bookId')
		.get(function(req, res){
			//console.log(req.params.bookId);
			
			Book.findById(req.params.bookId, function(err, book){
				if(err)
					res.status(500).send(err);
				else
					res.json(book);
			});
		});
			
app.use('/api', bookRouter);

app.get('/', function(request, response){
	response.send('Welcome to Book API');
});

app.listen(port, function(){
	console.log('Application started on port: ' + port);
});