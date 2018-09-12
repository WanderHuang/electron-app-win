const Koa = require('koa')
const chalk = require('chalk')
const router = require('./router/router')
const statics = require('./static/index')
const bodyParser = require('koa-bodyparser')
const SocketWorker = require('./service/socketService')
const logger = require('koa-logger')

// 注册http服务
const app = new Koa()

app.use(logger())
app.use(bodyParser())

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Content-Length, Authorization, Accept')
  ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  await next()
 })

// 资源服务
app.use(statics)
// 路由服务
app.use(router.routes()).use(router.allowedMethods())

// 注册socket服务
let app2 = new Koa()
app2.use(logger())
app2.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
  ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  ctx.set('Access-Control-Allow-Credentials', true)
  await next()
})
let webSocket = require('http').createServer(app2.callback())
let io = require('socket.io')(webSocket)

// 开启io监听服务
let socketWorker = new SocketWorker(io)
socketWorker.run()


console.log(chalk.cyan('Koa is running...'))
console.log(chalk.cyan('Socket is running...'))
webSocket.listen(3300)
app.listen(3000)
console.log(chalk.cyan('Koa is Listening on 3000'))
console.log(chalk.cyan('Socket is Listening on 3300'))