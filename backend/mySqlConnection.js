module.exports = function () {

    let mysql = require('mysql2')
    let connCreds = require('./connectionsConfig.json');
    //Establish Connection to the DB
    let connection = mysql.createConnection({
        host: connCreds["host"],
        user: connCreds['user'],
        password: connCreds['password'],
        database: connCreds['database'],
        port: 3306
    });

    //Instantiate the connection
    connection.connect(function (err) {
        if (err) {
            console.log(`connectionRequest Failed ${err}`)
        } else {
            console.log('DB connectionRequest Successful ')
        }
    });

    //return connection object
    return connection
}




// var connection = mysql2.createConnection({
//   host: "localhost:3306",
//   database: "Contacts",
//   user: "root",
//   password: "Roha@341999",
// });

// connection.connect(function (err) {
//     if (err) {
//         console.log(`connectionRequest Failed ${err.stack}`)
//     } else {
//         console.log(`DB connectionRequest Successful ${connection.threadId}`)
//     }
// });



// function searchPhoneNo(data) {
//     connection.query(
//       "SELECT * FROM phoneBook WHERE phoneNo = " + mysql2.escape(data),
//       function (err, result, fields) {
//         if (err) {
//           throw err;
//         }
//         console.log(result);
//         return result;
//       }
//     );
//   }