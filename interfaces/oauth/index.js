const Router = require('koa-router')
const router = new Router()
const body = require('koa-body')()
const colors = require('colors')
const WechatApi = require(process.cwd() + '/interfaces/api')
const {code,errHandler} = require(process.cwd() + '/code')
const {wechatConfig,wechatPort} = require(process.cwd() + '/config')
const oauth = require('./oauth')
const user = require('./user')

//微信授权
router.get('/oauth',async(ctx,next) => {
    if(!ctx.query.code && !ctx.query.state){
        ctx.status = 302
        ctx.redirect(await oauth.getOauthUrl(ctx.href, 'info'))
    }else{
        if(ctx.session.openid === undefined){
            //获取token
            let token = await oauth.getToken(ctx.query.code)
            //检查是否需要更新
            let tokenRes = await oauth.checkToken(token.access_token,token.openid)
            if(tokenRes && tokenRes.errcode){
                // 更新token
                let refreshRes = oauth.refreshToken(token.refresh_token)
                if(refreshRes && refreshRes.errcode){
                    code.showError('refreshToken',JSON.stringify(refreshRes))
                    return
                }
                token = refreshRes
            }
            //获取用户信息
            let userRes = await user.getUserInfo(token.openid)
            ctx.session.openid = userRes.openid
            ctx.session.user = userRes
            ctx.redirect('/showOauth')
        }else{
            let userRes = await user.getUserInfo(ctx.session.openid)
            ctx.redirect('/showOauth')
        }
    }
})

router.get('/showOauth',async(ctx,next) => {
    if(!ctx.session.user){
        ctx.redirect('/oauth')
    }
    ctx.body = ctx.session
})



module.exports = router
