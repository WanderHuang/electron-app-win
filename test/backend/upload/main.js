const Koa = require('koa')
const Router = require('koa-router')
const chalk = require('chalk')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')

const router = new Router()
router.post('/upload', async (ctx) => {
  console.log(chalk.yellow('parsing file: '))
  const form = new formidable.IncomingForm()
  form.uploadDir = path.join(__dirname, './upload')
  form.hash = 'md5'
  form.multiples = true

  form.parse(ctx.req, function (err, valueKeys, fileKeys) {
    console.log(err)
    console.log(chalk.magenta(Object.keys(valueKeys)))
    let keys = Object.keys(fileKeys)
    keys.map((key, index) => {
      console.log(chalk.yellow(fs.existsSync(fileKeys[key].path)))
      fs.copyFileSync(fileKeys[key].path, path.join(__dirname, './docs/' + fileKeys[key].name))
    })
  })
  ctx.body = '\'_\''

  // form.on('file', function (name, file) {
  //   console.log(chalk.cyan('-----------------'))
  //   console.log(chalk.cyan(name))
  //   console.log(chalk.cyan(JSON.stringify(file.toJSON())))
  //   console.log(chalk.cyan('-----------------'))
  // })

  // form.on('fileBegin', function (name, file) {
  //   console.log(chalk.yellow('========================'))
  //   console.log(chalk.yellow(file.path))
  //   console.log(chalk.yellow(fs.existsSync(file.path)))
  //   console.log(chalk.yellow('========================'))
  // })

  // form.on('progress', function (bytesReceived, bytesExpected) {
  //   console.log('current > ' + ((bytesReceived / bytesExpected) * 100) + '%')
  // })

  // let buf1 = Buffer.alloc(0)
  // form.handlePart = function (part) {
  //   part.on('data', function (data) {
  //     if (data.length !== 0) {
  //       console.log('=================')
  //       console.log(data)
  //       console.log('=================')
  //       buf1 = Buffer.concat([buf1, data], data.length + buf1.length)
  //     }
  //   })

  //   part.on('end', function () {
  //     fs.writeFile(path.join(__dirname, './output/name.json'), buf1)
  //   })
  // }
})

const koa = new Koa()

koa.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'X-Requested-With')
  ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  await next()
})

koa.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

koa.use(router.routes()).use(router.allowedMethods())
koa.listen(10086)
console.log(chalk.cyan('your app is on 10086'))
