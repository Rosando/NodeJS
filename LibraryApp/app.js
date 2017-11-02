var express = require('express');

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

app.get('/', function(req, res){
	//console.log(req.url);
	//res.send('Helloworld');
	res.render('./index', {
		pageTitle: 'Library App',
		nav: [
			{
				link: '/Books',
				text: 'Books'
			},
			{
				link: '/Authors',
				text: 'Authors'
			}
		]
	});
});

app.get('/books', function(req, res){
	console.log(req.url);
	res.send('Hello Books');
});

app.listen(port, function(){
	console.log('Server running on port: ' + port);
});