var express = require('express');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var route = function(navItems){
	var bookController = require('../controllers/bookController.js')(null, navItems);
	
	var bookRouter = express.Router();

	bookRouter.route('/')
			.get(bookController.getBooks);
			
	bookRouter.route('/:id')
			.get(bookController.getBookById);
			
	return bookRouter;
};
		
module.exports = route;