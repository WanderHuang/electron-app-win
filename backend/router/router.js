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

router.get('/getArticleByName', async ( ctx )=>{
  let content = fs.readFileSync('docs/shijiebeixiaoji.md')
  ctx.body = content
})

// get dirs
router.get('/getDirTree', async ( ctx )=>{
  let tree = []
  console.log(__dirname)
  fileReader.getDirTree(tree, 'docs')
  ctx.body = tree
})

// 删除文件
router.post('/docs/delete', async ( ctx ) => {
  const form = new formidable.IncomingForm()
  let params = {}
  await new Promise((resolve, reject) => {
    form.parse(ctx.req, function (err, valueKeys, fileKeys) {
      params = valueKeys
      resolve()
    })
  })
  let realPath = path.join(__dirname, '../../' + params.path)
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
  console.log(chalk.yellow('parsing file: '))
  const form = new formidable.IncomingForm()
  form.uploadDir = path.join(__dirname, '../upload')
  form.hash = 'md5'
  form.multiples = true

  await new Promise((resolve, reject) => {
    form.parse(ctx.req, function (err, valueKeys, fileKeys) {
      let current = valueKeys.current
      current = current === '/' ? 'docs' : current
      let keys = Object.keys(fileKeys)
      keys.map((key, index) => {
        console.log(chalk.yellow(fs.existsSync(fileKeys[key].path)))
        fs.copyFileSync(fileKeys[key].path, path.join(__dirname, '../../' + current + '/' + fileKeys[key].name))
      })
      resolve(keys)
    })
  })
  ctx.body = '\'_\''
})

module.exports = router