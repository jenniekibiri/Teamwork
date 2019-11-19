const express = require('express')
const controller = require('./Controllers/controller')
const Auth = require('./Controllers/auth')
const fileUpload =require('express-fileupload')

const app = express()
app.use(fileUpload({useTempFiles:true}))


app.get('/feed', Auth.verifyToken, controller.getFeed);

app.get('/article/:article_id', Auth.verifyToken, controller.getArticleById);

app.post('/auth/create-user/v1', Auth.verifyToken, controller.createNewUser);

app.post('/auth/sign-in/v1', controller.Authenticate)

//app.post('/gifs', Auth.verifyToken, controller.createNewGif)

app.listen(process.env.PORT || 5000,() => {
  console.log("listening on port  " )
});

