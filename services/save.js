const request = require('superagent')
const {wechatConfig,wechatPort} = require(process.cwd() + '/config')
const {code} = require(process.cwd() + '/code')
const {dbModel} = require(process.cwd() + '/models')
const WechatApi = require(process.cwd() + '/interfaces/api')
const download = require(process.cwd() + '/interfaces/upload/download')

const save = {
    async saveMember(openid){
        let isExit = await save.checkMemberExit(openid)
        //用户存在
        if(isExit){
            //改变关注状态
            let res = await save.updateMember(openid,1)
        }else{
            //新增用户
            let user = await save.getMemberInfo(openid)
            console.log(user)
            let res = await save.createMember(user)
        }
    },
    async getMemberInfo(openid){
        return  await WechatApi.getUser(openid)
    },
    async createMember(user){
        return await dbModel.followers.create({
            'openid':user.openid,
            'nickname':user.nickname,
            'sex':user.sex,
            'city':user.ciry,
            'country':user.country,
            'province':user.province,
            'headimgurl':user.headimgurl,
            'subscribe_time':Math.round(new Date().getTime()/1000).toString(),
            'subscribe':1,
            'groupid':user.groupid,
            'accountId':wechatConfig.appId
        })
    },
    //检查用户是否存在
    async checkMemberExit(openid){
        return await dbModel.followers.findOne({
            where:{
                openid:openid
            }
        })
    },
    //检查用户是否关注
    async checkSubscribe(openid){
        return await dbModel.followers.findOne({
            where:{
                openid:openid,
                subscribe:1
            }
        })
    },
    //更新用户关注状态
    async updateMember(openid,subscribe){
        return await dbModel.followers.update({
            subscribe:subscribe,
        },{
            where: {
                openid: openid
            }
        })
    },
    async download(){

    },
    //保存消息
    async saveMessage(message){

        if(message.MediaId){
            message.MediaUrl  = await download.download(message.MediaId,message.MsgType)
        }

        if(message.MsgType == 'location'){
            message.Content = message.Label
        }
        // if(message.ThumbMediaId){
        //     message.MediaUrl = await WechatApi.getMaterial(message.ThumbMediaId)
        // }
        return await dbModel.message.create({
            'MsgType':message.MsgType,
            'MsgId':message.MsgId,
            'MediaId':message.MediaId,
            'PicUrl':message.PicUrl,
            'CreateTime':message.CreateTime,
            'FromUserName':message.FromUserName,
            'ToUserName':message.ToUserName,
            'Content':message.Content,
            'Format':message.Format,
            'Recognition':message.Recognition,
            'ThumbMediaId':message.ThumbMediaId,
            'MediaUrl':message.MediaUrl,
            'accountId':wechatConfig.appId
        })
    }
}

module.exports = save
