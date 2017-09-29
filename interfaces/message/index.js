const Router = require('koa-router')
const router = new Router()
const WechatApi = require(process.cwd() + '/interfaces/api')

//客服消息，发送文字消息
router.get('/message/sendText',async(ctx,next) => {
    ctx.body =  await WechatApi.sendText(ctx.query.openid,ctx.query.text)
})
//客服消息，发送图片消息
router.get('/message/sendImage',async(ctx,next) => {
    ctx.body =  await WechatApi.sendImage(ctx.query.openid,ctx.query.media_id)
})
//客服消息，发送卡券
router.get('/message/sendCard',async(ctx,next) => {
    ctx.body =  await WechatApi.sendCard(ctx.query.openid,ctx.query.card_id)
})
//客服消息，发语音消息
router.get('/message/sendVoice',async(ctx,next) => {
    ctx.body =  await WechatApi.sendVoice(ctx.query.openid,ctx.query.media_id)
})
//客服消息，发送视频消息
router.get('/message/sendVideo',async(ctx,next) => {
    ctx.body =  await WechatApi.sendVideo(ctx.query.openid,ctx.query.media_id,ctx.query.thumb_media_id)
})
//客服消息，发送音乐消息
router.get('/message/sendMusic',async(ctx,next) => {
    /**
     var music = {
         title: '音乐标题', // 可选
         description: '描述内容', // 可选
         musicurl: 'http://url.cn/xxx', 音乐文件地址
         hqmusicurl: "HQ_MUSIC_URL",
         thumb_media_id: "THUMB_MEDIA_ID"
        };
     */
    ctx.body =  await WechatApi.sendMusic(ctx.query.openid,ctx.query.music)
})
//客服消息，发送视频消息
router.get('/message/sendNews',async(ctx,next) => {
    /**
    var articles = [
        {
          "title":"Happy Day",
          "description":"Is Really A Happy Day",
          "url":"URL",
          "picurl":"PIC_URL"
        },
        {
          "title":"Happy Day",
          "description":"Is Really A Happy Day",
          "url":"URL",
          "picurl":"PIC_URL"
        }];
     */
    ctx.body =  await WechatApi.sendNews(ctx.query.openid,ctx.query.articles)
})

module.exports = router
