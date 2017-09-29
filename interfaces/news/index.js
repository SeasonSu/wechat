const Router = require('koa-router')
const router = new Router()
const WechatApi = require(process.cwd() + '/interfaces/api')
const {dbModel} = require(process.cwd() + '/models')
const news = require('./news')


//公众号发送消息列表
router.get('/news/list',async(ctx,next) => {
    let options = {
        page:Number(ctx.query.page) || 1,
        pageSize:Number(ctx.query.pageSize) || 10,
        content: ctx.query.content || ''
    }
    let newList =  await news.handlerNews(options)

    ctx.body = newList
})

module.exports = router
