let users = require('../models/user.json') // 临时数据缓存
let ResultSet = require('../models/ResultSet')
const logger = require('../config/logger.js')

// 获取所有user
let getUsers = () => {
  return users
}

// 新增user
let addUser = (user) => {
  logger.info('[userSerivice] [addUser]', `${JSON.stringify(user)}`)
  user.password = Buffer.from(user.password.split('').join('#')).toString('base64')
  users.push(user)
  return new ResultSet(user, 0).getResult()
}

// 校验user
let checkUser = (user) => {
  logger.info('[userSerivice] [checkUser]', `${JSON.stringify(user)}`)
  let out = false
  users = users.map(u => {
    if (!out && user.password.split('').join('#') === Buffer.from(u.password, 'base64').toString('ascii')) {
      let token = Buffer.from(JSON.stringify(u)).toString('base64')
      u.token = token
      out = u
    }
    return u
  })
  
  let res = new ResultSet(out, out ? 0 : 1)
  return res.getResult()
}
module.exports = {getUsers, addUser, checkUser}
