const pg =require('pg');
const { Client } = require('pg');
const jwt = require('jsonwebtoken')

var connectionString = "postgres://postgres:5463jeny@localhost:5432/teamwork";

const client = new Client({
    connectionString: connectionString
});

exports.verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token']
    if(!token){
        res.status(400).send({'message':'Token not provided'})
        
    }
    
     try{
        const decoded = await jwt.verify(token, 'secret')
       client.query(`SELECT * FROM account WHERE user_id ='${decoded.userId}' `,(err, result) => {
            const rows = result.rows;
            if(!rows[0]){
                res.status(400).send({'message' : 'The token provided is invalid'})
            }
            console.log(decoded.userId)
            
            req.user = {id : decoded.userId}
            

        })
        
        next()
        
    }catch(error){
        res.status(400).send(`error is ${error}`)
        console.log(error)
    }
}

module.exports = exports;