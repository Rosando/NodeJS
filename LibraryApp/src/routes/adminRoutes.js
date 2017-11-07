var express = require('express');
var mongodb = require('mongodb').MongoClient;

var adminRouter = express.Router();

var bookCollection = [
	{
		title: 'Life On The Mississippi',
		genre: 'History',
		author: 'Mark Twain',
		read: false
	},
	{
		title: 'Childhood',
		genre: 'Biography',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	},
	{
		title: 'War and Peace',
		genre: 'Historical Fiction',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	}
];

var router = function(nav){
	adminRouter.route('/addBooks')
				.get(function(req, res){
					var url = 'mongodb://localhost:27017/LibraryApp';
					
					mongodb.connect(url, function(error, db){
						console.log('connect error: ');
						console.log(error);
						
						var collection = db.collection('books');
						
						collection.insertMany(bookCollection, function(error, results){
							console.log('insert many error: ');
							console.log(error);
							
							res.send(results);
							db.close(); //close database collection
						});
					});
					
					//res.send('Inserting Books');
				});
	
	return adminRouter;
};

module.exports = router;