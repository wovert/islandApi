const Router = require('koa-router')
// const { PositiveIntegerValidator } = require('@validator')
const router = new Router({
  prefix: '/v1/book'
})

const { HotBook } = require('../../models/hot-book')

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
  // const v = await new PositiveIntegerValidator().validate(ctx)
})

module.exports = router