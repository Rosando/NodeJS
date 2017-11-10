var express = require('express');


var route = function(navItems){
	var bookService = require('../services/goodreadservice')();
	var bookController = require('../controllers/bookController')(bookService, navItems);
	
	var bookRouter = express.Router();

	bookRouter.route('/')
			.get(bookController.getBooks);
			
	bookRouter.route('/:id')
			.get(bookController.getBookById);
			
	return bookRouter;
};
		
module.exports = route;