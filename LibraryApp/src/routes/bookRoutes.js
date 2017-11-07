var express = require('express');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

// var bookCollection = [
	// {
		// id: 0,
		// title: 'Life On The Mississippi',
		// genre: 'History',
		// author: 'Mark Twain',
		// read: false
	// },
	// {
		// id: 1,
		// title: 'Childhood',
		// genre: 'Biography',
		// author: 'Lev Nikolayevich Tolstoy',
		// read: false
	// },
	// {
		// id: 2,
		// title: 'War and Peace',
		// genre: 'Historical Fiction',
		// author: 'Lev Nikolayevich Tolstoy',
		// read: false
	// }
// ];

var route = function(navItems){
	var bookRouter = express.Router();

	bookRouter.route('/')
			.get(function(req, res){
				var url = 'mongodb://localhost:27017/LibraryApp';
				
				mongodb.connect(url, function(error, db){
					var collection = db.collection('books');
					
					collection.find({}).toArray(function(error, resultSet){
						res.render('./bookListView', {
							pageTitle: 'Books',
							nav: navItems,
							books: resultSet
						});
						
						db.close();
					});
				});
				
				// res.render('./bookListView', {
					// pageTitle: 'Books',
					// nav: navItems,
					// books: bookCollection
				// });
			});
			
	bookRouter.route('/:id')
			.get(function(req, res){
				var id = new ObjectId(req.params.id);
				
				var url = 'mongodb://localhost:27017/LibraryApp';
				
				mongodb.connect(url, function(error, db){
					var collection = db.collection('books');
					
					collection.findOne({_id: id}, function(error, result){
						res.render('./bookView', {
							pageTitle: result.title,
							nav: navItems,
							book: result
						});
						
						db.close();
					});
				});
				
				// var item = bookCollection[id];
				
				// res.render('./bookView', {
					// pageTitle: item.title,
					// nav: navItems,
					// book: item
				// });
			});
			
	return bookRouter;
};
		
module.exports = route;