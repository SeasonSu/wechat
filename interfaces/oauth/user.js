const request = require('superagent')
const {wechatConfig,wechatPort} = require(process.cwd() + '/config')
const {dbModel} = require(process.cwd() + '/models')
const WechatApi = require(process.cwd() + '/interfaces/api')
const {time} = require(process.cwd() + '/utils')

const user = {
    // 获取用户信息
    async getUserInfo(openid) {
        let user = await WechatApi.getUser(openid)
        let isExit = await this.checkUser(openid)
        if(!isExit){
            let saveRes = await this.saveUser(user)
        }
        return user
    },
    // 保存用户
    async saveUser(user){
        return await dbModel.user.create({
            'openid':user.openid,
            'nickname':user.nickname,
            'sex':user.sex,
            'city':user.ciry,
            'country':user.country,
            'province':user.province,
            'headimgurl':user.headimgurl,
            'date_add':time.now()
        })
    },
    // 检查用户存在否
    async checkUser(openid){
        let result = await dbModel.user.findAll({
            where: {
            openid: openid
          }
        })
        return result.length > 0 ? true : false
    }
}

module.exports = user
