require('dotenv').config()
const { Router } = require('express')
const router = Router()
const { google } = require('googleapis')
const sheets = google.sheets({
  version: 'v4',
  auth: process.env.GSHEET_API_KEY
})

/* 店一覧を取得 */
router.get('/shops', async function (req, res, next) {
  const page = isFinite(req.query.page) ? parseInt(req.query.page) : 1
  const sort = isFinite(req.query.sort) ? parseInt(req.query.sort) : 1
  const limit = isFinite(req.query.limit) ? parseInt(req.query.limit) : 20
  /*
  const data = await sheets.spreadsheets.values.get(
    {
      spreadsheetId: process.env.GSHEET_ID,
      range: 'A' + (id+1) + ':K' +  (id+1),
    }
  )
  if (!data) {
    throw new Error('Invalid google response')
    res.sendStatus(400)
    returns
  }
  */
  res.json()
})

/* 店情報取得 */
router.get('/shops/:id', async function (req, res, next) {
  const id = parseInt(req.params.id)
  if (!id){
    res.sendStatus(400)
    return
  } else if (id < 0) {
    res.sendStatus(400)
    return
  }
  const data = await sheets.spreadsheets.values.get(
    {
      spreadsheetId: process.env.GSHEET_ID,
      range: 'A' + (id+1) + ':K' +  (id+1),
    }
  )
  if (!data) {
    res.sendStatus(500)
    return
  } else if (!data.data.values){
    res.sendStatus(400)
    return
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
  if (req.params.key != process.env.AUTHORIZATION_KEY) {
    res.sendStatus(401)
    return
  }
  res.sendStatus(501)
  return
})

/* 店情報編集 */
router.put('/shops/:id', function (req, res, next) {
  if (req.params.key != process.env.AUTHORIZATION_KEY) {
    res.sendStatus(401)
    return
  }
  res.sendStatus(501)
  return
})

module.exports = router