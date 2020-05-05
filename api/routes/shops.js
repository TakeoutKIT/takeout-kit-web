require('dotenv').config()
const { Router } = require('express')
const router = Router()
const { google } = require('googleapis')
const sheets = google.sheets({
  version: 'v4',
  auth: process.env.GSHEET_API_KEY
})
const places = google.places({
  version: 'v4',
  auth: process.env.GPLACE_API_KEY
})

/* APIの使用方法ページを返すなりなんなり*/
router.get('/', async function (req, res, next) {
  res.json({message: 'Welcome to youkoso TakeoutKIT API park'})
})

/* 店一覧を取得 */
router.get('/shops', async function (req, res, next) {
  // 何ページ目か (デフォルト1)
  const page = isFinite(req.query.page) ? parseInt(req.query.page) : 1
  // 1ページ辺りの表示数 (デフォルト20)
  const limit = isFinite(req.query.limit) ? parseInt(req.query.limit) : 20
  // タグ検索(デフォルトなし)
  const keyword = req.query.keyword ? req.query.keyword : ''
  // ソート方法 (0: 店舗名前順 1:位置情報順 2:レビュー人気度)
  const sort = isFinite(req.query.sort) ? parseInt(req.query.sort) : 0
  // ソート方向 (0: 降順 1:昇順)
  const direction = isFinite(req.query.direction) ? parseInt(req.query.direction) : 1
  // 絞り込み (0:絞り込まない 1:絞り込む)
  const filterDelivery = isFinite(req.query.delivery) ? parseInt(req.query.delivery) : 0
  const filterthirdDelivery = isFinite(req.query.thirdDelivery) ? parseInt(req.query.thirdDelivery) : 0
  const filterTakeout = isFinite(req.query.takeout) ? parseInt(req.query.takeout) : 0
  // 一覧データをGSHEETから一括取得
  const data = await sheets.spreadsheets.values.get(
    {
      spreadsheetId: process.env.GSHEET_ID,
      range: 'A1:K'
    }
  )
  if (!data) {
    res.sendStatus(500)
    return
  }
  // ショップデータをGSHEETから一括取得(Googleから取ると金かかる)
  const shops = await sheets.spreadsheets.values.get(
    {
      spreadsheetId: process.env.GSHEET_ID,
      range: 'A1:K'
    }
  )
  if (!data) {
    res.sendStatus(500)
    return
  }
  res.sendStatus(501)
  return
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