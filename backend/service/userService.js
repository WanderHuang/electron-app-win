let chalk = require('chalk')
let users = require('../models/user.json') // 临时数据缓存
let ResultSet = require('../models/ResultSet')

// 获取所有user
let getUsers = () => {
  return users
}

// 新增user
let addUser = (user) => {
  let {username, password} = user
  password = Buffer.from(password).toString('base64')
  user.username = username
  user.password = password
  users.push(user)
}

// 校验user
let checkUser = (user) => {
  console.log(chalk.cyan(JSON.stringify(user)))
  let out = false
  users = users.map(u => {
    if (!out && user.password.split('').join('#') === Buffer.from(u.password, 'base64').toString('ascii')) {
      let token = Buffer.from(JSON.stringify(u)).toString('base64')
      u.token = token
      out = token
    }
    return u
  })
  
  let res = new ResultSet(out, out ? 0 : 1)
  return res.getResult()
}
module.exports = {getUsers, addUser, checkUser}
