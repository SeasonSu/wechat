const request = require('superagent')
const {wechatConfig,wechatPort} = require(process.cwd() + '/config')
const {code} = require(process.cwd() + '/code')
const {dbModel} = require(process.cwd() + '/models')
const WechatApi = require(process.cwd() + '/interfaces/api')

const sync = {
    async init(){
        let account = await sync.getAccountId()
        if(!account){
            account = await sync.createAccount()
        }else{
            await sync.updateAccount()
        }
        sync.accountId = account.id
        await sync.destoryMembers()

    },

    async getAccountId(){
        return await dbModel.account.findOne({
            where:{
                appId:wechatConfig.appId
            }
        })
    },
    async createAccount(){
        return await dbModel.account.create({
            'appId':wechatConfig.appId,
            'appSecret':wechatConfig.appSecret,
            'token':wechatConfig.token,
            'createDate':new Date(),
            'updateDate':new Date()
        })
    },
    async updateAccount(){
        return await dbModel.account.update({
            'appId':wechatConfig.appId,
            'appSecret':wechatConfig.appSecret,
            'token':wechatConfig.token,
            'updateDate':new Date()
        },{
            where:{
                appId:wechatConfig.appId
            }
        })
    },
    //清空表数据进行同步
    async destoryMembers(){
        return await dbModel.followers.destroy({
            where:{
                id:{
                    $gt:0
                },
                accountId:sync.accountId
            }
        })
    },
    async createMembers(users){
        let userArr = []
        let followers = await dbModel.followers.findAll({})
        followers = JSON.stringify(followers)
        console.log(wechatConfig.appId)
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
                    'groupid':item.groupid,
                    'accountId':wechatConfig.appId
                })
            }
        })

        return await dbModel.followers.bulkCreate(userArr)
    },

}

module.exports = sync
