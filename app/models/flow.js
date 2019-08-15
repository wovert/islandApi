const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')



class Flow extends Model {
}
Flow.init(
  {
    index: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER, // Movie, Music, Sentnce 编号
    type: Sequelize.INTEGER, // 100: Movie, 200: Music, 300: Sentence
  },
  {
    sequelize,
    tableName: 'flow'
  }
)


module.exports = {
  Flow
}

