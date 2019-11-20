const express = require('express');
const controller = require('./Controllers/controller');
const Auth = require('./Controllers/auth');
var request = require("request");



const app = express();

app.get('/', (request,response)=>{
  response.status(200).send('jennie is a developer');
});

/*app.get('/feed', Auth.verifyToken, controller.getFeed);*/
 var server = app.listen(process.env.PORT || 3000,() => {
  console.log("listening on port 3000" )
});

module.exports = server;