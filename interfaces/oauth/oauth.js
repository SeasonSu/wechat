const request = require('superagent')
const {wechatConfig,wechatPort} = require(process.cwd() + '/config')
const {code} = require(process.cwd() + '/code')
const user = require('./user')

const oauth = {
    // 获取授权跳转连接
    async getOauthUrl(url, type) {
        if(!url){
            return false
        }
        let scopeType = 'snsapi_base';
        if(type == 'info'){
            scopeType = 'snsapi_userinfo'
        }
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechatConfig.appId}&redirect_uri=${url}&response_type=code&scope=${scopeType}&state=STATE#wechat_redirect`
    },
    // 通过code获取token
    async getToken(code) {
        let params = {
            appid:wechatConfig.appId,
            secret:wechatConfig.appSecret,
            code:code,
            grant_type:'authorization_code'
        }
        let result = await request.get(`https://api.weixin.qq.com/sns/oauth2/access_token`)
                .query(params)
        return JSON.parse(result.text)
    },
    // 检查accessToken过期
    async checkToken(accessToken,openid){
        let params = {
            openid:openid,
            access_token:accessToken
        }
        let result = await request.get(`https://api.weixin.qq.com/sns/auth`)
                .query(params)
        return JSON.parse(result.text)
    },
    // 刷新accessToken
    async refreshToken(refreshToken){
        let params = {
            appid:wechatConfig.appId,
            grant_type:'refresh_token',
            refresh_token:refreshToken,
        }
        let result = await request.get(`https://api.weixin.qq.com/sns/oauth2/refresh_token`)
                .query(params)
        return JSON.parse(result.text)
    }
}
module.exports = oauth
