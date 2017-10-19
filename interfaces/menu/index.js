const Router = require('koa-router')
const router = new Router()
const colors = require('colors')
const WechatApi = require(process.cwd() + '/interfaces/api')
const {code} = require(process.cwd() + '/code')

// 获取菜单
router.get('/menu/getMenu',async(ctx,next) => {
    let result = await WechatApi.getMenuConfig();
    if(result){
        ctx.body = result
    }else{
        ctx.body = code.error
    }

})
// 删除菜单
router.get('/menu/removeMenu',async(ctx,next) => {
    let result = await WechatApi.removeMenu();
    ctx.body = result
})
// 创建菜单
router.post('/menu/createMenu' , async(ctx) => {
    let result = await WechatApi.createMenu(ctx.request.body);
    if(result && result.errcode == 0){
        ctx.body = result
    }else{
        ctx.body = code.error
    }
})
/**
 * 自定义
 */
// 获取自定义菜单配置
router.get('/menu/getMenuConfig',async(ctx,next) => {
    let result = await WechatApi.getMenuConfig();
    ctx.body = result
})
// 删除菜单
router.get('/menu/delConditionalMenu/:id',async(ctx,next) => {
    let menuid = ctx.params.id;
    let result = await WechatApi.delConditionalMenu(menuid);
    ctx.body = result
})
// 创建自定义菜单
router.post('/menu/addConditionalMenu',async(ctx) => {
    let result = await WechatApi.addConditionalMenu(ctx.request.body);
    if(result.menuid){
        ctx.body = result
    }else{
        ctx.body = code.error
    }
})
// 测试个性化菜单
router.post('/menu/tryConditionalMenu' , async(ctx) => {
    let user_id = ctx.request.body.user_id
    let result = await WechatApi.tryConditionalMenu(user_id);
    if(result){
        ctx.body = result
    }else{
        ctx.body = code.error
    }
})

module.exports = router
