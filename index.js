const express = require('express')
const controller = require('./Controllers/controller')
const Auth = require('./Controllers/auth')
const fileUpload =require('express-fileupload')

const app = express()
app.use(fileUpload({useTempFiles:true}))


app.get('/feed', Auth.verifyToken, controller.getFeed);
app.listen(process.env.PORT || 5000,() => {
  console.log("listening on port  " )
});
