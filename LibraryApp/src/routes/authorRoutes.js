var express = require('express');

var route = function(navItems){
	var authorRouter = express.Router();

	authorRouter.route('/')
		.get(function(req, res){
			res.send('Hello Author');
		});
		
	return authorRouter;
};

		
module.exports = route;