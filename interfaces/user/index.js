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

//同步公众号的关注人到数据库
router.get('/user/sync',async(ctx,next) => {
    let userList =  await WechatApi.getFollowers()
    let users = await WechatApi.batchGetUsers(userList.data.openid)
    let res = await user.createMembers(users.user_info_list)
    if(res){
        ctx.body = {
            errcode:0,
            errmsg:'ok',
            row:res.length
        }
    }else{
        ctx.body = {
            errcode:-1,
            errmsg:'500'
        }
    }

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
