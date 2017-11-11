var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function(){
	nodemon({
		script: 'app.js', //what script it will run
		ext: 'js', //watch for js extension
		env: {
			PORT: 8001
		},
		ignore: ['./node_modules/**']
	})
	.on('restart', function(){
		console.log('Restarted Application');
	});
});