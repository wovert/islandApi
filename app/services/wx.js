const util = require('util')
const axios = require('axios')
const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

class WxService {
  static async getToken(code) {
    // 小程序登录：code 小程序登录 微信
    // openid 小程序的用户唯一标识

    // code appid appsecret

    const url = util.format(
      global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code)
  
    const result = await axios.get(url)
    if (result.status !== 200) {
      throw new global.exceptions.AuthFailed('openid获取失败')
    }

    if (result.data.errcode) {
      throw new global.exceptions.AuthFailed('openid获取失败:' + result.data.errmsg)
    }

    // openid 建立档案
    const openid = result.data.openid
    let user = await User.getUserByOpenid(openid)
    if (!user) {
      user = await User.registerByOpenid(openid)
    }

    return generateToken(user.id, Auth.USER)
  }

  static async verify(token) {
    return Auth.verifyToken(token)
  }
}

module.exports = {
  WxService
}