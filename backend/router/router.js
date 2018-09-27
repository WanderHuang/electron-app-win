const fs = require('fs')
const Router = require('koa-router')
const formidable = require('formidable')
const path = require('path')
const User = require('../models/user')
const userService = require('../service/userService')
const logger = require('../config/logger.js')

// server
const {fileReader} = require('../utils/fileReader')
const {fileWriter} = require('../utils/fileWriter')

let router = new Router()

router.get('/', async (ctx) => {
  logger.info('/', '[HELLO WORLD]')
  ctx.body = 'hello world'
})

// 登录页面
router.post('/login', async (ctx) => {
  logger.info('/login', '[AUTH USER]')
  let {username, password} = ctx.request.body
  ctx.body = userService.checkUser(new User(username, Buffer.from(password, 'base64').toString('ascii'), ''))
})

// 用户注册
router.post('/regist', async (ctx) => {
  logger.info('/regist', '[AUTH USER]')
  const form = new formidable.IncomingForm()
  let user = {}
  await new Promise((resolve, reject) => {
    form.parse(ctx.req, function (err, valueKeys, fileKeys) {
      user = valueKeys
      resolve()
    })
  })
  user.password = Buffer.from(user.password, 'base64').toString('ascii')
  ctx.body = userService.addUser(new User(user.username, user.password, ''))
})

// get dirs
router.get('/getDirTree', async (ctx) => {
  logger.info('/getDirTree', '[LIST]')
  let baseDir = path.resolve('docs', 'files')
  logger.info(baseDir)
  ctx.body = fileReader.getDirTree(baseDir)
})

// 删除文件
router.post('/docs/delete', async (ctx) => {
  logger.info('/docs/delete', '[DELETE]')
  const form = new formidable.IncomingForm()
  let params = {}
  await new Promise((resolve, reject) => {
    form.parse(ctx.req, function (err, valueKeys, fileKeys) {
      params = valueKeys
      resolve()
    })
  })
  let realPath = path.resolve(params.path)
  logger.info('DELETE', realPath)
  if(fs.existsSync(realPath)) {
    fs.unlinkSync(realPath)
    logger.info('success!')
    ctx.body = {
      code: 0,
      message: 'success'
    }
  } else {
    logger.info('fail!')
    ctx.body = {
      code: -1,
      message: 'fail'
    }
  }
})

// get files 文件下载初步 良好的情况应该是文件服务器
// 返回文档流
router.post('/docs/get', async ( ctx ) => {
  logger.info('/docs/get', '[GET]')
  const form = new formidable.IncomingForm()
  let params = {}
  await new Promise((resolve, reject) => {
    form.parse(ctx.req, function (err, valueKeys, fileKeys) {
      params = valueKeys
      resolve()
    })
  })
  logger.info(params.path)
  ctx.body = fs.readFileSync(params.path)
})

// 文件上传初步 良好情况下应该分类、分目录、限流、支持批量上传
router.post('/upload', async (ctx) => {
  logger.info('/upload', '[UPLOAD]')
  const form = new formidable.IncomingForm()
  form.uploadDir = path.resolve('upload')
  form.hash = 'md5'
  form.multiples = true

  await new Promise((resolve, reject) => {
    form.parse(ctx.req, function (err, valueKeys, fileKeys) {
      let current = valueKeys.current
      current = current === '/' ? 'files' : current
      Object.keys(fileKeys).map((key, index) => {
        if (fs.existsSync(fileKeys[key].path)) {
          fs.copyFileSync(fileKeys[key].path, path.resolve('docs', current, fileKeys[key].name))
          fs.unlinkSync(fileKeys[key].path)
        }
      })
      resolve()
    })
  })
  ctx.body = '\'_\''
})

// 获取所有图像的路径
router.get('/get/images', async ctx => {
  logger.info('/get/images', '[GET IMAGES]')
  let absolutePath = path.resolve('docs', 'static', 'img')
  let staticPath = path.join('/', 'static', 'img')
  ctx.body = fileReader.getFileArray(absolutePath, staticPath)
})

// 获取所有头像的路径
router.get('/get/avatars', async ctx => {
  logger.info('/get/avatars', '[GET IMAGES]')
  let absolutePath = path.resolve('docs', 'static', 'avatar')
  let staticPath = path.join('/', 'static', 'avatar')
  ctx.body = fileReader.getFileArray(absolutePath, staticPath)
})

// 增加文件夹
router.post('/add/dir', async ctx => {
  logger.info('/add/dir', '[ADD Dir]')
  let {current, name} = ctx.request.body
  current = current === '/' ? 'files' : current
  ctx.body = fileWriter.addNewDirectory(path.resolve('docs', current, name))
})

module.exports = router