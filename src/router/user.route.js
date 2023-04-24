const Router=require('koa-router')
const {register,login,changepassword}=require('../contorller/user.controller')
const {auth}=require('../middleware/auth.middleware')
const {userValidator,useVerify,crpytPassWord,verifyLogin} =require('../middleware/user.middleware')
const useRouter=new Router({prefix:'/users'})

useRouter.get('/',(ctx,next)=>{
    console.log('hellouser')
    ctx.body='hellouser'
})
useRouter.post('/register',userValidator,useVerify,crpytPassWord,register)
useRouter.post('/login',userValidator,verifyLogin,login)
useRouter.patch('/changepassword',auth,crpytPassWord,changepassword)

module.exports= useRouter