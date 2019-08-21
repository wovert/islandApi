const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')

class Comment extends Model {
  // constructor(values) {
  //   super()
  //   this.id = values.id
  //   this.book_id = values.book_id
  //   this.content = values.content
  //   this.nums = values.nums
  // }

  // toJSON() {
  //   return {
  //     content: this.getDataValue('content'),
  //     nums: this.getDataValue('nums')
  //   }
  // }

  static async addComment(book_id, content) {
    const comment = await Comment.findOne({
      where: {
        book_id,
        content
      },
      // attributes: ['id', 'nums', 'book_id']
    })
    if (!comment) {
      return await Comment.create({
        nums: 1,
        book_id,
        content
      })
    } else {
      return await comment.increment('nums', {
        by: 1,
        where: comment.id
      })
    }
  }
  
  static async getComments(book_id) {
    const comments = await Comment.findAll({
      where: {
        book_id
      }
    })
    return comments
  }
}

Comment.prototype.exclude = ['book_id', 'id']

Comment.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING(12),
    allowNull: false
  },
  book_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  // exclude:['book_id','id']
}, {
  sequelize,
  tableName: 'comment'
})

module.exports = {
  Comment
}

