const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')
const { Art } = require('./art')

class Favor extends Model {
  // 业务表
  static async like(art_id, type, uid) {
    // 1. 添加记录
    // 2. classic fav_nums 累加
    // 数据库事务：数据一致性， mongodb 4.0+ 支持事务
    // ACID: 原子性 一致性 隔离性 持久性
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if (favor) {
      throw new global.exceptions.LikeError()
    }

    sequelize.transaction(async t => {
      await Favor.create({
        art_id,
        type,
        uid
      }, { transaction: t })
      
      const art = await Art.getData(art_id, type, false)
      await art.increment('fav_nums', {
        by: 1,
        transaction: t
      }) // 累加
    })
  }

  static async disLike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if (!favor) {
      throw new global.exceptions.DislikeError()
    }

    return sequelize.transaction(async t => {
      await favor.destroy({
        force: true, // false: 软删除，更新deleted_at 字段; true: 硬删除
        transaction: t
      })
      
      const art = await Art.getData(art_id, type, false)
      await art.decrement('fav_nums', {
        by: 1,
        transaction: t
      }) // 减一
    })
  }

  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        uid,
        art_id,
        type
      }
    })
    return favor ? true : false
  }

  static async getMyClassicFavors(uid) {
    const arts = await Favor.findAll({
      where: {
        uid,
        type:{
          [Op.not]: 400, // type!=400
        }
      }
    })
    if(!arts) {
      throw new global.exceptions.NotFound()
    }
    return await Art.getList(arts)
  }

  static async getBookFavor(uid, bookId) {
    const favorCount = await Favor.count({
      where: {
        art_id: bookId,
        type: 400
      }
    })
    const myFavor = await Favor.findOne({
      where: {
        art_id: bookId,
        uid,
        type: 400
      }
    })
    return {
      fav_nums: favorCount,
      like_status: myFavor ? 1 : 0
    }
  }

}
Favor.init(
  {
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER, // Movie, Music, Sentnce 编号
    type: Sequelize.INTEGER, // 100: Movie, 200: Music, 300: Sentence
  },
  {
    sequelize,
    tableName: 'favor'
  }
)

module.exports = {
  Favor
}

