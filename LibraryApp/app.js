var express = require('express');
var sql = require('mssql');

var config = {
	user: 'admin',
	password: 'password',
	server: 'Rosando-PC',
	database: 'LibraryApp'
};

sql.connect(config, function(error
	console.log(error);
});

var app = express(); //create a instance of express

var port = process.env.PORT || 5000;

//setup middleware to access the files from public directory
app.use(express.static('public'));

//app.use(express.static('src/views'));

//set the views vairable to path where the views will be stored
app.set('views', './src/views');

//using jade templating engine
//app.set('view engine', 'jade');

//using ejs templating engine
app.set('view engine', 'ejs');

var navItems = [
					{
						link: '/Books',
						text: 'Books'
					},
					{
						link: '/Authors',
						text: 'Authors'
					}
				];

//using router to build route for books - moving book routing logic to bookRoutes.js
//only leave middlewar configuration by using modules
var bookRouter = require('./src/routes/bookRoutes')(navItems);		
app.use('/Books', bookRouter);

//using router to build route for author - moving author routing logic to authorRoutes.js	
var authorRouter = require('./src/routes/authorRoutes')(navItems);
app.use('/Authors', authorRouter);

app.get('/', function(req, res){
	//console.log(req.url);
	//res.send('Helloworld');
	res.render('./index', {
		pageTitle: 'Library App',
		nav: navItems
	});
});

// app.get('/books', function(req, res){
	// console.log(req.url);
	// res.send('Hello Books');
// });

app.listen(port, function(){
	console.log('Server running on port: ' + port);
});