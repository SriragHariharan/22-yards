const express = require('express')
const app = express()
const bodyparser = require('body-parser')
require('dotenv').config()

//middlewares
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

//routes
const sellerRouter = require('./routes/SellerRouter')

app.use('/api/seller', sellerRouter)


//mongodb connection code
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/22Yards')
const db = mongoose.connection
db.on('error', (error) => console.error("db error ::: ",error))
db.once('open', () => console.log("database connected..."))


//PORT
const PORT = process.env.port || 4000
app.listen(PORT, () => console.log(`Server @ http://localhost:${PORT}`))

 
 