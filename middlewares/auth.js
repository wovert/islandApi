const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level=1) {
    this.level = level
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      let errorMsg = 'token不合法'
      let decode = ''
      if (!userToken || !userToken.name) {
        throw new global.exceptions.Forbbiden(errorMsg)
      }
      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        // token 不合法
        // token 过期
        if (error.name == 'TokenExpiredError') {
          errorMsg = 'token已过期'
        }
        throw new global.exceptions.Forbbiden(errorMsg)
      }

      if (decode.scope < this.level) {
        errorMsg = '权限不足'
        throw new global.exceptions.Forbbiden(errorMsg)
      }

      // uid, scope
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }

      // token 检测
      // token 传递令牌
      // where token: body | header 约定
      // HTTP 规定 身份验证机制 HttpBasicAuth

      await next()
    }
  }

  static async verifyToken(token) {
    try {
      jwt.verify(token, global.config.security.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}
module.exports = {
  Auth
}