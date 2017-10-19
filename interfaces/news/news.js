const request = require('superagent')
const {wechatConfig,wechatPort} = require(process.cwd() + '/config')
const {dbModel} = require(process.cwd() + '/models')
const WechatApi = require(process.cwd() + '/interfaces/api')
const wechat = require(process.cwd() + '/models/wechat')
const downUrl = 'http://file.api.weixin.qq.com/cgi-bin/media/get'
dbModel.message.belongsTo(dbModel.followers,{foreignKey:'FromUserName',targetKey:'openid'});
//dbModel.followers.hasMany(dbModel.message,{foreignKey:'FromUserName', targetKey:'openid'}); // this line

const news = {
    async getNews(options){
        let curDate = Math.floor(new Date().getTime() / 1000)
        let config = {
            include: [{
                model: dbModel.followers
            }],
            offset:(options.page - 1 ) * options.pageSize,
            limit:options.pageSize,
            order: [['CreateTime', 'DESC']],
            where:{
                accountId:wechatConfig.appId
                // $or: [
                //     {
                //         CreateTime:{
                //             $gte:curDate-(24*60*60*3)
                //         }
                //     },
                //     {
                //         CreateTime:{
                //             $lt:curDate-(24*60*60*3)
                //         },
                //         MsgType:'text'
                //     }
                // ]

            }
        }
        if(options.content){
            config.where.content = {
                $like:'%'+options.content+'%'
            }
        }
        return await dbModel.message.findAndCountAll(config)
    },
    async handlerNews(options){
        let news1  = await news.getNews(options)
        let newsList = JSON.parse(JSON.stringify(news1))
        let token = await wechat.fetchAccessToken()
        return newsList
    }
}

module.exports = news
