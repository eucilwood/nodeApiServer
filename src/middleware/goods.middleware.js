const {goodsformatError}=require('../constant/err.type')
const validatorGoods=async(ctx,next)=>{
    try {
        ctx.verifyParams({
            goods_name:{type:'string',required:true},
            goods_price:{type:'number',required:true},
            goods_num:{type:'number',required:true},
            goods_img:{type:'string',required:true}
        })
    } catch (error) {
        console.log(error)
        return ctx.app.emit('error',goodsformatError,ctx)
    }
    await next()
}

module.exports={
    validatorGoods
}