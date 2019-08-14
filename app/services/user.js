const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

class UserService {
  static async getToken(account, secret) {
    const user = await User.verifyEmailPassword(
      account,
      secret
    )
    return generateToken(user.id, Auth.USER) // 8:普通用户
  }
}

module.exports = {
  UserService
}