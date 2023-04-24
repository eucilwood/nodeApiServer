const Koa= require('koa')
const {koaBody}=require('koa-body')
const app =new Koa()
const useRouter=require('../router/user.route')
app.use(koaBody())
app.use(useRouter.routes())

module.exports=app