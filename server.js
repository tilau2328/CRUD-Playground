var express    		= require('express'),        
	app        		= express(),                 
	bodyParser 		= require('body-parser'),
	methodOverride  = require('method-override'), 
	morgan 			= require('morgan'),             
	mongoose   		= require('mongoose'),
	database 		= require('./config/database');
	port 			= process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));                 
app.use(morgan('dev'));                                        
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

mongoose.connect(database.url);
var api = require("./routes/api")(app);
app.get('/', function(req, res) {	
		res.sendfile('./public/index.html');
	});

app.listen(port);
console.log('Magic happens @ http://localhost:' + port + '/');