
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
    }
}

module.exports = material
