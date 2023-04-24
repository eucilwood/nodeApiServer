const { getUserInfo } = require("../service/user.service");
const bcrypt = require("bcryptjs");
const {
  userFormdateError,
  userExisted,
  isUser,
  loginError,
  notSamePassword,
} = require("../constant/err.type");
const userValidator = async (ctx, next) => {
  console.log("验证");
  const { user_name, password } = ctx.request.body;
  // 合理性
  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", userFormdateError, ctx);
    return;
  }
  console.log("验证通过");
  await next();
};
const useVerify = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  // 合法性 是否已经存在
  if (await getUserInfo({ user_name })) {
    ctx.app.emit("error", userExisted, ctx);
    return;
  }
  await next();
};
const crpytPassWord = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
};
const verifyLogin = async (ctx, next) => {
  // 用户是否存在
  const { user_name,password} = ctx.request.body;
  try {
    const res = await getUserInfo({ user_name });
    if (res) {
    } else {
      console.error("用户不存在");
      ctx.app.emit("error", isUser, ctx);
      return;
    }

    // 密码是否匹配
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit("error", notSamePassword, ctx);
      return;
    }

  } catch (error) {
    console.log(error);
    ctx.emit("error", loginError, ctx);
    return
  }

  await next();
};
module.exports = {
  userValidator,
  useVerify,
  crpytPassWord,
  verifyLogin,
};
