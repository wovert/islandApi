const Router = require('koa-router')
const { PositiveIntegerValidator } = require('@validator')
const { HotBook } = require('@models/hot-book')
const { Book } = require('@models/book')

const router = new Router({
  prefix: '/v1/book'
})

router.get('/hot_list', async (ctx, next) => {
  const books = await HotBook.getAll()
  ctx.body = { books }
})

// 图书基础数据 服务形式：API/项目，公用性，API 公开

// book 数据库表
// 业务 API公开

// node.js 中间层
// 微服务
// 雏形

router.get('/:id/detail', async (ctx)=> {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const book = new Book(v.get('path.id'))
  ctx.body = await book.detail()
})

module.exports = router