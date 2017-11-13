var bookController = function(Book){
	var post = function(req, res){
		var book = new Book(req.body);
		
		book.save(function(err){
			if(err)
				res.status(500).send(err);
			else
				res.json(book);
		});
	};
	
	var get = function(req, res){
		var query = {};
		
		if(req.query.id)
			query.id = req.query.id;
		
		if(req.query.title)
			query.title = req.query.title;
		
		if(req.query.author)
			query.author = req.query.author;
		
		if(req.query.genre)
			query.genre = req.query.genre;
		
		if(req.query.read)
			query.read = req.query.read;
		
		Book.find(query, function(err, books){
			if(err)
				res.status(500).send(err);
			else
				res.json(books);
		});
	};
	
	return {
		post: post,
		get: get,
	};
};

module.exports = bookController;