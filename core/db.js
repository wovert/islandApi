const Sequelize = require('sequelize')

const { dbName, host, port, user, password } = require('../config/config').database
const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql', // database type, mysql2 驱动
  host,
  port,
  logging: true, // 显示原型数据库
  timezone: '+08:00', // 时区设置
  define: {
    timestamps: true, // 是否添加 createAt, updatedAt 时间字段
    paranoid: true, // deleteAt
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true // 数据库名是否
  }
})

sequelize.sync({
  force: false // 是否强制清空数据
})

module.exports = {
  sequelize
}