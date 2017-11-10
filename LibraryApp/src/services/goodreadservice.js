var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});

var goodreadservice = function(){
	var getBookById = function(id, callback){
		
		var options = {
			host: 'www.goodreads.com',
			path: '/book/show/656?format=xml&key=mN1DyVoFS4cfbCMh5HmnpA'
		};
		
		var callbackMethod = function(response){
			var str = '';
			
			response.on('data', function(chunk){
				str += chunk;
			});
			
			response.on('end', function(){
				parser.parseString(str, function(error, result){
					callback(error, result.GoodreadsResponse.book);
				});
			});
		};
		
		http.request(options, callbackMethod).end();
	};
	
	return {
		getBookById: getBookById
	};
};

module.exports = goodreadservice;