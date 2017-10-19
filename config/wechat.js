const path = require('path');
const {wechatUtils} = require('../utils');
const accessTokenFilePath = path.join(__dirname, 'wechat_access_token.txt');
module.exports = {
    // appId: 'wxe763ec2bd81c002a',
    // appSecret: '0685cb98bd38ab7efc0eb2dee5f6205e',
    // // appId: 'wx77081127c627b898',
    // appSecret: 'cffcb4b23a8d6abddf5ade85f5edf7fa',

    //不知名客栈
    appId: 'wx96a050ce223b21fe',
    appSecret: '6fac8ab70ee21beeb5267f8ca75a4c9c',

    token: 'chjservice',
    getAccessToken() {
        return wechatUtils.readFileAsync(accessTokenFilePath, 'utf8');
    },
    saveAccessToken(data) {
        return wechatUtils.writeFileAsync(accessTokenFilePath, data, 'utf8');
    }
}
