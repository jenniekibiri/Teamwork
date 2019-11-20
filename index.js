var express = require('express');
const controller = require('./Controllers/controller')
const Auth = require('./Controllers/auth')
var app = express();
var exports = module.exports = {};

app.get('/', function(req, res){
  res.send('get feed');
});

app.get('/feed', Auth.verifyToken, controller.getFeed);


var server = app.listen(3000, function(){
  console.log('Magic is happening on port  3000 watch out');
});

exports.closeServer = function(){
  server.close();
};