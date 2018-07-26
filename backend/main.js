const Koa = require('koa')
const chalk = require('chalk')
const router = require('./router/router')

const app = new Koa();
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
  ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  await next()
 })

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

app.use(router.routes()).use(router.allowedMethods())


console.log(chalk.cyan('Koa is running...'))
app.listen(3000);
console.log(chalk.cyan('Listening on 3000'))