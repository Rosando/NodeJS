var express = require('express');
var sql = require('mssql');

var bookCollection = [
	{
		id: 0,
		title: 'Life On The Mississippi',
		genre: 'History',
		author: 'Mark Twain',
		read: false
	},
	{
		id: 1,
		title: 'Childhood',
		genre: 'Biography',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	},
	{
		id: 2,
		title: 'War and Peace',
		genre: 'Historical Fiction',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	}
];

var route = function(navItems){
	var bookRouter = express.Router();

	bookRouter.route('/')
			.get(function(req, res){
				var request = new sql.Request();
				
				request.query('select * from books', function(error, recordSet){
					res.render('./bookListView', {
						pageTitle: 'Books',
						nav: navItems,
						books: recordSet
					});
				});
			});
			
	bookRouter.route('/:id')
			.all(function(req, res, next){
				var perparedStatement = new sql.PreparedStatement();
				
				perparedStatement.input('id', sql.Int);
				
				perparedStatement.prepare('select * from books where id = @id', function(error){
					
					perparedStatement.execute({id: req.params.id}, function(error, recordSet){
						if(recordSet === 0){
							res.status(404).send('Not Found');
						}
						else {
							req.book = recordSet[0];
							next();
						}
					});
				});
			})
			.get(function(req, res){
				//var id = req.params.id;
				//var item = bookCollection[id];
				
				res.render('./bookView', {
					pageTitle: req.book.title,
					nav: navItems,
					book = req.book
				});
			});
			
	return bookRouter;
};
		
module.exports = route;