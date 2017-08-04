const Router = require('koa-router')
const router = new Router()
const WechatApi = require(process.cwd() + '/interfaces/api')

//获取关注用户列表
router.get('/group/getGroups',async(ctx,next) => {
    ctx.body = await WechatApi.getGroups()
})


module.exports = router
