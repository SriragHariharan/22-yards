const express = require('express')
const app = express()
const bodyparser = require('body-parser')
require('dotenv').config()
const fileUpload = require("express-fileupload");
const cors = require('cors');

//cors
app.use(cors());

//middlewares
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(fileUpload({ createParentPath: true, }) );

//access static images
app.use(express.static('uploads'))

//mongodb connection code
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error("db error ::: ",error))
db.once('open', () => console.log("database connected..."))

//routes
const sellerRouter = require('./routes/SellerRouter')
const buyerRouter = require('./routes/BuyerRouter')

app.use('/api/seller', sellerRouter)
app.use('/api/buyer', buyerRouter)



//PORT
const PORT = process.env.port || 4000
app.listen(PORT, () => console.log(`Server @ http://localhost:${PORT}`))

 
 