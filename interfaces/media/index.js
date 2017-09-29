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
    let baseData = JSON.stringify(buffer)
    console.log(baseData)
    // fs.writeFile(path.resolve('test.mp4'),baseData,function(err){
    //     if(err)
    //         return console.error(err);
    //     console.log('保存文件成功');
    //  })
    ctx.body =  typeof(baseData)
})

module.exports = router
