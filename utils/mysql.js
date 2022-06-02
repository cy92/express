var mysql = require("mysql");
var dbconfig = require('../config/config.json');

var dbpool = mysql.createPool({
                host            : dbconfig.dbip,
                user            : dbconfig.dbuser,
                password        : dbconfig.dbpass,
                database        : dbconfig.dbname,
                connectTimeout  : 20000
            });


dbpool.getConnection(function(err, connection) {
    // connected! (unless `err` is set)
    console.log(err);
});

dbpool.on('error', function(err) {
    console.log("Database on error : ")
    console.log(err.code); 
});

module.exports = dbpool;