// load our app server using express
const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('./public'));

app.use(morgan('short'));
//app.use(morgan('combined'));

app.get("/", (req, res) => {
	console.log("Responding to root route");
	res.send("Hello from ROOOT");
});

app.get("/users", (req, res) => {
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

function getConnection(){
	return mysql.createConnection({
		host: 'localhost',
		user: 'root',
		database: 'lbta_mysql'
	})
}

app.get("/user/:id", (req, res) => {
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

app.post('/user_create', (req, res)=>{
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

// localhost:3003
app.listen(3003, () => {
	console.log("Server is up and listening on 3003...");
});