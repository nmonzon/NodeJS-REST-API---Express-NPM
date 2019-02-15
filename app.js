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

const router = require('./routes/user.js');

app.use(router);

const PORT = process.env.PORT || 3003
// localhost:PORT
app.listen(PORT, () => {
	console.log("Server is up and listening on ..."+ PORT);
});