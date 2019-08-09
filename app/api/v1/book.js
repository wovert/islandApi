const Router = require('koa-router')
const router = Router()

router.get('/v1/book/latest', (ctx, next) => {
  ctx.body = { key: "book" }
})

module.exports = router