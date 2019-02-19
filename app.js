//load app server using express
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')


//pasar info de una pantalla a otra
const bodyParser = require('body-parser')

//busca una request por mi.
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

//app.use(morgan('combined'))
app.use(morgan('short'))

app.post('/user_create', (req,res) => {
  console.log("Trying to create a new user...")
  console.log("How do we get data from form")

  console.log("First name: " + req.body.create_first_name)
  const firstName = req.body.create_first_name
  const lastName = req.body.create_last_name

  const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
  getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
    if (err) {
      console.log("Failed to insert new user: " + err)
      res.sendStatus(500)
      return
    }

    console.log("Inserted a new user with id: ", results.insertedId);
  })

})

function getConnection(){
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'maricel17',
    database: 'nodeJS'
  })
}

app.get('/users/:id',(req, res) => {
    console.log("Fetching user with id: "+ req.params.id)

    /*const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'maricel17',
      database: 'nodeJS'
    })*/
    const connection = getConnection()

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
app.listen(3004, () => {
  console.log("Server is up and listening on 3003...")
})