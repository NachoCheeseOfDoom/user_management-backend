const mysql = require('mysql2');

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}:
${process.env.MYSQLHOST}:${process.env.MYSQLPORT}:${process.env.MYSQLDATABASE}:`

const connection = mysql.createConnection(urlDB);

connection.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = connection;
