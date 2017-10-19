const fs = require('fs')
const mime = require('mime')
const download = require(process.cwd() + '/interfaces/upload/download')
const downloadRoot = require(process.cwd() + '/interfaces/upload/config').down
const WechatApi = require(process.cwd() + '/interfaces/api')
const ffmpeg = require('fluent-ffmpeg')

let material = {
    getType(type){
        let word = ''
        if(type.indexOf('image') > -1){
            word = 'image'
        }else if(type.indexOf('video') > -1){
            word = 'video'
        }else if(type.indexOf('audio') > -1){
            word = 'voice'
        }
        return word
    },
    async checkAndDown(type,result){
        if(type == 'voice'){
            let resultList = JSON.parse(result)
            let i=0
            while(i < resultList.item.length){
                let absUrl = downloadRoot + '/' + resultList.item[i].media_id + '.amr'
                let targetUrl = absUrl.replace('amr','mp3')
                let isExist = fs.existsSync(targetUrl)
                if(isExist){
                    console.log(targetUrl + "文件存在")
                }else{
                    let res = await WechatApi.getMaterial(resultList.item[i].media_id)
                    let stream = fs.createWriteStream(absUrl)
                    stream.write(res, 'UTF8')
                    stream.end()
                    let command = ffmpeg(absUrl)
                    .on('end',function(stdout,stderr){
                        fs.unlinkSync(absUrl);
                    })
                    .on('error', function(err) {
                        console.log(colors.red('音频转码失败 ' + err.message))
                    })
                    .save(absUrl.replace('amr','mp3'))
                }
                i++
            }
        }
    }
}

module.exports = material
