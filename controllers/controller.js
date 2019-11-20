var request =require('request');
const { Client } = require('pg');

var connectionString = "postgres://postgres:5463jeny@localhost:5432/teamwork";

const client = new Client({
    connectionString: connectionString
});




exports.getFeed = (req , res) => {
    //Controllers to query all data from db and send for home feed displays
    
    client.query('SELECT * FROM articles, gifs', (err, result) => {
         res.send(result.rows)
         console.log(typeof result.rows)
    })
    
    
}

module.exports = exports; 