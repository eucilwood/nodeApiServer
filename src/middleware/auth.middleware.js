const jwt = require("jsonwebtoken");
const {
  TokenExpiredError,
  invalidTokenError,
  isAdminError
} = require("../constant/err.type");
const { JWT_SECRET } = require("../config/config.default");

// 校验你的token
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");

  try {
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (error) {
    switch (error.name) {
      case "TokenExpiredError":
        ctx.app.emit("error", TokenExpiredError, ctx);
        return;
      case "JsonWebTokenError":
        console.error("无效的token");
        ctx.app.emit("error", invalidTokenError, ctx);
        return;
    }
  }
  await next();
};

// 判断用户是否拥有admin
const isAdmin = async (ctx, next) => {
  const { is_admin } = ctx.state.user;
  if (!is_admin) {
    console.error("该用户没有用户权限", ctx.state.user);
    return ctx.app.emit("error",isAdminError,ctx);
  }
  await next()
};

module.exports = {
  auth,
  isAdmin
};
