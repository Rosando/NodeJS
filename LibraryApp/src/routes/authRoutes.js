var express = require('express');
var mongodb = require('mongodb').MongoClient;

var authRouter = express.Router();

var router = function(){
	authRouter.route('/Signup')
				.post(function(request, response){
					console.log(request.body);
					//response.send("auth router");
					
					var url = 'mongodb://localhost:27017/LibraryApp';
					
					mongodb.connect(url, function(eror, db){
						var collection = db.connection('users');
						
						var user = {
							username: req.body.username,
							password: req.body.password
						};
						
						collection.insert(user, funciton(error, results){
							request.loging(results, function(){
								respose.redirect('/Auth/Profile');
							});
						});
					});
					
					// request.login(request.body, function(){
						// response.redirect('/Auth/Profile');
					// });
				});
				
	authRouter.route('/Profile')
				.get(function(request, response){
					console.log('Profile page');
					console.log(request.use);
					response.json(request.user);
				});
				
	return authRouter;
};

module.exports = router;
