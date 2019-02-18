//It will contain all of my user related routes.
const express = require('express');
const users = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const userRepository = require('../repository/userRepository');



users.get('/test', (req, res) => {
	let a = userRepository.getAll;
	console.log(a);
	/*let user = new User({
		_id: new mongoose.Types.ObjectId(),
		first_name : 'Sandro',
		last_name : 'Dezerio',
		address: {
			_id: mongoose.Schema.Types.ObjectId,
			street: "Serrano",
			number: 814,
			zipCode: 1704
		}
	});
	res.json(user);*/
	res.end();
});

users.get("/users", (req, res) => {
	const connection = getConnection();
	const queryString = "SELECT * FROM users";
	connection.query(queryString, (err, rows, fields)=>{
		if(err){
			console.log("Failed to query for users: "+err);
			res.sendStatus(500);
			return ;
		}
		const users = rows.map((row)=>{
			return {firstName: row.first_name, lastName: row.last_name}
		});
		res.json(users);
	});
});

users.get("/user/:id", (req, res) => {
	console.log("Fetching user with id: "+req.params.id);
	const connection = getConnection();

	const userId = req.params.id;
	const queryString = "SELECT * FROM users WHERE id = ?";
	connection.query(queryString, [userId], (err, rows, fields) => {
		if(err){
			console.log("Failed to query for users: "+err);
			res.sendStatus(500);
			return ;
		}
		console.log("I think we fetched users succestufully");
		const users = rows.map((row)=>{
			return {firstName: row.first_name, lastName: row.last_name}
		});
		res.json(users);
	});
	//res.end();
});

users.post('/user_create', (req, res)=>{
	const firstName = req.body.create_first_name;
	const lastName = req.body.create_last_name;

	const queryString="INSERT INTO users (first_name, last_name) VALUES (?, ?)";
	getConnection().query(queryString, [firstName, lastName], (err, result, fields)=>{
		if(err){
			console.log("Failed to insert a new user: " + err);
			res.sendStatus(500);
			return ;
		}

		console.log("Inserted a new user with id: ",result.insertId);
		res.end();
	});
});

getData = (req) => {
	let user = new User({
		_id: new mongoose.Types.ObjectId(),
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		address: {
			_id: mongoose.Schema.Types.ObjectId(),
			street: req.body.street,
			number: req.body.number,
			zipCode: req.body.zipCode
		}
	});
	return user;
}

module.exports = users;