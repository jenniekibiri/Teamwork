//const pg =require('pg');
const { Client } = require('pg');
//const crypto = require('bcryptjs')
//var cloudinary = require('cloudinary').v2;
 //const fileUpload =require('express-fileupload')
//const jwt = require('jsonwebtoken');


/*cloudinary.config({ 
    cloud_name: 'teamworkapp', 
    api_key: '185312112164313', 
    api_secret: '8EpE_sQO-Z8sQaYywuLlKoSh9zQ' 
  });
  */

var connectionString = "postgres://postgres:5463jeny@localhost:5432/teamwork";

const client = new Client({
    connectionString: connectionString
});

//Methode to validate email
// function isValidEmail(email){
//     return /\S+@\S+\.\S+/.test(email);
// }
/*

function generateToken(id){
    const token = jwt.sign({userId: id}, 'secret', {expiresIn: '30d'})
    return token;
}
*/
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



module.exports = exports; 