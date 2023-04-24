const Koa= require('koa')
const path=require('path')
const router=require('../router')
const koaStatic=require('koa-static')
const koaParameter=require('koa-parameter')
const {koaBody}=require('koa-body')
const errHandler=require('./errHandler')
const app =new Koa()
app.use(koaParameter(app))
// const useRouter=require('../router/user.route')
// const goodsRouter=require('../router/goods.route')
app.use(koaBody({
    multipart:true,
    formidable:{
        uploadDir:path.join(__dirname,'../upload'),
        keepExtensions:true
    }
}))
// app.use(useRouter.routes())
// app.use(goodsRouter.routes())
app.use(koaStatic(path.join(__dirname,'../upload')))
app.use(router.routes()).use(router.allowedMethods())


app.on('error',errHandler)
module.exports=app