const Router = require('koa-router')
const router = new Router()
const WechatApi = require(process.cwd() + '/interfaces/api')

//预览图片消息
router.get('/preview/previewImage',async(ctx,next) => {
    ctx.body =  await WechatApi.previewImage(ctx.query.openid,ctx.query.mediaId)
})
//预览视频消息
router.get('/preview/previewVideo',async(ctx,next) => {
    ctx.body =  await WechatApi.previewVideo(ctx.query.openid,ctx.query.mediaId)
})
//预览语音消息
router.get('/preview/previewVoice',async(ctx,next) => {
    ctx.body =  await WechatApi.previewVoice(ctx.query.openid,ctx.query.mediaId)
})
//预览文本消息
router.get('/preview/previewText',async(ctx,next) => {
    ctx.body =  await WechatApi.previewText(ctx.query.openid,ctx.query.mediaId)
})
//预览图文消息
router.get('/preview/previewNews',async(ctx,next) => {
    ctx.body =  await WechatApi.previewNews(ctx.query.openid,ctx.query.mediaId)
})

module.exports = router
