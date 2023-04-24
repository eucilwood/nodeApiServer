module.exports = (err, ctx) => {
  let status = 500;
  switch (err.code) {
    case "10001":
      status = 400;
      break;
    case "10002":
      status = 409;
      break;
    case "10003":
      status = 409;
      break;
    case "10005":
      status = 409;
      break;
    case "10006":
      status = 409;
      break;
    case "10007":
      status = 409;
      break;
    case "10008":
      status = 409;
      break;
    case "10009":
      status = 409;
      break;
    case "10010":
      status = 409;
      break;
    case "10011":
      status = 409;
      break;
    case "10012":
      status = 409;
      break;
    case "10013":
      status = 409;
      break;
    case "10014":
      status = 409;
      break;
    case "10015":
      status = 409;
      break;
    case "10016":
      status = 409;
      break;
    default:
      status = 500;
  }
  ctx.status = status;
  ctx.body = err;
};
