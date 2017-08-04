const colors = require('colors')
const logger = require('./logger')
const {code} = require(process.cwd() + '/code')
//处理统一接口日志

module.exports = async (ctx, next) => {
    //响应开始时间
    const start = new Date();
    const dataTime = `${start.getFullYear()}-${start.getMonth()}-${start.getDate()} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}`
    //请求处理完毕的时刻 减去 开始处理请求的时刻 = 处理请求所花掉的时间
    let ms;
    try {
        await next();
        ms = new Date() - start;
        let status = ctx.response.status == 200 ? colors.green(ctx.response.status) : colors.grey(ctx.response.status)
        let template = `--> ${colors.bgMagenta(ctx.request.method)}  ${colors.yellow(ctx.request.url)}  ${status}  ${ms}ms  ${colors.magenta(dataTime)}`
        let logTemp = `--> ${ctx.request.method}  ${ctx.request.url}  ${ctx.response.status}  ${ms}ms  ${dataTime}`
        console.log(template)
        logger.info(logTemp)
    } catch (error) {
        if(ctx.request.url.indexOf('favicon.ico') > -1){
            return
        }
        ms = new Date() - start;
        let template = `${colors.bgRed('ERROR')} ${colors.bgMagenta(ctx.request.method)}  ${colors.yellow(ctx.request.url)}  ${colors.red(ctx.response.status)}  ${ms}ms  ${colors.magenta(dataTime)}`
        let logTemp = `ERROR ${ctx.request.method}  ${ctx.request.url}  ${ctx.response.status}  ${ms}ms  ${dataTime}`
        console.log(template)
        logger.error(logTemp)
        let errTemp = `${colors.bgRed('ERROR')} ${colors.red(error)}`
        console.log(errTemp)
        logger.error('ERROR ' + error)
        ctx.body = code.error
    }
}
