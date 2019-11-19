const pg =require('pg');
const { Client } = require('pg');
const crypto = require('bcryptjs')
var cloudinary = require('cloudinary').v2;
 const fileUpload =require('express-fileupload')
const jwt = require('jsonwebtoken');


cloudinary.config({ 
    cloud_name: 'teamworkapp', 
    api_key: '185312112164313', 
    api_secret: '8EpE_sQO-Z8sQaYywuLlKoSh9zQ' 
  });
  

var connectionString = "postgres://postgres:5463jeny@localhost:5432/teamwork";

const client = new Client({
    connectionString: connectionString
});

//Methode to validate email
function isValidEmail(email){
    return /\S+@\S+\.\S+/.test(email);
}

function generateToken(id){
    const token = jwt.sign({userId: id}, 'secret', {expiresIn: '30d'})
    return token;
}

client.connect(err => console.log(err));

exports.getFeed = (req , res) => {
    //Controllers to query all data from db and send for home feed displays
    
    client.query('SELECT * FROM articles, gifs', (err, result) => {
         res.send(result.rows)
         console.log(typeof result.rows)
    })
    
    
}

exports.getArticleById = (req , res) => {
    //Controllers to query db for one article as params.article_id
    client.query(`SELECT * FROM articles WHERE article_id =${req.params.article_id} `, (err, result) => {
        res.send(result.rows)
    })
}



exports.createNewUser = (req , res) => {
    const token = req.headers['x-access-token']
     const decoded =  jwt.verify(token, 'secret')
    client.query(`SELECT * FROM account WHERE user_id = ${decoded.userId}`, (err, result) => {
        // if(result.rows[0].job_role != 'Admin'){
        //     res.send({'message':'Only admins can Create new user'})
        // }
        crypto.hash(req.query.password, 12)
        .then(encryptedPassword => {
            client.query(`INSERT INTO account(first_name,last_name,email,password,job_role,department,address) VALUES('${req.query.fname}','${req.query.lname}','${req.query.email}','${encryptedPassword}','${req.query.jobrole}','${req.query.department}','${req.query.address}')`, (err, result) => {
                res.status(200,'successful').send(`${result.rows[0]} or err is ${err} and pass is ${encryptedPassword}`)
                
            })
        })
    })

    
    
    //Controllers for admin to create new employee
    

    //Admin  must be authenticated to access this endpoint
}

exports.Authenticate = (req , res) => {
    //Controller to manage Uthentication of both admin and employees
const password = req.query.password
    if(!isValidEmail(req.query.email)){
        res.send("Email is invalid").status(400)
    }
    // if(!password){
    //     res.send("please input password")
    // }
    try{
 client.query(`SELECT * FROM account WHERE email = '${req.query.email}'`, (err, result) => {
        const rows = result.rows
        

        if(!rows[0]){
            res.send({'message': 'The credentials are invalid'}).status(400)
        }
        if(crypto.compare(req.query.password, rows.password)){

            const token = generateToken(rows[0].user_id)
            res.status(200).send(token)
            console.log(rows[0].password)
        }else{
            res.send({'message' : 'the credentials provided are incorrect'})

        }
    })
    
    

     } catch(error){
        res.status(400).send(error)
        console.log(error)
    }




}

exports.createNewGif = (req , res ,next) => {
    //Controller to enable creation of new gifs
    const file = req.files.photo;
    console.log(file)
    cloudinary.uploader.upload(file.tempFilePath,(err,resultcl)=>{
        console.log(`This is from cloudinary ${resultcl.url}`);
    
    const token = req.headers['x-access-token']
    const dateCreated = Date().replace('GMT+0300', ' ').replace(' (East Africa Time)', '');
    
    if(!token){
        res.send({'message':'You need to be logged in to do this'}).status(400)
    }
    try{
        const decoded = jwt.verify(token, 'secret')
        client.query (`INSERT INTO gifs(author_id, gif_title, image_url, created_on, category) VALUES('${decoded.userId}','${req.query.title}','${resultcl.url}','${dateCreated}','${req.query.category}') `, (err, result) => {
            res.send({'message':`Post '${req.query.title}' is Successfully Uploaded `}).status(200)
            console.log(err)
        })
    }catch(err){
        res.send(`error from catch is: ${err}`)
    }
    
})
}

exports.createArticle = async (req , res) => {
    //Controller to enable creation of new articles
    const token = req.headers['x-access-token']
    if(!token){
        res.send({'message':'You need to be logged in to do this'}).status(400)
    }
    try{
        const decoded = jwt.verify(token, 'secret')
        await client.query(`INSERT INTO articles(author_id, article_title, article, created_on, category) VALUES('${decoded.userId}','${req.query.title}','${req.query.article}','${req.query.created}','${req.query.category}') `, (err, result) => {
            res.send({'message':`Post '${req.query.title}' is Successfully Uploaded `}).status(200)
            console.log(err)
        })
    }catch(err){
        res.send(`error from catch is: ${err}`)
    }
}

exports.editArticle = (req , res) => {
    //Controller to enable editing of an article based on params.article_id
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, 'secret')
    console.log(decoded)
    client.query(`SELECT * FROM articles WHERE article_id = ${req.query.article_id}`, (err, result) => {
        if(result.rows[0].author_id != decoded.userId){
            res.send({'message':`you can only edit what you created your id ${decoded.userId}`})
        }
    })
    
    try{
        if(req.query.title || req.query.article || req.query.category){
            client.query(`UPDATE articles SET title = '${req.query.title}', article = '${req.query.article}','${req.query.category}' WHERE article_id = '${req.query.article_id}'`, (err, result) => {
                res.send({'message': 'Article edited successuflly'})
            })
        }
 
         client.query(`SELECT * FROM articles WHERE article_id = ${req.query.article_id}`, (err, result) => {

            res.send(`rsult is: ${result.rows[0]} or error is: ${err}`)
            console.log(err)
        })
    }catch(err){
        res.send(`error from catch is: ${err}`)
    }
    

}
exports.deleteGif = (req , res) => {
    //Controller to enable deleting of a gif as per params.gif_id
    //Must be authenticated as Admin or creator of gif
    const token = req.headers['x-access-token']
    try{
        const decoded = jwt.verify(token, 'secret')
        client.query(`SELECT * FROM gifs WHERE gif_id = ${req.params.gif_id}`, (err, result) => {
            if(decoded.userId !== result.rows[0].author_id){
                res.send({'message':'you can only delete what you created'})
            }
            else{
                client.query(`DELETE FROM gifs WHERE gif_id = ${req.params.gif_id}`, (err, result) => {
                    res.send({'message':`Gif Deleted Succesfully`})
                    console.log(`err: ${err} or result ${result.rows}`)
                })
                //res.send(`result is: ${result.rows[0].category} or error is: ${req.params.gif_id}`)
            }
            console.log(`${result.rows[0].author_id} and ${decoded.userId}`)
        })
    }catch(err){
        res.send(`err is ${err}`)
        console.log(err)
    }

}

exports.CommentArticle = (req , res) => {
    //Contoller to show all comments of a post
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, 'secret')
    const dateCreated = Date().replace('GMT+0300', ' ').replace(' (East Africa Time)', '')
    try{
        client.query(`INSERT INTO comments(created_on, comment, author_id, article_id) VALUES('${dateCreated}','${req.query.comment}','${decoded.userId}','${req.query.article_id}')`, (err, result) => {
            res.send({'message': `Comment ${dateCreated}successfully captured or error is: ${err}`})
        })

    }catch(err){
        res.send(`this is the error ${err}`)

    }
}

exports.commentGif = (req , res) => {
    //Controller show all comments of a gif
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, 'secret')
    const dateCreated = Date().replace('GMT+0300', ' ').replace(' (East Africa Time)', '')
    try{
        client.query(`INSERT INTO comments(created_on, comment, author_id, gif_id) VALUES('${dateCreated}','${req.query.comment}','${decoded.userId}','${req.query.gif_id}')`, (err, result) => {
            res.send({'message': `Comment successfully captured or error is: ${err}`})
        })

    }catch(err){
        res.send(`this is the error ${err}`)

    }
}



module.exports = exports;