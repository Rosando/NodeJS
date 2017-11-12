var express = require('express');

var bookRouterContainer = function(Book){
	var bookRouter = express.Router();
	
	bookRouter.route('/')
			.post(function(req, res){
				//console.log(req.body);
				var book = new Book(req.body);
				//console.log(book);
				
				book.save();
				res.status(201).send(book);
			})
			.get(function(req, res){
				//console.log(req.query)
				
				var query = {};
				
				if(req.query.id)
					query.id = req.query.id;
				
				if(req.query.title)
					query.title = req.query.title;
				
				if(req.query.author)
					query.author = req.query.author;
				
				if(req.query.genera)
					query.genera = req.query.genera;
				
				if(req.query.read)
					query.read = req.query.read;
				
				console.log(query);
			
				Book.find(query, function(err, books){
					if(err)
						res.status(500).send(err);
					else
						res.json(books);
				});
			});

	bookRouter.route('/:bookId')
			.get(function(req, res){
				//console.log(req.params.bookId
				
				Book.findById(req.params.bookId, function(err, book){
					if(err)
						res.status(500).send(err);
					else
						res.json(book);
				});
			});
			
	return bookRouter;
};

module.exports = bookRouterContainer;