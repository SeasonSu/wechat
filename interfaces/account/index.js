const Router = require('koa-router')
const router = new Router()
const WechatApi = require(process.cwd() + '/interfaces/api')

//获取客服聊天记录
router.get('/account/getRecords',async(ctx,next) => {
    ctx.body =  await WechatApi.getRecords(ctx.query)
})
//获取客服基本信息
router.get('/account/getCustomServiceList',async(ctx,next) => {
    ctx.body =  await WechatApi.getCustomServiceList()
})
//获取在线客服接待信息
router.get('/account/getOnlineCustomServiceList',async(ctx,next) => {
    ctx.body =  await WechatApi.getOnlineCustomServiceList()
})
//添加客服账号
router.get('/account/addKfAccount',async(ctx,next) => {
    ctx.body =  await WechatApi.addKfAccount(ctx.query.account,ctx.query.nickname,ctx.query.password)
})
//邀请绑定客服帐号
router.get('/account/inviteworker',async(ctx,next) => {
    ctx.body =  await WechatApi.inviteworker(ctx.query.account,ctx.query.wx)
})
//更新客服账号
router.get('/account/updateKfAccount',async(ctx,next) => {
    ctx.body =  await WechatApi.addKfAccount(ctx.query.account,ctx.query.nickname,ctx.query.password)
})
//删除客服账号
router.get('/account/deleteKfAccount',async(ctx,next) => {
    ctx.body =  await WechatApi.deleteKfAccount(ctx.query.account)
})
//删除客服账号
router.get('/account/setKfAccountAvatar',async(ctx,next) => {
    ctx.body =  await WechatApi.setKfAccountAvatar(ctx.query.account,ctx.query.headimgurl)
})
//创建客服会话
router.get('/account/createKfSession',async(ctx,next) => {
    ctx.body =  await WechatApi.createKfSession(ctx.query.account,ctx.query.openid)
})


module.exports = router
