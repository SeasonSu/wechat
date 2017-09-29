const Router = require('koa-router')
const router = new Router()
const WechatApi = require(process.cwd() + '/interfaces/api')
const user = require('./user')
const code = require(process.cwd() + '/code')

//后台管理登陆
router.post('/admin/login',async(ctx,next) => {
    let options = {
        username:ctx.request.body.username,
        password:ctx.request.body.password
    }
    let member = await user.checkUserExit(options)
    if(member){
        ctx.body =  Object.assign({
            member:{
                id:member.id,
                username:member.username,
                name:member.name,
                avatar:member.avatar,
                phone:member.phone,
                createtime:member.createtime,
                email:member.email,
                updatetime:member.updatetime,
                token:member.token,
                role:JSON.parse(member.role)
            }
        },code.ok)
    }else{
        ctx.body = code.err404
    }
})

router.get('/admin/info',async(ctx,next) => {
    let user1 = await user.getUser(ctx.query.token)
    console.log(code.ok)
    if(user1){
        ctx.body = Object.assign({
            user:user1
        },code.ok)
    }else{
        ctx.body = code.err404
    }
})


module.exports = router
