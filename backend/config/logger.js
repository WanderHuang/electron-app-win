const log4js = require('log4js')
const logConfig = require('./log.json')

// log4js
log4js.configure(logConfig)
const logger = log4js.getLogger('records')

module.exports = logger