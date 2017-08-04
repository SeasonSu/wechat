/*============================================================================
 * 接口路由入口
 ============================================================================*/
const colors = require('colors')
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const router = new Router()
const { fileUtils } = require('../utils')
/**
 * 遍历路由文件夹，注册路由
 * @type {String}
 */
let routesArray = fileUtils.getFiles(__dirname)
routesArray.map(function(item){
    let fileName = './' + item
    if(fs.existsSync(path.resolve(__dirname, fileName))){
         let routesInstance = require(fileName)
         router.use(routesInstance.routes())
    	.use(routesInstance.allowedMethods());
    }else{
        console.log('路由 ----' + path.resolve(__dirname, fileName) + '  not found')
    }
})


module.exports = router
