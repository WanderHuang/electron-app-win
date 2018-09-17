const chalk = require('chalk')
const axios = require('axios')
const querystring = require('querystring') // node; if browser, FormData

const host = 'http://localhost:5600/'
const token = '1234'


function HttpProxy(opts) {
  this.$http = axios.create({
    baseURL: opts.baseURL,
    withCredentials: true,
    timeout: opts.timeout || 3000,
    headers:{ // config all default headers
      'token': token,
      Cookie: 'acookie=this is acookie; '
    }
  })
  this.$http.interceptors.request.use(
    config => {
      console.log(chalk.yellow(`---- REQUEST ---- `))
      console.log(config)
      return config
    },
    error => {
      console.log(chalk.yellow(`---- REQUEST ERROR---- `))
      return Promise.reject(error)
    }
  )
  this.$http.interceptors.response.use(
    response => {
      console.log(chalk.yellow(`---- RESPONSE ---- `))
      console.log(response.headers['set-cookie'])
      return response
    },
    error => {
      console.log(chalk.yellow(`---- RESPONSE ERROR---- `))
      return Promise.reject(error)
    }
  )
}

HttpProxy.prototype.get = function (url, data, success, fail) {
  this.$http.get(url, {
    params: data
  })
  .then(res => {
    if (res.status === 200) { // request is all successful
      let data = res.data
      if (data.errcode !== 0) {
        console.log(chalk.cyan('errcode shows this requestion is fail'))
        fail && fail(data)
      } else {
        console.log(chalk.cyan('errcode shows this requestion is success'))
        success && success(data)
      }
    } else {
      fail && fail({
        errcode: 1,
        errmsg: 'request is error, please check your http request manually',
        data: res.data.data
      })
    }
  })
  .catch(err => {
    console.log(chalk.cyan('errcode shows this requestion is error'))
    fail && fail({
      errcode: err.response.status,
      errmsg: err.response.statusText,
      data: err.response.data
    })
  })
}

HttpProxy.prototype.post = function(url, data, success, fail) {
  this.$http.post(url, data)
  .then(res => {
    if (res.status === 200) { // request is all successful
      let data = res.data
      if (data.errcode !== 0) {
        console.log(chalk.cyan('errcode shows this requestion is fail'))
        fail && fail(data)
      } else {
        console.log(chalk.cyan('errcode shows this requestion is success'))
        success && success(data)
      }
    } else {
      fail && fail({
        errcode: 1,
        errmsg: 'request is error, please check your http request manually',
        data: res.data.data
      })
    }
  })
  .catch(err => {
    console.log(chalk.cyan('errcode shows this requestion is error'))
    fail && fail({
      errcode: err.response.status,
      errmsg: err.response.statusText,
      data: err.response.data
    })
  })
}



let http = new HttpProxy({
  baseURL: host
})
http.get('/success', {id: 1}, (res) => {
  console.log('----success----')
  console.log(res)
}, (fail) => {
  console.log('----fail----')
  console.log(fail)
})

http.get('/error', {error: 1}, (res) => {
  console.log('----success----')
  console.log(res)
}, (fail) => {
  console.log('----fail----')
  console.log(fail)
})

http.get('/401', {error: 1}, (res) => {
  console.log('----success----')
  console.log(res)
}, (fail) => {
  console.log('----fail----')
  console.log(fail)
})

http.get('/504', {error: 1}, (res) => {
  console.log('----success----')
  console.log(res)
}, (fail) => {
  console.log('----fail----')
  console.log(fail)
})

http.get('/cookie', {cookie: 1}, (res) => {
  console.log('----success----')
  console.log(res)
}, (fail) => {
  console.log('----fail----')
  console.log(fail)
})

http.get('/headers', {cookie: 1}, (res) => {
  console.log('----success----')
  console.log(res)
}, (fail) => {
  console.log('----fail----')
  console.log(fail)
})

http.post('/postDatas', {name: 'wander', age: 20}, res => {
  console.log('----success----')
  console.log(res)
}, fail => {
  console.log('----fail----')
  console.log(fail)
})