const Router = require('koa-router')
const router = new Router()
const WechatApi = require(process.cwd() + '/interfaces/api')
const user = require('./user')

//获取关注用户列表
router.get('/user/getFollowers',async(ctx,next) => {
    let options = {
        page:Number(ctx.query.page) || 1,
        pageSize:Number(ctx.query.pageSize) || 10,
        nickname:ctx.query.nickname
    }
    ctx.body =  await user.getFollowers(options)
})

// 设置备注
router.get('/user/updateRemark',async(ctx,next) => {
    ctx.body = await WechatApi.updateRemark(ctx.query.openid,ctx.query.remark)
})
// 根据标签获取用户
router.get('/user/getUsersFromTag',async(ctx,next) => {
    ctx.body = await WechatApi.getUsersFromTag(ctx.query.tagId,ctx.query.nextOpenId)
})

module.exports = router
