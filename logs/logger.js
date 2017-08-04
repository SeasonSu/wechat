const log4js = require("log4js")
const log4js_config = require("./log4js.json")
const colors = require('colors')
log4js.configure(log4js_config)
const logger = log4js.getLogger('logger')

module.exports = logger
