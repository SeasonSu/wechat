const request = require('superagent')
const {wechatConfig,wechatPort} = require(process.cwd() + '/config')
const {code} = require(process.cwd() + '/code')
const {dbModel} = require(process.cwd() + '/models')
const WechatApi = require(process.cwd() + '/interfaces/api')
const httpx = require('httpx')
const media = {
    async getMedia(media_id){
        let url = 'http://file.api.weixin.qq.com/cgi-bin/media/get'
        let token = await wechatConfig.getAccessToken()
        let options = {
            data:{
                access_token:JSON.parse(token).access_token,
                media_id:media_id
            },
            timeout:60000,

        }
        console.log(options)
        return await httpx.request(url, options)
    }
}

module.exports = media
