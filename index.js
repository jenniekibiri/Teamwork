const express = require('express')
const controller = require('./Controllers/controller.')
const Auth = require('./Controllers/auth')
const fileUpload =require('express-fileupload')
//var cloudinary = require('cloudinary');
const app = express()
app.use(fileUpload({useTempFiles:true}))

app.get('/feed', Auth.verifyToken, controller.getFeed)

app.get('/article/:article_id', Auth.verifyToken, controller.getArticleById)

app.post('/auth/create-user/v1', Auth.verifyToken, controller.createNewUser)

app.post('/auth/sign-in/v1', controller.Authenticate)

app.post('/gifs', Auth.verifyToken, controller.createNewGif)

app.post('/article', Auth.verifyToken, controller.createArticle)

app.post('/articles/article_id/comments', Auth.verifyToken, controller.CommentArticle)

app.post('/gifs/gif_id/comments/v1', Auth.verifyToken, controller.commentGif)

app.put('/article/edit_article', Auth.verifyToken, controller.editArticle)



var server = app.listen(process.env.PORT || 5000,() => {
    console.log("listening on port 5000" + server.address().PORT)
});
module.exports =server;