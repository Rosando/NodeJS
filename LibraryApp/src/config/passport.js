var passport = require('passport');

module.exports = function(app){
	app.use(passport.initialize());
	app.use(passport.session());
	
	passport.serializeUser(function(user, done){
		console.log('serialize user');
		console.log(user);
		done(null, user);
		//done(null, user.Id);
	});
	
	//passport.deserializeUser(function(userId, done){
		//get user from database using the userId
		//pass the user in the call back method
		
	passport.deserializeUser(function(user, done){
		console.log('deserialize user');
		console.log(user);
		done(null, user);
	});
	
	require('./strategies/local.strategy')();
};