const dotenv = require('dotenv')
const config = dotenv.config().parsed
const { Router } = require('express')
const router = Router()
const { google } = require('googleapis')
const sheet = google.blogger({
  version: 'v3',
  auth: 'YOUR API KEY'
});

/* 店一覧を取得 */
router.get('/shops', function (req, res, next) {
  res.json(users)
})

/* 店情報取得 */
router.get('/shops/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

/* 店情報追加 */
router.post('/shops', function (req, res, next) {
  if (req.params.key != config.AUTHORIZATION_KEY){
    res.sendStatus(401)
  }
  res.json(users)
})

/* 店情報編集 */
router.put('/shops/:id', function (req, res, next) {
  if (req.params.key != config.AUTHORIZATION_KEY){
    res.sendStatus(401)
  }
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

module.exports = router