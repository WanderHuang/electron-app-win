const Koa = require('koa');
const chalk = require('chalk')
const fs = require('fs')
const Router = require('koa-router')
const formidable = require('formidable')
const path = require('path')
const querystring = require('querystring')

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
// TODO 文件下载规范 koa-send
routers.post('/docs/get', async ( ctx ) => {
  let params = querystring.parse(ctx.querystring)
  console.log(params.path)
  console.log(params.name)
  ctx.set('Content-Disposition', "attachment; filename=\"" + params.name + "\"")
  ctx.body = fs.readFileSync(params.path)

})

// 文件上传初步 良好情况下应该分类、分目录、限流、支持批量上传
routers.post('/upload', async (ctx) => {
  console.log(chalk.yellow('parsing file: '))
  const form = new formidable.IncomingForm()
  form.uploadDir = path.join(__dirname, './upload')
  form.hash = 'md5'
  form.multiples = true

  await new Promise((resolve, reject) => {
    form.parse(ctx.req, function (err, valueKeys, fileKeys) {
      let current = valueKeys.current
      current = current === '/' ? 'docs' : current
      let keys = Object.keys(fileKeys)
      keys.map((key, index) => {
        console.log(chalk.yellow(fs.existsSync(fileKeys[key].path)))
        fs.copyFileSync(fileKeys[key].path, path.join(__dirname, '../' + current + '/' + fileKeys[key].name))
      })
      resolve(keys)
    })
  })
  ctx.body = '\'_\''
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