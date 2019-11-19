var request = require("request");
var helloWorld = require("../index.js")
var base_url = "http://localhost:5000/"
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU3Mzk5MTg0MSwiZXhwIjoxNTc2NTgzODQxfQ.T0dC8yn8y1R-cBmmHtm_GoqXUs0c6gFQoaCFdl1pXsA'

describe("Hello World Server", function() {
 
  describe("GET /feed", () => {
    var options = {
      url: 'http://localhost:5000/feed',
      headers:{
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU3Mzk5MTg0MSwiZXhwIjoxNTc2NTgzODQxfQ.T0dC8yn8y1R-cBmmHtm_GoqXUs0c6gFQoaCFdl1pXsA'
      }
  }
      it("returns all the data of articles ad gifs", (done) => {
          request.get(options, (error, response, body) => {
              let body2 = JSON.parse(body)
              
              expect(typeof body2).toBe('object')
              if(error){
                  return error;
              }
              helloWorld.closeServer();
              done();
          })
      })

    
 })

 })

