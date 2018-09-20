const Koa = require('koa')
const Router = require('koa-router')
const Static = require('koa-static')
const bodyParser = require('koa-bodyparser')

const path = require('path')
const fs = require('fs')

const app = new Koa()

const router = new Router()

router.get('/', async(ctx, next) => {
  ctx.set('Content-Type', 'text/html')
  ctx.body = fs.readFileSync(path.resolve('test', 'plugin', 'pdf', 'pdf.html'))
})
app.use(Static(path.resolve('test', 'plugin', 'pdf', 'files')))
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.listen(5600)
console.log('koa is on 5600')