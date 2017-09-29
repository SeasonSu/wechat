const Router = require('koa-router')
const router = new Router()
const WechatApi = require(process.cwd() + '/interfaces/api')
const code = require(process.cwd() + '/code')
const multer = require('koa-multer')
const upload = require(process.cwd() + '/interfaces/upload/upload')
const uploadConf = upload.config()
const download = require(process.cwd() + '/interfaces/upload/download')
const mime = require('mime')
const material = require('./material')
//获取素材总数
router.get('/material/getMaterialCount',async(ctx,next) => {
    ctx.body =  await WechatApi.getMaterialCount()
})
//上传永久素材
router.post('/material/uploadMaterial',uploadConf.single('file'),async(ctx,next) => {
    let filePath = ctx.req.file.path
    console.log(ctx.req.file)
    let type = material.getType(ctx.req.file.mimetype)
    ctx.body = await WechatApi.uploadMaterial(filePath,type)
})
//删除素材
router.get('/material/removeMaterial',async(ctx,next) => {
    ctx.body =  await WechatApi.removeMaterial(ctx.query.media_id)
})
//获取永久素材列表
router.get('/material/getMaterials',async(ctx,next) => {
    let result= await WechatApi.getMaterials(ctx.query.type,ctx.query.offset,ctx.query.count)
    ctx.body = JSON.parse(result)
})
//根据标签获取用户
router.get('/material/getUsersFromTag',async(ctx,next) => {
    let result= await WechatApi.getUsersFromTag(ctx.query.tagId,ctx.query.nextOpenId)
    ctx.body = result
})
//根据标签获取用户
router.get('/material/getMaterial',async(ctx,next) => {
    let result= await WechatApi.getMaterial(ctx.query.media_id)
    ctx.body = result
})

module.exports = router
