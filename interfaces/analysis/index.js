const Router = require('koa-router')
const router = new Router()
const WechatApi = require(process.cwd() + '/interfaces/api')
const wechat = require(process.cwd() + '/models/wechat')
const request = require('superagent')

//获取用户增减数据
router.get('/analysis/getusersummary',async(ctx,next) => {
    let token = await wechat.fetchAccessToken()
    let url = `https://api.weixin.qq.com/datacube/getusersummary?access_token=${token.access_token}`
    const getRes = async url => {
        return new Promise((resolve, reject) =>
            request.get(url, (err, response, body) => {
                resolve(response.body);
            })
        )
    }
    let res = await getRes(url)
    ctx.body =  res
})
//获取累计用户数据
router.get('/analysis/getusercumulate',async(ctx,next) => {
    let token = await wechat.fetchAccessToken()
    let url = `https://api.weixin.qq.com/datacube/getusercumulate?access_token=${token.access_token}`
    const getRes = async url => {
        return new Promise((resolve, reject) =>
            request.get(url, (err, response, body) => {
                resolve(response.body);
            })
        )
    }
    let res = await getRes(url)
    ctx.body =  res
})



module.exports = router
