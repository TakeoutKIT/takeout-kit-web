const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const shops = require('./routes/shops')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(shops)
app.use(cors())

module.exports = {
  path: '/api',
  handler: app
}
