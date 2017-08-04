const Router = require('koa-router')
const router = new Router()
const WechatApi = require(process.cwd() + '/interfaces/api')

// 群发消息，分别有图文（news）、文本(text)、语音（voice）、图片（image）和视频（video）
router.post('/mass/massSend',async(ctx,next) => {
    // receivers(String,Array)	接收人。一个组，或者openid列表
    ctx.body =  await WechatApi.massSend(ctx.request.body.opts,ctx.request.body.receivers)
})
// 群发图文（news）消息
router.post('/mass/massSendNews',async(ctx,next) => {
    //receivers(String,Array,Boolean)	接收人。一个组，或者openid列表, 或者true（群发给所有人）
    ctx.body = await WechatApi.massSendNews(ctx.request.body.mediaId,ctx.request.body.receivers)
})
// 群发文字（text）消息
router.post('/mass/massSendText',async(ctx,next) => {
    ctx.body = await WechatApi.massSendText(ctx.request.body.content,ctx.request.body.receivers)
})
// 群发声音（voice）消息
router.post('/mass/massSendVoice',async(ctx,next) => {
    ctx.body = await WechatApi.massSendVoice(ctx.request.body.media_id,ctx.request.body.receivers)
})
// 群发图片（image）消息
router.post('/mass/massSendImage',async(ctx,next) => {
    ctx.body = await WechatApi.massSendImage(ctx.request.body.media_id,ctx.request.body.receivers)
})
// 群发视频（video）消息
router.post('/mass/massSendVideo',async(ctx,next) => {
    ctx.body = await WechatApi.massSendVideo(ctx.request.body.media_id,ctx.request.body.receivers)
})
// 删除群发消息
router.get('/mass/deleteMass',async(ctx,next) => {
    ctx.body = await WechatApi.deleteMass(ctx.query.message_id)
})
// 查询群发消息状态
router.get('/mass/getMassMessageStatus',async(ctx,next) => {
    ctx.body = await WechatApi.getMassMessageStatus(ctx.query.message_id)
})

module.exports = router
