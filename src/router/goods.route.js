const Router=require('koa-router')
const {auth,isAdmin}=require('../middleware/auth.middleware')
const {validatorGoods}=require('../middleware/goods.middleware')
const {create,updateGoods,offGoods,onGoods,findAll}=require('../contorller/goods.controller')
const goodsRouter=new Router({prefix:'/goods'})
const {upload}=require('../contorller/goods.controller')

goodsRouter.post('/upload',auth,isAdmin,upload)
goodsRouter.post('/',auth,validatorGoods,create)
goodsRouter.put('/:id',auth,validatorGoods,updateGoods)
goodsRouter.post('/:id/off',auth,offGoods)
goodsRouter.post('/:id/on',auth,onGoods)
goodsRouter.get('/goodsList',findAll)
module.exports=goodsRouter