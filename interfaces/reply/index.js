const Router = require('koa-router')
const router = new Router()
const WechatApi = require(process.cwd() + '/interfaces/api')

//获取自动回复规则
router.get('/reply/getAutoreply',async(ctx,next) => {
    ctx.body =  await WechatApi.getAutoreply()
})

module.exports = router
