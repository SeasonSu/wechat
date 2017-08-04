const path = require('path');
const {wechatUtils} = require('../utils');
const accessTokenFilePath = path.join(__dirname, 'wechat_access_token.txt');
module.exports = {
    appId: 'wxe763ec2bd81c002a',
    appSecret: '0685cb98bd38ab7efc0eb2dee5f6205e',
    token: 'chjservice',
    getAccessToken() {
        return wechatUtils.readFileAsync(accessTokenFilePath, 'utf8');
    },
    saveAccessToken(data) {
        return wechatUtils.writeFileAsync(accessTokenFilePath, data, 'utf8');
    }
}
