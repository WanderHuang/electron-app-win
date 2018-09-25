const path = require('path')
const serve = require('koa-static')

let statics = serve(path.resolve('docs'))
module.exports = statics