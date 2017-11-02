var express = require('express');

var app = express(); //create a instance of express

var port = process.env.PORT || 5000;

//setup middleware to access the files from public directory
app.use(express.static('public'));

//app.use(express.static('src/views'));

//set the views vairable to path where the views will be stored
app.set('views', './src/views');

//using jade templating engine
app.set('view engine', 'jade');

app.get('/', function(req, res){
	//console.log(req.url);
	//res.send('Helloworld');
	res.render('./jade/index', {list:['1','2','3','4','5']});
});

app.get('/books', function(req, res){
	console.log(req.url);
	res.send('Hello Books');
});

app.listen(port, function(){
	console.log('Server running on port: ' + port);
});