const Router=require('koa-router')
const goodsRouter=new Router({prefix:'/goods'})
const {upload}=require('../contorller/goods.controller')

goodsRouter.post('/upload',upload)

module.exports=goodsRouter