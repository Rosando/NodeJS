var express = require('express');

var authorRouter = express.Router();

authorRouter.route('/')
		.get(function(req, res){
			res.send('Hello Author');
		});
		
module.exports = authorRouter;