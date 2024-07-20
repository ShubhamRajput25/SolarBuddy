var mysql = require('mysql')
var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    port:3306,
    database:'solar_ecom',
    password:'1234',
    multipleStatements:true
})

module.exports = pool