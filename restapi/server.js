// importing dependencies

var express = require('express');
var morgan = require('morgan');
var bodyparser = require('body-parser');
//var mongoose = require('mongoose');

//creating a new instance of express
var app = express(); //use this app object to run the server

var http = require('http').Server(app);
var io = require('socket.io')(http);

// add middleware

app.use(bodyparser.urlencoded({extended:true})); // this will only parse string if false

app.use(bodyparser.json());

app.use(morgan('dev'));

// renders all the files under /public

app.use(express.static(__dirname + '/public'));

//var api = require('./app/routes/api')(app,express,io);

//app.use('/api',api); // /api will prefix all our api calls - like localhost:3000/api/signup

//connect to the server

http.listen(4000, function(err){

 if(err){

  console.log("Error");

 }

 else {

  console.log("Server is now listening on port 4000");

 }

}); //server listening on port 4000

//connect to the DATABASE

//mongoose.connect(config.database, function(err){

 //if(err){

 // console.log("Error connecting to local database");

 //} else{

 // console.log("Database Successfully connected !");

// }

//});

// ALL THE API's GO HERE

app.get('*', function(req,res){

 res.sendFile( __dirname + '/public/app/views/index.html');

})
var SerialPort = require("serialport").SerialPort
 var serialPort = new SerialPort("/dev/tty-usbserial1", {
   baudrate: 115200
 });
// var brightness = 0; //static variable to hold the current brightness
// io.sockets.on('connection', function (socket) { //gets called whenever a client connects
//     socket.emit('led', {value: brightness}); //send the new client the current brightness
    
//     socket.on('led', function (data) { //makes the socket react to 'led' packets by calling this function
//         brightness = data.value;  //updates brightness from the data object
//         var buf = new Buffer(1); //creates a new 1-byte buffer
//         buf.writeUInt8(brightness, 0); //writes the pwm value to the buffer
//         serialPort.write(buf); //transmits the buffer to the arduino

//         io.sockets.emit('led', {value: brightness}); //sends the updated brightness to all connected clients
//     });
// });

//list ports
serialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});