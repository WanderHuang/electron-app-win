const chalk = require('chalk')
const Koa = require('koa')
const Router = require('koa-router')
const querystring = require('querystring')
const bodyParser = require('koa-bodyparser')

const app = new Koa()


let token = ['123', '456', '789']

const router = new Router()

/**internal error test */
router.get('/error', async(ctx, next) => {
  throw new Error('fail')
})

/**success test */
router.get('/success', async(ctx, next) => {
  console.log(chalk.cyan('---- success ----'))
  console.log(querystring.parse(ctx.querystring))
  ctx.body = {
    errcode: 0,
    errmsg: 'success',
    data: 'auth success'
  }
})

/**fail test */
router.get('/fail', async(ctx, next) => {
  console.log(chalk.cyan('---- fail ----'))
  ctx.body = {
    errcode: 1,
    errmsg: 'auth fail',
    data: 'you must login at first'
  }
})

/**error test */
router.get('/401', async(ctx, next) => {
  console.log(chalk.cyan('---- 401 ----'))
  console.log(querystring.parse(ctx.querystring))
  let err = {
    errcode: 1,
    errmsg: 'fail',
    data: 'auth fail'
  }
  ctx.throw(401, 'your auth token is illeagal', err)
})

/**error test */
router.get('/504', async(ctx, next) => {
  console.log(chalk.cyan('---- 504 ----'))
  console.log(querystring.parse(ctx.querystring))
  let err = {
    errcode: 1,
    errmsg: 'fail',
    data: 'auth fail'
  }
  ctx.throw(504, 'gateway stop servering', err)
})

/** cookie test */
router.get('/cookie', async(ctx, next) => {
  console.log(chalk.cyan('---- cookie ----'))
  console.log(ctx.cookies.get('acookie'))
  ctx.cookies.set('another', 'This is another cookie')
  ctx.body = {
    errcode: 0,
    errmsg: 'success',
    data: ctx.cookies.get('another')
  }
})

/** headers test */
router.get('/headers', async(ctx, next) => {
  console.log(chalk.cyan('---- headers ----'))
  console.log(ctx.headers)
  ctx.body = {
    errcode: 0,
    errmsg: 'success',
    data: ctx.headers
  }
})

/** post test */
router.post('/postDatas', async(ctx, next) => {
  console.log(chalk.cyan('---- post ----'))
  console.log(ctx.request.body) // body-parser json
  ctx.body = {
    errcode: 0,
    errmsg: 'success',
    data: {
      response: 'success',
      ...ctx.request.body
    }
  }
})

app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.listen(5600)
console.log('koa is on 5600')