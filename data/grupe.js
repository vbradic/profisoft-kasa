const mysqlConnection = require('./db/mysqlConnection');
const connection = mysqlConnection.connection;

var query = 'SELECT * FROM grupa LIMIT 20';

var sql = connection.query(query, function(err, result) {
    if(err) {
       console.log(err);
    }
    var rows = JSON.parse(JSON.stringify(result));
    console.log('rows::'+JSON.stringify(rows));
    //var rows = JSON.parse(JSON.stringify(result));
});