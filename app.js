require('babel-register')
const Koa = require('koa')
const app = new Koa()
const {wechatConfig,wechatPort} = require('./config')
const {wecahtMiddleWare} = require('./middlewares')
const convert = require('koa-convert')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')()
const router = require('./interfaces/index')
const cors = require('koa2-cors')
const session = require("koa-session2")
const log4js = require('log4js')
const static = require('koa-static')
const {logger,logs} = require('./logs')
const {Store} = require('./redis')
app.use(cors())
app.use(session({
	key: "SESSIONID",   //default "koa:sess"
    //store: new Store(),
}))
app.use(convert(json()))
app.use(convert(bodyparser))
app.use(logs)

//静态服务器
app.use(static(__dirname + '/assets'))

app.use(router.routes())
	.use(router.allowedMethods())
	app.use(wecahtMiddleWare(wechatConfig))
app.use(log4js.connectLogger(logger, {level:'INFO', format:':method :url'}))

app.listen(wechatPort);
console.log('服务已开启,端口号 : ' + wechatPort);
