/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var fs = require('fs');
var path = require('path');
// var mime = require('mime');
var express = require('express');
var bodyParser = require('body-parser');
var body = {
  results: []    
};

fs.exists('messages.txt', function(exists) {
  if (exists) {
    fs.readFile('messages.txt', function(error, data) {
      if (error) {
        console.log('Failed to load messages.txt', error);
      } else { 
        body = JSON.parse(data);
      }
    });
  } else {
    console.log('Failed to load messages.txt');
  }
});

app = express();
app.use(bodyParser.json());
app.use(express.static('client'));

var port = process.env.PORT || 3000;
// var ip = '127.0.0.1';
app.listen(port, function() {
  console.log('Server running...');
});

app.all('/classes/messages', function(request, response, next) {
  response.header('access-control-allow-origin', '*');
  response.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.header('access-control-allow-headers', 'content-type, accept');
  response.header('access-control-max-age', 10);
  next();
});
app.get('/classes/messages', function(request, response) {
  if (request.method === 'OPTIONS') {
    response.send(200);
  }
  response.header();
  response.status(200).json(body);
});
app.post('/classes/messages', function(request, response) {
  body.results.push(request.body);
  response.status(201).end();
  console.log('Successfully received message');
  fs.writeFile('messages.txt', JSON.stringify(body), function(err) {
    if (err) {
      throw err;
    } else {
      console.log('Successfully saved messages: ');
    }
  });
});