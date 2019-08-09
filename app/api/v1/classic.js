const Router = require('koa-router')
const router = Router()

router.post('/v1/:id/classic/latest', (ctx, next) => {
  // header
  // body
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body

  ctx.body = { key: 'classic' }
})

module.exports = router
