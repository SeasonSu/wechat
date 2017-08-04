const Router = require('koa-router')
const router = new Router()
const WechatApi = require(process.cwd() + '/interfaces/api')

//获取素材总数
router.get('/material/getMaterialCount',async(ctx,next) => {
    ctx.body =  await WechatApi.getMaterialCount()
})
//获取永久素材列表
router.get('/material/getMaterials',async(ctx,next) => {
// type(String)    图片（image）、视频（video）、语音 （voice）、图文（news）
// offset(Number)	从全部素材的该偏移位置开始返回，0表示从第一个素材 返回
// count(Number)	返回素材的数量，取值在1到20之间
    let result= await WechatApi.getMaterials(ctx.query.type,ctx.query.offset,ctx.query.count)
    ctx.body = JSON.parse(result)
})
//根据标签获取用户
router.get('/material/getUsersFromTag',async(ctx,next) => {
    let result= await WechatApi.getUsersFromTag(ctx.query.tagId,ctx.query.nextOpenId)
    console.log(typeof(result))
    ctx.body = result
})

module.exports = router
