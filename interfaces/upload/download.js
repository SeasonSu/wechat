const request = require('superagent')
const fs = require('fs')
const mime = require('mime')
const colors = require('colors')
const downloadRoot = require('./config').down
const wechat = require(process.cwd() + '/models/wechat')
const downUrl = 'http://file.api.weixin.qq.com/cgi-bin/media/get'
const ffmpeg = require('fluent-ffmpeg')

const download = {
    async download(media_id,type){
        let token = await wechat.fetchAccessToken()
        let url = `${downUrl}?access_token=${token.access_token}&media_id=${media_id}`
        console.log(colors.green(url))
    	let filename = Math.floor(Math.random()*100000) + url.substr(-4,4)
        return  new Promise((resolve, reject) => {
            download.downloadFile(url,filename,function(root){
                resolve(root)
            })
        })
    },
    async downloadFile(url,relative_file,callback){
        let mimeType = ''
        let downObj = ''
        let _url = ''
        downObj = await request(url).on('response', function(response) {
            if(response.statusCode == 200){
                mimeType = response.headers['content-type']
                let bufferBody = response.body
                let ext = mime.getExtension(mimeType) ? mime.getExtension(mimeType) : mimeType == 'video/mpeg4' ? 'mp4' : mimeType == 'audio/amr' ? 'amr' : ''
                _url = relative_file += '.' + ext
                let absUrl = downloadRoot + "/" +  _url

                let root = '/downloads/' + _url
                if(mimeType == 'audio/amr' && JSON.stringify(bufferBody) == '{}'){
                    let size = 0
                    let chunks = []
                    let data = null
                    response.on('data', function (chunk) {
                        chunks.push(chunk)
                        size += chunk.length
                    })
                    response.on('end', function () {
                        switch(chunks.length) {
                            case 0: data = new Buffer(0);
                                break;
                            case 1: data = chunks[0];
                                break;
                            default:
                                data = new Buffer(size);
                                for (var i = 0, pos = 0, l = chunks.length; i < l; i++) {
                                    var chunk = chunks[i];
                                    chunk.copy(data, pos);
                                    pos += chunk.length;
                                }
                                break;
                        }
                        let stream = fs.createWriteStream(absUrl)
                        stream.write(data, 'UTF8')
                        stream.end()
                        //音频转码
                        let command = ffmpeg(absUrl)
                        .on('end',function(stdout,stderr){
                            fs.unlinkSync(absUrl);
                        })
                        .on('error', function(err) {
                            console.log(colors.red('音频转码失败 ' + err.message))
                        })
                        .save(absUrl.replace('amr','mp3'))
                        callback && callback(root.replace('amr','mp3'))
                    })
                }else{
                    let stream = fs.createWriteStream(absUrl)
                    stream.write(bufferBody, 'UTF8')
                    stream.end()
                    callback && callback(root)
                }
            }
        })
        return downObj
    },
}

module.exports = download
