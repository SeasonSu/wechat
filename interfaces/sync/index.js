const Router = require('koa-router')
const router = new Router()
const WechatApi = require(process.cwd() + '/interfaces/api')
const sync = require('./sync')

//同步公众号的关注人到数据库
router.get('/user/sync',async(ctx,next) => {
    let ress = await sync.init()
    let userMsg = []
    let userList =  await WechatApi.getFollowers()
    let openids = userList.data.openid
    let j = 100
    while(openids.length > 0){
        if(openids.length < 100){
            j = openids.length
        }
        let _openids =  openids.slice(0,j)
        openids = openids.slice(j,openids.length)
        let users = await WechatApi.batchGetUsers(_openids)
        userMsg = userMsg.concat(users.user_info_list)
    }
    let res = await sync.createMembers(userMsg)
    if(!res){
        ctx.body = {
            errcode:-1,
            errmsg:'500'
        }
    }else{
        ctx.body = {
            errcode:0,
            errmsg:'ok',
        }
    }
})


module.exports = router
