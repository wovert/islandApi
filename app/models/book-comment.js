const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')

class Comment extends Model {
  constructor() {
    super()
  }

  static async addComment(book_id, content) {
    const comment = await Comment.findOne({
      where: {
        book_id,
        content
      }
    })
    if (!comment) {
      return await Comment.create({
        book_id: book_id,
        content: content,
        nums: 1
      })
    } else {
      return await comment.increment('nums', {
        by: 1
      })
    }
  }
  
  static async getComments(bookId) {
    const comments = await Comment.findAll({
      where: {
        book_id: bookId
      }
    })
    return comments
  }
}

Comment.prototype.exclude = ['book_id', 'id']

Comment.init({
  nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  content: Sequelize.STRING(12),
  book_id: Sequelize.INTEGER
  // exclude:['book_id','id']
}, {
  sequelize,
  tableName: 'comment'
})

module.exports = {
  Comment
}

