const request = require('superagent')
const {wechatConfig,wechatPort} = require(process.cwd() + '/config')
const {code} = require(process.cwd() + '/code')
const {dbModel} = require(process.cwd() + '/models')
const WechatApi = require(process.cwd() + '/interfaces/api')

const user = {
    async createMembers(users){
        let userArr = []
        let followers = await dbModel.followers.findAll({})
        followers = JSON.stringify(followers)
        users.map((item) => {
            if(followers.indexOf(item.openid) == -1){
                userArr.push({
                    'openid':item.openid,
                    'nickname':item.nickname,
                    'sex':item.sex,
                    'city':item.ciry,
                    'country':item.country,
                    'province':item.province,
                    'headimgurl':item.headimgurl,
                    'subscribe_time':item.subscribe_time,
                    'subscribe':1,
                    'groupid':item.groupid
                })
            }
        })

        return await dbModel.followers.bulkCreate(userArr)
    },
    async getFollowers(options){
        let config = {
            offset:(options.page - 1 ) * options.pageSize,
            limit:options.pageSize,
            order: [['subscribe_time', 'DESC']]
        }
        if(options.nickname){
            config.where = {
                nickname:{
                    $like:'%'+options.nickname+'%'
                }
            }
        }
        return await dbModel.followers.findAndCountAll(config)
    }
}

module.exports = user
