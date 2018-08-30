var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');
var app = express();
var io = require('socket.io')(server);
var server = require('http').createServer(app);
var path = require('path');
var Countdown = require('countdown-js');
var readline = require('readline');


var hostname = '0.0.0.0'; 
var port = 8000; 

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res, next){	
	res.sendFile(__dirname + '/index.html');
		
	
});

server.listen(port);



var io = require('socket.io').listen(server);

//variables for python script filenames to scrape scrape directories
var dirscrapecrypt = 'dirscrapecrypt.py'; 
var dirscrapetrain = 'dirscrapetrain.py';
var dirscrapefacility = 'dirscrapefacility.py';


var PythonShell = require('python-shell');
var pyshellcry = new PythonShell(dirscrapecrypt);
var pyshelltra = new PythonShell(dirscrapetrain);
var pyshellfac = new PythonShell(dirscrapefacility);


io.sockets.on('connection', function(socket){
	
	pyshellcry.on('message', function (message) {
	    // On message from python script print filenames to console 
	    console.log(message);
	});

	// end the input stream 
	pyshellcry.end(function (err) {
	    if (err){
	        throw err;
	    };

	    console.log('finished crypt file update');
	});
	
	pyshelltra.on('message', function (message) {
	    // On message from python script print filenames to console
	    console.log(message);
	});

	// end the input stream 
	pyshelltra.end(function (err) {
	    if (err){
	        throw err;
	    };

	    console.log('finished train file update');
	});
	
	pyshellfac.on('message', function (message) {
	    // On message from python script print filenames to console
	    console.log(message);
	});

	// end the input stream 
	pyshellfac.end(function (err) {
	    if (err){
	        throw err;
	    };

	    console.log('finished facility file update');
	});
	
	//On page load send connected message to console
    console.log("We're Connected");


	//Listeners for gamemaster functions.  
    socket.on('sendtoclient', function (themedia) {
        console.log("server received media message from game master");
        socket.broadcast.emit('playmedia', themedia);
        socket.emit('playmedia', themedia);
		});
	
	socket.on('introselected', function () {
        console.log("intro clicked");
        socket.broadcast.emit('playintro');
        socket.emit('playintro');
		});
		
	socket.on('hint1selected', function () {
        console.log("hint1 clicked");
        socket.broadcast.emit('playhint1');
        socket.emit('playhint1');
			
	});
	
	socket.on('audiohintselected', function () {
        console.log("audio hint clicked");
        socket.broadcast.emit('playaudiohint');
        socket.emit('playaudiohint');
			
	});
	
	socket.on('begintime', function () {
        console.log("Timer Button clicked");
        socket.broadcast.emit('starttimer');
        socket.emit('starttimer');
			
	});

	socket.on('resettime', function () {
        console.log("Timer Reset Button clicked");
        socket.broadcast.emit('resettimer');
        socket.emit('resettimer');
			
	});
	
	socket.on('pausetime', function () {
        console.log("Timer Pause Button clicked");
        socket.broadcast.emit('pausetimer');
        socket.emit('pausetimer');
			
	});	
	
	socket.on('startcount', function () {
        console.log("Timer Start Button clicked");
        socket.broadcast.emit('startcount');
        socket.emit('startcount');
			
	});	
	
	socket.on('stopcount', function () {
        console.log("Timer Stop Button clicked");
        socket.broadcast.emit('stoptimer');
        socket.emit('stoptimer');
			
	});	
	
	socket.on('resumecount', function () {
        console.log("Timer Pause Button clicked");
        socket.broadcast.emit('resumetimer');
        socket.emit('resumetimer');
			
	});	
	
	socket.on('pausevideo', function () {
        console.log("Video Pause Button clicked");
        socket.broadcast.emit('pausevid');
        socket.emit('pausevid');
			
	});	
	
	socket.on('resumevideo', function () {
        console.log("Video Resume Button clicked");
        socket.broadcast.emit('resumevid');
        socket.emit('resumevid');
			
	});	
	
	socket.on('pauseaudio', function () {
        console.log("Audio Pause Button clicked");
        socket.broadcast.emit('pauseaud');
        socket.emit('pauseaud');
			
	});	
	
	socket.on('resumeaudio', function () {
        console.log("Video Resume Button clicked");
        socket.broadcast.emit('resumeaud');
        socket.emit('resumeaud');
			
	});	
   var dray = [];
   socket.on('publist', function (data) {
	
	   //Read text files created from python scripts into arrays
	   fs.readFile('cryptcon.txt', function(err, data) {
		    if(err) throw err;
		    var array = data.toString().split(/\r\r\n/);
		    var cryptlist = array.slice(0, -1);
		    
		        
		        console.log(cryptlist);
		 	   socket.broadcast.emit('cryptlist', cryptlist);
		       socket.emit('cryptlist', cryptlist);
		        
		    		});
	   
	   fs.readFile('traincon.txt', function(err, data) {
		    if(err) throw err;
		    var array = data.toString().split(/\r\r\n/);
		    var trainlist = array.slice(0, -1);
		    
		        
		        console.log(trainlist);
		 	   socket.broadcast.emit('tlist', trainlist);
		       socket.emit('tlist', trainlist);
		        
		    		});
	   
	   fs.readFile('facilitycon.txt', function(err, data) {
		    if(err) throw err;
		    var array = data.toString().split(/\r\r\n/);
		    var facilitylist = array.slice(0, -1);
		    
		        
		        console.log(facilitylist);
		 	   socket.broadcast.emit('faclist', facilitylist);
		       socket.emit('faclist', facilitylist);
		        
		    		});
	   

	   
  });


	

});
