var request = require("request");
var helloWorld = require("../index.js")
var base_url = "http://localhost:3000/"
 var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjU1LCJpYXQiOjE1NzM5ODg5NDIsImV4cCI6MTU3NjU4MDk0Mn0.wQrKgnxKgx8Y_LwrSJcpRJUgKKiRRv5rRkm3t59wtxw'

describe(" get feed Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns get feed", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).toBe('get feed');
        done();
        
      });
    });
  },5000);
 describe("GET /feed",()=>{
   var data = { 
    url: 'http://localhost:3000/feed',
    headers:{
      'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjU1LCJpYXQiOjE1NzM5ODg5NDIsImV4cCI6MTU3NjU4MDk0Mn0.wQrKgnxKgx8Y_LwrSJcpRJUgKKiRRv5rRkm3t59wtxw'
    }
   }
   it("returns all data from gifs and articles",(done)=>{
     request.get(data,(error,response,body)=>{

      expect(()=>{
        JSON.parse(body)
      })
       
        done();
     })
   })
// it('api should have list of all gif and articles',()=>{
//   request.get(data,(error,response,body)=>{
//     let feed  = JSON.parse(body);
//     const articleRows =articles.map((articleRows))

    
//   })
// })

 },5000);
 
describe('get  /article/4', ()=>{
  var data ={
    url:'http://localhost:3000/article/:article_id',
    headers:{
      'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjU1LCJpYXQiOjE1NzM5ODg5NDIsImV4cCI6MTU3NjU4MDk0Mn0.wQrKgnxKgx8Y_LwrSJcpRJUgKKiRRv5rRkm3t59wtxw'
    }
  }
  it('returns an article for specified id',(done)=>{
    request.get(data,(error,response,body)=>{
      expect(()=>{
        JSON.parse(body)
      })
      helloWorld.closeServer();
      done();
    })
  })

})


 })
