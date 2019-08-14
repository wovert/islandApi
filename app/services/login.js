const { WxService } = require('./wx')
const { UserService } = require('./user')
const { LoginType } = require('../lib/enum')

class LoginService {
  static async login(v) {
    switch (v.type) {
      case LoginType.USER_EMAIL: // 邮箱登录
        return await UserService.getToken(v.account, v.secret)
      
      case LoginType.USER_MINI_PROGRAM: // 小程序登录
        return await WxService.getToken(v.account) // account 是小程序的 code
      
      case LoginType.ADMIN_EMAIL: // 管理员邮箱登录
        return null
      
      default: // 异常登录
        throw new global.exceptions.ParameterException('异常登录')
    }
  }
}

module.exports = {
  LoginService
}