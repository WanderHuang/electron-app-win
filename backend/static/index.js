const path = require('path')
const serve = require('koa-static')

let statics = serve(path.resolve('backend', 'docs'))
module.exports = statics