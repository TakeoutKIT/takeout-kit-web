const express = require('express')
const cors = require('cors')

const app = express()
const shops = require('./routes/shops')

app.use(shops)
app.use(cors())

module.exports = {
  path: '/api',
  handler: app
}
