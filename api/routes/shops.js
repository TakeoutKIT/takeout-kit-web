require('dotenv').config()
const { Router } = require('express')
const router = Router()
const { google } = require('googleapis')
const sheets = google.sheets({
  version: 'v4',
  auth: process.env.GSHEET_API_KEY
})
/*
const places = google.places({
  version: 'v4',
  auth: process.env.GPLACE_API_KEY
})
*/

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
  // ソート方法 (0: 登録順 1:店舗名前順 2:レビュー人気度)
  const sort = isFinite(req.query.sort) ? parseInt(req.query.sort) : 2
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
      range: 'A2:P'
    }
  )
  if (!data) {
    res.sendStatus(500)
    return
  } else if (!data.data.values){
    res.sendStatus(400)
    return
  }
  // データ一覧を出す
  let shops = data.data.values
  // タグ検索処理 (OR検索)
  if (keyword) {
    keyword.split(',').forEach( (k) => {
      shops = shops.filter(shop => shop[7].includes(k))
    })
  }
  // 絞り込み処理
  [filterDelivery,filterthirdDelivery,filterTakeout].forEach( (value,index) => {
    if (value != 0) {
      shops = shops.filter(shop => shop[8+index] == 'TRUE')
    }
  })
  // ソート方法
  let sortKeyNum = 0
  switch(sort){
    // 新しい順
    // 店舗名順
    case 0:
    case 1:
      sortKeyNum = sort
      break
    // 評価順
    case 2:
      sortKeyNum = 6
      break
    default:
      break
  }
  // 通常ソート(位置情報近い順はまだ)
  if (direction == 0){
    shops.sort( (a, b) => {
      return a[sortKeyNum] - b[sortKeyNum]
    })
  } else {
    shops.sort( (a, b) => {
      return b[sortKeyNum] - a[sortKeyNum]
    })
  }
  // 検索結果数
  const total = shops.length
  // ページ切り出し
  if (page > 1) {
    shops = shops.slice(((page-1)*limit)-1, page*limit)
  } else {
    shops = shops.slice(0, page*limit)
  }
  // 整形
  shops = shops.map(d => ({
    id: d[0],
    name: d[1],
    address: d[2],
    latitude: d[3],
    longtude: d[4],
    tel: d[5],
    rating: d[6],
    tag: d[7].split(','),
    takeout: ( d[8] == 'TRUE' ),
    firstDelivery: ( d[9] == 'TRUE' ),
    thirdDelivery: ( d[10] == 'TRUE' ),
    orderUrl: d[11],
    siteUrl: d[12],
    imageUrl: d[13],
    mapIframe: d[14],
    extraInfo: d[15]
  }))
  // 応答作成
  const resp = {
    currentPage: page,
    totalPage: Math.floor(total/limit) + ( total % limit == 0 ? 0 : 1),
    hitCount: total,
    shops: shops
  }
  res.json(resp)
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
      range: 'A' + (id+1) + ':P' +  (id+1),
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
    address: d[2],
    latitude: d[3],
    longtude: d[4],
    tel: d[5],
    rating: d[6],
    tag: d[7].split(','),
    takeout: ( d[8] == 'TRUE' ),
    firstDelivery: ( d[9] == 'TRUE' ),
    thirdDelivery: ( d[10] == 'TRUE' ),
    orderUrl: d[11],
    siteUrl: d[12],
    imageUrl: d[13],
    mapIframe: d[14],
    extraInfo: d[15]
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