const express = require('express')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(fileUpload())

const sellerRouter = require('./routes/SellerRouter')
const buyerRouter = require('./routes/BuyerRouter')

app.use('/api/seller', sellerRouter)
app.use('/api/buyer', buyerRouter)

module.exports = app
