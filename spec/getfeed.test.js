/* eslint-disable no-undef */
var request = require("request");

describe("Server",()=>{
   let server;
  beforeAll(()=>{
    server = require("../index");
  });
  afterAll(()=>{
    server.close();
  });
describe("GET /",()=>{
  var data ={};
  beforeAll((done)=>{
    request.get('http://localhost:3000/',(error,response,body)=>{
      data.status =response.statusCode;
      data.body=body;
      done();
    });
  });
  it('Status 200',()=>{
expect(data.status).toBe(200);
  });

  it("body",()=>{
    expect(data.body).toBe("jennie is a developer");

  server.close();
    
  });
 
});
});
/*
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU3Mzk5MTg0MSwiZXhwIjoxNTc2NTgzODQxfQ.T0dC8yn8y1R-cBmmHtm_GoqXUs0c6gFQoaCFdl1pXsA'

describe("Server", function() {
 
  describe("GET /feed", () => {
    var options = {
      url: 'http://localhost:5000/feed',
      headers:{
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU3Mzk5MTg0MSwiZXhwIjoxNTc2NTgzODQxfQ.T0dC8yn8y1R-cBmmHtm_GoqXUs0c6gFQoaCFdl1pXsA'
      }
  }
      it("returns all the data of articles and gifs", (done) => {
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

*/