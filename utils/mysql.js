let mysql = require("mysql");
let dbconfig = require('../config/config.json');

let dbpool = mysql.createPool({
                host            : dbconfig.dbip,
                user            : dbconfig.dbuser,
                password        : dbconfig.dbpass,
                database        : dbconfig.dbname,
                connectTimeout  : 20000,
                connectionLimit : 10
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