const mysql = require('mysql');

const poolConn = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: 's4ndr0i99i',
	database: 'lbta_mysql'
})

module.exports = poolConn;