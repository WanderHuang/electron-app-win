// more support: https://github.com/koajs/koa/wiki
const Koa = require('koa')
const Router = require('koa-router')
const querystring = require('querystring')


// This middleware parse http-body for us. It depends on packages [co-body, copy-to]
const bodyParser = require('koa-bodyparser')

const app = new Koa()

const router = new Router()

// get
// params: /getUser/1  /getUser/20 etc.
// querystring: /getUser/1?group=ehome  /getUser/20?name=wander etc.
router.get('/getUser/:id', async(ctx, next) => {
  console.log(ctx.params) // id: ''
  console.log(typeof ctx.params.id) // string
  console.log(ctx.querystring) // group=ehome
  console.log(ctx.search) // ?group=ehome
  console.log(querystring.parse(ctx.querystring)) // {group: 'ehome}
  console.log(ctx.query) // {group: 'ehome}
  ctx.body = {
    errcode: 0,
    errmsg: 'success',
    data: {
      name: 'wander',
      age: 22,
      sex: 1
    }
  }
})


// post
// params: /updateUser/12?name=wander&age=22
// querystring: /updateUser?name=wander&age=22
// application/json: 
router.post('/updateUser/:index', async(ctx, next) => {
  console.log(ctx.params) // { index: '12' }
  console.log(ctx.querystring) // name=wander&age=22
  console.log(ctx.search) // ?name=wander&age=22
  console.log(querystring.parse(ctx.querystring)) // { name: 'wander', age: '22' }
  console.log(ctx.query) // { name: 'wander', age: '22' }
  
  // application/json: {"jsondata": "this is a json"}
  // x-www-form-urlencoded: urlencoded=urlencoded
  console.log(ctx.request.rawBody)

  // application/json: { jsondata: 'this is a json' }
  // x-www-form-urlencoded: { urlencoded: 'urlencoded' }
  console.log(ctx.request.body)
  
  /**
   * <Buffer 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 37 38 35 37 33 31 35 33 34 34 35 33 35 30 36 31 34 34 36 39 38 39 ... >
      ----------------------------785731534453506144698927
      Content-Disposition: form-data; name="formname"

      formnamevalue
   */
  let data = ''
  ctx.req.on('data', function (chunk) { // get form datas
      data += chunk
      /**
       * ----------------------------840560629727253170043018
        Content-Disposition: form-data; name="formname"

        formnamevalue
       */
      console.log(Buffer.from(chunk).toString('utf-8'))
  })
  ctx.req.on('end', function (chunk) {
      console.log('=== end ===')
      console.log(data)
  })

  ctx.body = {
    errcode: 0,
    errmsg: 'success',
    data: {
      
    }
  }
})

// ! use bodyparser and u can get json with code ctx.request.body
// ! only application/json、 x-www-form-urlencoded
app.use(bodyParser())


app.use(router.routes()).use(router.allowedMethods())

app.listen(5600)
console.log('koa is on 5600')