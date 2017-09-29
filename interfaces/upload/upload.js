const request = require('superagent')
const {wechatConfig,wechatPort} = require(process.cwd() + '/config')
const {dbModel} = require(process.cwd() + '/models')
const WechatApi = require(process.cwd() + '/interfaces/api')
const fs = require('fs')
const uploadRoot = require('./config').up
const multer = require('koa-multer')
const wechat = require(process.cwd() + '/models/wechat')

const upload = {
    config(){
        const storage = multer.diskStorage({
          //文件保存路径
          destination: function (req, file, cb) {
            cb(null, uploadRoot)
          },
          //修改文件名称
          filename: function (req, file, cb) {
            var fileFormat = (file.originalname).split(".");
            cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
          }
        })
        //加载配置
        return multer({ storage: storage })
    }
}

module.exports = upload
