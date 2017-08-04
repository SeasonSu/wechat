const fs = require('fs')
const path = require('path')
const colors = require('colors')

module.exports = {
    getFiles:function(root){
        let fileArray = []
        const getDeepFiles = function(fileRoot,parentRoot){
            fs.readdirSync(fileRoot)
            .forEach(function (file) {
                let curPath = fileRoot + '/' + file
                if(fs.statSync(curPath).isDirectory()){
                    getDeepFiles(curPath,file)
                }else{
                    if(parentRoot){
                        'index.js'.indexOf(file) > -1 && fileArray.push(parentRoot + '/' + file)
                    }else{
                        file !== 'index.js' && file !== 'api.js'  && fileArray.push(file)
                    }
                }
            })
        }
        getDeepFiles(root)
        return fileArray
    }
}
