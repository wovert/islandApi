const { Sequelize, Model } = require('sequelize')
const { unset, clone, isArray } = require("lodash")

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
    underscored: true, // 字段以下划线（_）来分割（默认是驼峰命名风格）
    freezeTableName: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ['updated_at', 'deleted_at', 'created_at']
        }
      }
    }    
  }
})

sequelize.sync({
  force: false // 是否强制清空数据
})


// Model.prototype.toJSON = function() {
//   // let data = this.dataValues
//   let data = clone(this.dataValues)
//   unset(data, 'updated_at')
//   unset(data, 'created_at')
//   unset(data, 'deleted_at')

//   for (key in data) {
//     if (key === 'image') {
//       if (!data[key].startsWith('http'))
//         data[key] = global.config.host + data[key]
//     }
//   }

//   if (isArray(this.exclude)) {
//     this.exclude.forEach(value => {
//       unset(data, value)
//     });
//   }
//   // this.exclude
//   // exclude
//   // a,b,c,d,e
//   return data
// }

module.exports = {
  sequelize
}