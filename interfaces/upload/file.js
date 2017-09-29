const request = require('superagent')
const {dbModel} = require(process.cwd() + '/models')
const fs = require('fs')
const config = require('./config')
const wechat = require(process.cwd() + '/models/wechat')

const file = {
    async getFiles() {
        let files = []
        let newfiles = []
        await new Promise((resolve, reject) => { // 读image文件夹
            fs.readdir (config.down, function(err, picFiles) {
                files = picFiles // 将所有的文件夹名字放到外面来。
                resolve()  // resolve过后，await语句才结束
            })
        })
        const stats = function (fileName) {
            return new Promise((resolve, reject) => {
                console.log(config.down + fileName)
                fs.stat(config.down + fileName, function (err, _file) { // 查看是否是文件夹
                    if(_file.isDirectory()) newfiles.push(fileName)
                    console.log('2')
                    resolve()
                })
            })
        }
        let promises = files.map(_file => stats(_file)) // *这儿使用map() 它返回的值组成新的数组promises,每个元素都是stats()函数返回的promise对象。
        await Promise.all(promises) // 当所有promise都resolve()后 执行下一步
        return newfiles
    },
    async readFile(filename){
        return new Promise((resolve, reject) => {
            fs.readFile(config.down + filename, function (e, data) {
               resolve(data)
           })
        })
    }
}

module.exports = file
