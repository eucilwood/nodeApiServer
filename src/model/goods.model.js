const {DataTypes}=require('sequelize')
const seq=require('../db/seq')
// 创建模型
const Goods=seq.define('zd_goods',{
    goods_name:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'商品名'
    },
    goods_price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
        comment:"商品价格"
    },
    goods_num:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'商品数量'
    },
    goods_img:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:0,
        comment:'商品图片'
    },
    
},{
    paranoid:true
})
// 创建数据表
// Goods.sync({force:true})

module.exports=Goods