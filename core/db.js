const Sequelize = require('sequelize')

const { dbName, host, port, user, password } = require('../config/config').database
const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql', // database type, mysql2 驱动
  host,
  port,
  logging: true, // 显示原型数据库
  timezone: '+08:00', // 时区设置
  define: {

  }
})

module.exports = {
  sequelize
}