const Router = require('koa-router')
const router = new Router()
const colors = require('colors')
const WechatApi = require(process.cwd() + '/interfaces/api')
const code = require(process.cwd() + '/code')
const multer = require('koa-multer')
const upload = require('./upload')
const uploadConf = upload.config()
const download = require('./download')
const file = require('./file')
//上传
router.post('/upload',uploadConf.single('file'),async(ctx,next) => {
    ctx.body = {
        errcode:0,
        errmsg:'ok',
        file: ctx.req.file
    }
})
//下载
router.get('/download',async(ctx,next) => {
    let res = await download.download(ctx.query.media_id)
    if(res){
        ctx.body = code.ok
    }else{
        ctx.body = code.error
    }
})
//文件服务器转发
router.get('/file',async(ctx,next) => {
    let res = await file.readFile(ctx.query.filename)
    ctx.body = res
})

//上传图片
router.get('/uploadImage',async(ctx,next) => {
    let res = await WechatApi.uploadImage(ctx.query.filepath)
    ctx.body = res
})


module.exports = router
