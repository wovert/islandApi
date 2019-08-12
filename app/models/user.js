const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

// 定义模型
class User extends Model {

}
User.init({
  // 主键：不能重复、不能为空
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, { sequelize })
