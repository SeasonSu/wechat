const request = require('superagent')
const {wechatConfig,wechatPort} = require(process.cwd() + '/config')
const {dbModel} = require(process.cwd() + '/models')
const WechatApi = require(process.cwd() + '/interfaces/api')
const crypto = require('crypto')

const user = {
    async checkUserExit(options){
        return await dbModel.member.findOne({
            where:{
                username:options.username,
                password:user.cryptPwd(options.password)
            }
        })
    },
    cryptPwd(password){
        let md5 = crypto.createHash('md5')
        let res = md5.update(password).digest('hex')
        return res
    },
    async getUser(token){
        return await dbModel.member.findOne({
            where:{
                token:token
            }
        })
    }
}

module.exports = user
