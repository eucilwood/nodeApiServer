module.exports={
    userFormdateError:{
      code: "10001",
      message: "用户名或则密码为空",
      result: "",
    },
    userExisted:{
        code: "10002",
        message: "用户名已存在",
    },
    isUser:{
        code:"10003",
        message:'用户不存在'
    },
    loginError:{
        code:"10004",
        message:'用户登录失败'
    },
    notSamePassword:{
        code:"10005",
        message:'密码错误'
    },
    TokenExpiredError:{
        code:'10006',
        message:'token过期'
    },
    invalidTokenError:{
        code:'10007',
        message:'token无效'
    }
}