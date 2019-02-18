const dbConn = require('../conn/db');
const mongoose = require('mongoose');

function getConnection(){
	return dbConn;
}



module.exports = getAll = () =>{
	return "HOLA";
}