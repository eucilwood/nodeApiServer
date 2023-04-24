
const Goods=require('../model/goods.model')
class goodsService{
   async createGoods(goods){
   const res= await Goods.create(goods)
   return res.dataValues
   }
   async updateGoodsService(id,goods){
    console.log(id,goods)
    const res=await Goods.update(goods,{where:{id}})
    return res[0]
   }
   async removeGoods(id){
    const res=await Goods.destroy({where:{id}})
    return res[0]
   }
   async restoreGoods(id){
    const res=await Goods.restore({where:{id}})
   }
   async goodsList(p,s){
    // 获取总数
    console.log('页码',p,s)
    const offset=(p-1)*s
    const {count,rows} =await Goods.findAndCountAll({offset,limit:s*1})
    return {
        count,
        rows
    }
   }
}
module.exports=new goodsService()