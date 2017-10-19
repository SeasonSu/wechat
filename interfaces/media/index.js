const Router = require('koa-router')
const router = new Router()
const WechatApi = require(process.cwd() + '/interfaces/api')
const media = require('./media')
const fs = require('fs')
const path = require('path')
//下载多媒体文件接口

//获取临时素材
router.get('/media/get',async(ctx,next) => {
    let buffer = await WechatApi.getMedia(ctx.query.media_id)

    ctx.body =  buffer
})

module.exports = router
