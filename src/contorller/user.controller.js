const {
  createUser,
  getUserInfo,
  updateById,
} = require("../service/user.service");
const { JWT_SECRET } = require("../config/config.default");
const jwt = require("jsonwebtoken");
class Usercontroller {
  async register(ctx, next) {
    console.log(ctx.request.body);
    const { user_name, password } = ctx.request.body;

    // 操作数据库
    const res = await createUser(user_name, password);
    // console.log(res)
    ctx.body = {
      code: 0,
      message: "用户注册成功",
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    };
  }
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    console.log("登录");
    try {
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: 0,
        message: "用户登录成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
    } catch {
      console.error("用户登录失败");
    }
  }

  async changepassword(ctx, next) {
    // 获取数据
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    console.log(id, password);
    const res = await updateById({ id, password });
    console.log(res);
    if (res) {
      ctx.body = {
        code: 0,
        message: "修改成功",
      };
    }
  }
}

module.exports = new Usercontroller();
