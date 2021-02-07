var mysql = require('mysql');
// let connection = mysql.createConnection({
// host     : 'localhost',
// port     : '9907',
// user     : 'devuser',
// password : 'devpass',
// database : 'test_db'
// });

let connection = mysql.createConnection({
    host     : '10.0.0.15',
    port     : '3306',
    user     : 'profisoft',
    password : 'Ps062015+',
    database : 'mardat_2'
    });

//export  default  connection;//
module.exports = { connection, };
