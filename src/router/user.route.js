const Router=require('koa-router')
const {register,login}=require('../contorller/user.controller')
const useRouter=new Router({prefix:'/users'})
useRouter.get('/',(ctx,next)=>{
    console.log('hellouser')
    ctx.body='hellouser'
})
useRouter.post('/register',register)
useRouter.post('/login',login)

module.exports= useRouter