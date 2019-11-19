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



module.exports = exports; 