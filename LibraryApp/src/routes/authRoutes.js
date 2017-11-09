var express = require('express');
var mongodb = require('mongodb').MongoClient;

var authRouter = express.Router();

var router = function(){
	authRouter.route('/Signup')
				.post(function(request, response){
					console.log(request.body);
					response.send("auth router");
				});
				
	return authRouter;
};

module.exports = router;
