const dotenv = require('dotenv')
const config = dotenv.config().parsed
const { Router } = require('express')
const router = Router()
const { google } = require('googleapis')
const sheets = google.sheets({
  version: 'v4',
  auth: config.GSHEET_API_KEY
})

/* 店一覧を取得 */
router.get('/shops', async function (req, res, next) {
  /*
  const data = await sheets.spreadsheets.values.get(
    {
      spreadsheetId: config.GSHEET_ID,
      range: 'A' + (id+1) + ':K' +  (id+1),
    }
  )
  if (!data) {
    throw new Error('Invalid google response');
  }
  */
 const page = req.query.page ? parseInt(req.query.page) : 1
 res.json()
})

/* 店情報取得 */
router.get('/shops/:id', async function (req, res, next) {
  const id = parseInt(req.params.id)
  const data = await sheets.spreadsheets.values.get(
    {
      spreadsheetId: config.GSHEET_ID,
      range: 'A' + (id+1) + ':K' +  (id+1),
    }
  )
  if (!data) {
    throw new Error('Invalid google response');
  }
  const resp = data.data.values.map(d => ({
    id: d[0],
    name: d[1],
    tag: d[2].split(','),
    takeout: ( d[3] == 'TRUE' ),
    firstDelivery: ( d[4] == 'TRUE' ),
    thirdDelivery: ( d[5] == 'TRUE' ),
    orderUrl: d[6],
    siteurl: d[7],
    imageUrl: d[8],
    mapUrl: d[9],
    extraInfo: d[10]
  }))[0]
  res.json(resp)
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