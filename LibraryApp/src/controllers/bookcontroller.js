var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function(bookService, navItems){
	var url = 'mongodb://localhost:27017/LibraryApp';
	
	var getBooks = function(request, response){
		mongodb.connect(url, function(error, db){
			var collection = db.collection('books');
			
			collection.find({}).toArray(function(error, resultSet){
				response.render('./bookListView', {
					pageTitle: 'Books',
					nav: navItems,
					books: resultSet
				});
			});
		});
	};
	
	var getBookById = function(request, response){
		var id = ObjectId(request.params.id);
		
		mongodb.connect(url, function(error, db){
			var collection = db.collection('books');
			
			collection.findOne({_id: id}, function(error, result){
				response.render('./bookView', {
					pageTitle: result.title,
					nav: navItems,
					book: result
				});
				
				db.close();
			});
		});
	};
	
	return {
		getBooks: getBooks,
		getBookById: getBookById
	};
};

module.exports = bookController;