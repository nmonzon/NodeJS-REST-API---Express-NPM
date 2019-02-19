const express = require('express')
const router = express.Router()

router.get('/messages',(req,res) => {
    console.log("show message Example here")
    res.end()
})

module.exports = router