const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')
const { Favor } = require('./favor')

class HotBook extends Model {
  static async getAll() {
    const books = await HotBook.findAll({
      order: [
        'index'
      ]
    })
    const ids = []

    // concurrency: 并发 单线程
    // parallelism: 并行 多线程 多进程
    // python 单线程 new Thread()
    // JavaScript 单线程 高并发（单核利用率高），【宏任务 微任务 EventLoop】
    // CPU 足够快 所以并发感觉像并行
    // CPU 密集型(Java) vs I/O密集型(JavaScript, CPython)
    // Java C#: 多线程（线程同步，lock）

    books.forEach(book => {
      ids.push(book.id)
    })

    // group
    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: ids,
          type: 400
        }
      },
      group: ['art_id'],
      attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]
    })
    books.forEach(book => {
      HotBook._getEachBookStatus(book, favors)
    })
    // 二维矩阵
    return books
  }

  static _getEachBookStatus(book, favors) {
    let count = 0
    favors.forEach(favor => {
      if (book.id === favor.art_id) {
        count = favor.get('count')
      }
    })
    book.setDataValue('count', count)
    return book
  }
}
HotBook.init(
  {
    index: Sequelize.INTEGER, // sort
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
  },
  {
    sequelize,
    tableName: 'hot_book'
  }
)


module.exports = {
  HotBook
}

