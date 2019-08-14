const basicAuth = require('basic-auth')

class Auth {
  constructor() {
  }

  get m() {
    return async (ctx, next) => {
      const token = basicAuth(ctx.req)
      ctx.body = token
      // token 检测
      // token 传递令牌
      // where token: body | header 约定
      // HTTP 规定 身份验证机制 HttpBasicAuth

    }
  }
}
module.exports = {
  Auth
}