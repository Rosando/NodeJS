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

	bookRouter.use('/:bookId', function(req, res, next){
		Book.findById(req.params.bookId, function(err, book){
			if(err)
				res.status(500).send(err);
			
			if(book)
			{
				req.book = book;
				next();
			}
			else
				res.status(404).send('Book not found');
		});
	});
	
	bookRouter.route('/:bookId')
			.get(function(req, res){
				//console.log(req.params.bookId
				res.json(req.book);
			})
			.put(function(req, res){
				var book = req.book;
				
				book.title = req.body.title;
				book.author = req.body.author;
				book.genre = req.body.genre;
				book.read = req.body.read;
				
				book.save(function(err){
					if(err)
						res.status(500).send(err);
					else
						res.json(book);
				});
			})
			.patch(function(req, res){
				if(req.book._id)
					delete req.body._id;
				
				if(req.book.__v)
					delete req.body.__v;
				
				for(var item in req.body){
					req.book[item] = req.body[item]
				}
				
				req.book.save(function(err){
					if(err)
						res.status(500).send(err);
					else
						res.json(req.book);
				});
			})
			.delete(function(req, res){
				req.book.remove(function(err){
					if(err)
						res.status(500).send(err);
					else
						res.status(204).send('Book Deleted');
				});
			});
			
	return bookRouter;
};

module.exports = bookRouterContainer;