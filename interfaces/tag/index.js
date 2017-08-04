const Router = require('koa-router')
const router = new Router()
const colors = require('colors')
const WechatApi = require(process.cwd() + '/interfaces/api')
const {code} = require(process.cwd() + '/code')

//创建标签
router.get('/tag/createTags',async(ctx,next) => {
    ctx.body = await WechatApi.createTags(ctx.query.name)
})
//获取标签
router.get('/tag/getTags',async(ctx,next) => {
    ctx.body = await WechatApi.getTags()
})
// 根据标签获取用户
router.get('/tag/getUsersFromTag',async(ctx,next) => {
    ctx.body = await WechatApi.getUsersFromTag(ctx.query.tagId,ctx.query.nextOpenId)
})
//更新标签
router.get('/tag/updateTag',async(ctx,next) => {
    ctx.body = await WechatApi.updateTag(ctx.query.tagId,ctx.query.name)
})
//删除标签
router.get('/tag/deleteTag',async(ctx,next) => {
    ctx.body = await WechatApi.deleteTag(ctx.query.tagId)
})
//批量为用户打标签
router.get('/tag/batchTagging',async(ctx,next) => {
    ctx.body = await WechatApi.batchTagging(ctx.query.openIdList,ctx.query.tagId)
})
//批量为用户取消标签
router.get('/tag/batchUnTagging',async(ctx,next) => {
    ctx.body = await WechatApi.batchUnTagging(ctx.query.openIdList,ctx.query.tagId)
})
//获取用户身上的标签列表
router.get('/tag/getIdList',async(ctx,next) => {
    ctx.body = await WechatApi.getIdList(ctx.query.openid)
})

module.exports = router
