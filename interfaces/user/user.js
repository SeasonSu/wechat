const request = require('superagent')
const {wechatConfig,wechatPort} = require(process.cwd() + '/config')
const {code} = require(process.cwd() + '/code')
const {dbModel} = require(process.cwd() + '/models')
const WechatApi = require(process.cwd() + '/interfaces/api')

const user = {

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
