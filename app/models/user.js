const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

// 定义模型
class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new global.exceptions.AuthFailed('账号不存在')
    }

    // 同步
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new global.exceptions.AuthFailed('密码不正确')
    }
    return user
  }
}
User.init({
  // 主键：不能重复、不能为空
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: {
    // 观察者模式
    // ES6 Reflect Vue3.0
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10) // 10: 计算成本
      const pw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', pw)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
    sequelize,
    tableName: 'user'
  })

module.exports = {
  User
}