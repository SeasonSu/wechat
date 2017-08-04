
const WechatAPI = require('co-wechat-api')
const {wechatConfig,wechatPort} = require('../config')

const wechatApi = new WechatAPI(wechatConfig.appId, wechatConfig.appSecret)

module.exports = wechatApi
