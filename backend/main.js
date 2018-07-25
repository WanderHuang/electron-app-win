const Koa = require('koa');
const chalk = require('chalk')
const fs = require('fs')
const Router = require('koa-router')

// server
const {fileReader} = require('./utils/fileReader')

let routers = new Router()

routers.get('/', async ( ctx )=>{
  ctx.body = 'hello world'
})

routers.get('/getArticleByName', async ( ctx )=>{
  let content = fs.readFileSync('docs/shijiebeixiaoji.md')
  ctx.body = content
})

// get dirs
routers.get('/getDirTree', async ( ctx )=>{
  let tree = []
  console.log(__dirname)
  fileReader.getDirTree(tree, 'docs')
  ctx.body = tree
})

// get files 文件下载初步 良好的情况应该是文件服务器
routers.get('/docs/:path', async ( ctx ) => {
  console.log(ctx.params.path)
  ctx.body = fs.readFileSync(ctx.path.substring(1))
})

const app = new Koa();
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'X-Requested-With')
  ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  await next();
 })

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

app.use(routers.routes()).use(routers.allowedMethods())


console.log(chalk.cyan('Koa is running...'))
app.listen(3000);
console.log(chalk.cyan('Listening on 3000'))