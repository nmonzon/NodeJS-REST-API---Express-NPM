//load app server using express
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

/*router.get('/messages', (req,res) => {
  console.log("show message")
  res.end() 
})*/

const router = require('./routes/user.js')

app.use(router)

//pasar info de una pantalla a otra
const bodyParser = require('body-parser')

//busca una request por mi.
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))


//app.use(morgan('combined'))
app.use(morgan('short'))

//definimos una accion para la ruta '/'
app.get("/",(req, res) => {
  console.log("Responding to root route")
  res.send("Hello from Root")
})

//localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on 3003...")
})