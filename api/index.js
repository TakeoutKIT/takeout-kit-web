const express = require('express')

const app = express()
const shops = require('./routes/shops')
app.use(shops)

// CORSを許可する
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

module.exports = {
  path: '/api',
  handler: app
}
