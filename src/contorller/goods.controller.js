const path = require("path")
const {createGoods,updateGoodsService,removeGoods,restoreGoods,goodsList}=require('../service/goods.service')
const {uploadfailError,publishGoodsError}=require('../constant/err.type')
class GoodsController{
    async upload(ctx,next){
        const {file}=ctx.request.files
        console.log(file)
        if(file){
            ctx.body={
                code:0,
                message:'上传成功',
                result:{
                    goods_img:path.basename(file.filepath)
                }
            }
        }else{
            console.error('上传失败')
            return ctx.app.emit('error',uploadfailError)
        }
    }
    async create(ctx,next){
        try {
            const res=await createGoods(ctx.request.body)
            ctx.body={
                code:0,
                message:'发布成功',
                result:res
            }
        } catch (error) {
            ctx.app.emit('error',publishGoodsError,ctx)
        }
    }
    async updateGoods(ctx,next){
        try {
            const res=await updateGoodsService(ctx.params.id,ctx.request.body)
            if(res){
                ctx.body={
                    code:0,
                    message:'修改成功',
                    result:res
                }
            }
         
        } catch (error) {
            
        }
    }

    async offGoods(ctx,next){
        try {
            const res=await removeGoods(ctx.params.id)
            console.log(res)
            ctx.body='下架成功'
        } catch (error) {
            
        }
    }
    async onGoods(ctx,next){
        try {
            const res=await restoreGoods(ctx.params.id)
            console.log(res)
            ctx.body='上架成功'
        } catch (error) {
            
        }
    }
    async findAll(ctx,next){
        console.log('2323')
        const {page=1,size}=ctx.request.query
        console.log(ctx.request.query)
        console.log(page,size)
        try {
            const res=await goodsList(page,size)
            ctx.body=res
        } catch (error) {
            
        }
    }
}
module.exports=new GoodsController()