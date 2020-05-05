const express = require('express')

const app = express()
const shops = require('./routes/shops')
app.use(shops)

module.exports = {
  path: '/api',
  handler: app
}
