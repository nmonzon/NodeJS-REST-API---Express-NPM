//load app server using express
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('combined'))
//app.use(morgan('short'))

app.get('/users/:id',(req, res) => {
    console.log("Fetching user with id: "+ req.params.id)

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'maricel17',
      database: 'nodeJS'
    })

    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"
    connection.query( queryString, [userId],(err, rows, fields) => {
      if (err){
        console.log("Failed to query for users:" + err)
        res.sendStatus(500)
        return
        //throw err
      }
      
      console.log("I think we fetched user successfully")

      const users = rows.map((row) => {
        return {firstName: row.first_name, lastName: row.last_name}
      })

      res.json(users)
    })
    //res.end()
})

app.get('/users',(req,res) => {
var user1 = {firstName: "Stephen", lastName:"Curry"}
const user2 = {firstName: "Kevin", lastName:"Durant"}
res.json([user1, user2])
  //res.send("nodemon auto updates when i save the file")
})

//definimos una accion para la ruta '/'
app.get("/",(req, res) => {
  console.log("Responding to root route")
  res.send("Hello from Root")
})

//localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on 3003...")
})