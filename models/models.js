// 数据库模块引用
const path = require('path')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const {dbConfig} = require('../config')
const { fileUtils } = require('../utils')
const config = dbConfig[env]
const sequelize = new Sequelize(config.database, config.username, config.password, config)
const dbStorage = []
const modelRoot = process.cwd() + '/db'
const models = fileUtils.getFiles(modelRoot)

models.map(function(file){
    let model = sequelize.import(path.join(modelRoot,file))
    dbStorage[model.name] = model
})

module.exports = dbStorage
