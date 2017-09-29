const { render } = require('../templates')
const request = require('superagent')
const prefix = 'https://api.weixin.qq.com/cgi-bin/'
const colors = require('colors')
const api = {
    // grant_type=client_credential&appid=APPID&secret=APPSECRET
    token: `${prefix}token`,
    // access_token=ACCESS_TOKEN&type=TYPE
    upload: `${prefix}media/upload`
};

const wechat = {
    async init(options) {
        // const this = this;
        this.appId = options.appId;
        this.appSecret = options.appSecret;
        this.getAccessToken = options.getAccessToken;
        this.saveAccessToken = options.saveAccessToken;
        let data = await this.fetchAccessToken();
        if (data) {
            this.accessToken = data.access_token;
            this.accessTokenExpiresIn = data.expires_in;
        }
    },
    async fetchAccessToken() {
        let data = null;
        try {
            data = await this.getAccessToken();
            data = JSON.parse(data);
        } catch (error) {
            try {
                data = await this._updateAccessToken();
                this.saveAccessToken(JSON.stringify(data));
            } catch (error) {
                console.log(error);
            }
        }
        if (!this._validAccessToken(data)) {
            data = await this._updateAccessToken();
            this.saveAccessToken(JSON.stringify(data));
        }
        return data;
    },
    async uploadMeterial(type, filePath) {
        let data = await this.fetchAccessToken();
        return request
            .post(api.upload)
            .accept('json')
            .type('form')
            .attach('media', filePath)
            // .field('access_token', data.access_token)
            // .field('type', type);
            .query({
                access_token: data.access_token,
                type: type
            });
    },
    _validAccessToken(data) {
        if (!data || !data.access_token || !data.expires_in) return false;
        const { access_token, expires_in } = data;
        let now = (new Date()).getTime();
        return (now < expires_in);
    },
    async _updateAccessToken() {
        let appId = this.appId;
        let appSecret = this.appSecret;
        let data = await request
            .get(api.token)
            .query({
                'grant_type': 'client_credential',
                appid: appId,
                secret: appSecret
            })
        data = data.body
        let now = (new Date()).getTime()
        let expiresIn = now + (data.expires_in - 20) * 1000
        data.expires_in = expiresIn
        let nextDate = new Date(expiresIn)
        let word = nextDate.toLocaleDateString() + '  ' + nextDate.toLocaleTimeString()
        console.log(colors.red(`重新请求token, 下次过期时间为${word}`))
        return data;
    },
    async reply(message, locals) {
        let xml = await render({
            info: message,
            type: locals.type,
            extra: locals.extra,
            pretty: true
        });
        return xml;
    }
}

module.exports = wechat;
