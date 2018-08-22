const fs = require('fs')
const Router = require('koa-router')
const formidable = require('formidable')
const path = require('path')
const chalk = require('chalk')

// server
const {fileReader} = require('../utils/fileReader')

let router = new Router()

router.get('/', async ( ctx )=>{
  ctx.body = 'hello world'
})

router.get('/readArticleByPath', async (ctx) => {
  console.log(chalk.yellow('[READ]'))
  let content = fs.readFileSync(ctx.query.path)
  ctx.body = content
})

// get dirs
router.get('/getDirTree', async (ctx) => {
  console.log(chalk.yellow('[LIST]'))
  let baseDir = path.resolve('backend', 'docs', 'files')
  console.log(baseDir)
  ctx.body = fileReader.getDirTree(baseDir)
})

// 删除文件
router.post('/docs/delete', async (ctx) => {
  console.log(chalk.yellow('[DELETE]'))
  const form = new formidable.IncomingForm()
  let params = {}
  await new Promise((resolve, reject) => {
    form.parse(ctx.req, function (err, valueKeys, fileKeys) {
      params = valueKeys
      resolve()
    })
  })
  let realPath = path.resolve('backend', params.path)
  console.log('DELETE: ' + realPath)
  if(fs.existsSync(realPath)) {
    fs.unlinkSync(realPath)
    console.log('success!')
    ctx.body = {
      code: 0,
      message: 'success'
    }
  } else {
    console.log('fail!')
    ctx.body = {
      code: -1,
      message: 'fail'
    }
  }
})

// get files 文件下载初步 良好的情况应该是文件服务器
// 返回文档流
router.post('/docs/get', async ( ctx ) => {
  console.log(chalk.yellow('[GET]'))
  const form = new formidable.IncomingForm()
  let params = {}
  await new Promise((resolve, reject) => {
    form.parse(ctx.req, function (err, valueKeys, fileKeys) {
      params = valueKeys
      resolve()
    })
  })
  console.log(params.path)
  ctx.body = fs.readFileSync(params.path)
})

// 文件上传初步 良好情况下应该分类、分目录、限流、支持批量上传
router.post('/upload', async (ctx) => {
  console.log(chalk.yellow('[UPLOAD]'))
  const form = new formidable.IncomingForm()
  form.uploadDir = path.resolve('backend', 'upload')
  form.hash = 'md5'
  form.multiples = true

  await new Promise((resolve, reject) => {
    form.parse(ctx.req, function (err, valueKeys, fileKeys) {
      let current = valueKeys.current
      current = current === '/' ? 'files' : current
      Object.keys(fileKeys).map((key, index) => {
        if (fs.existsSync(fileKeys[key].path)) {
          fs.copyFileSync(fileKeys[key].path, path.resolve('backend', 'docs', current, fileKeys[key].name))
          fs.unlinkSync(fileKeys[key].path)
        }
      })
      resolve()
    })
  })
  ctx.body = '\'_\''
})

router.get('/get/images', async ctx => {
  console.log(chalk.yellow('[GET IMAGES]'))
  let absolutePath = path.resolve('backend', 'docs', 'static', 'img')
  let staticPath = path.join('/', 'static', 'img')
  ctx.body = fileReader.getFileArray(absolutePath, staticPath)
})

module.exports = router