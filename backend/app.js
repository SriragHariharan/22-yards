const express = require('express')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
)
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(fileUpload())

app.get('/test', (req, res) => {
  res.json({ ok: true, message: 'Backend is running' })
})

const sellerRouter = require('./routes/SellerRouter')
const buyerRouter = require('./routes/BuyerRouter')

app.use('/api/seller', sellerRouter)
app.use('/api/buyer', buyerRouter)

module.exports = app
