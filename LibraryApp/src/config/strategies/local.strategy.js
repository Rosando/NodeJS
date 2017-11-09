var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(){
	console.log('called');
	passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	}, function(username, password, done){
		var user = {
			username: username,
			password: password
		};
		console.log('local.strategy');
		console.log(user);
		done(null, user);
	}));
};