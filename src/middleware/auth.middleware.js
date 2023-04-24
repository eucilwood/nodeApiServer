const jwt = require("jsonwebtoken");
const {
  TokenExpiredError,
  invalidTokenError,
} = require("../constant/err.type");
const { JWT_SECRET } = require("../config/config.default");
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

module.exports = {
  auth,
};
