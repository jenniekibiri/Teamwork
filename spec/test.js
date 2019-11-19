var request = require("request");
var helloWorld = require("../index.js")
var base_url = "http://localhost:5000/"
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU3Mzk5MTg0MSwiZXhwIjoxNTc2NTgzODQxfQ.T0dC8yn8y1R-cBmmHtm_GoqXUs0c6gFQoaCFdl1pXsA'

describe("Hello World Server", function() {
  // describe("GET /", function() {
  //   it("returns status code 200", function(done) {
  //     request.get(base_url, function(error, response, body) {
  //       expect(response.statusCode).toBe(200);
  //       done();
  //     });
  //   }, 10000);

  //   // it("returns Hello World", function(done) {
  //   //   request.get(base_url, function(error, response, body) {
  //   //     expect(body).toBe("Hello World");
  //   //     done();
  //   //   });
  //   // });
  // });
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

 describe("GET /article/4", () => {
    var options = {
      url: 'http://localhost:5000/feed',
      headers:{
          'x-access-token': ''
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


describe("POST /", () => {
    var options = {
      url: 'http://localhost:5000/feed',
      headers:{
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU3Mzk5MTg0MSwiZXhwIjoxNTc2NTgzODQxfQ.T0dC8yn8y1R-cBmmHtm_GoqXUs0c6gFQoaCFdl1pXsA'
      },
      query:{
        'fname':'jennie',
        'lname':'kibiri',
        'email':'jennie@gmail.com',
        'password':'jeny123',
        'jobrole':'Admin',
        'department':'QA testing',
        'address':'234 southstreets'

    }
  }
      it("Create new user ", (done) => {
          request.get(options, (error, response, body) => {
              let body2 = JSON.parse(body)
              
              expect(typeof body2).toBe('object')
              if(error){
                  return body.rows;
              }
              done();
          })
      })
      it("checks status", (done) => {
          request.get(options, (err, response, body) => {
              expect(response.statusCode).toBe(200)
          })
          helloWorld.closeServer();
          done();
      })

    
 })

 









 })

