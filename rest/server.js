//importing dependencies

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//require config file
var config = require('./config');

//creating a new instance of express

var app = express(); // use app object to run our server

var http = require('http').Server(app);
var io = require('socket.io')(http);


// add middleware
app.use(bodyParser.urlencoded({extended:true})); // this will only parse string if false
app.use(bodyParser.json());
app.use(morgan('dev'));

// renders all the files under /public

app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app,express,io);
app.use('/api',api); // /api will prefix all our api calls - like localhost:3000/api/signup












//connect to the server
http.listen(config.port, function(err){
	if(err){
		console.log("Error");
	}
	else {
		console.log("Server is now listening on port 3000");
	}
}); //server listening on port 3000

//connect to the DATABASE

mongoose.connect(config.database, function(err){
	if(err){
		console.log("Error connecting to local database");

	} else{
		console.log("Database Successfully connected !");
	}
});





// ALL THE API's GO HERE

app.get('*', function(req,res){
	res.sendFile( __dirname + '/public/app/views/index.html');

})



