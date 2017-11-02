var express = require('express');

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

var bookRouter = express.Router();

bookRouter.route('/')
		.get(function(req, res){
			res.render('./bookListView', {
				pageTitle: 'Books',
				nav: [
					{
						link: '/Books',
						text: 'Books'
					},
					{
						link: '/Authors',
						text: 'Authors'
					}
				],
				books: bookCollection
			});
		});
		
bookRouter.route('/:id')
		.get(function(req, res){
			var id = req.params.id;
			
			var item = bookCollection[id];
			
			res.render('./bookView', {
				pageTitle: item.title,
				nav: [
					{
						link: '/Books',
						text: 'Books'
					},
					{
						link: '/Authors',
						text: 'Authors'
					}
				],
				book: item
			});
		});
		
module.exports = bookRouter;