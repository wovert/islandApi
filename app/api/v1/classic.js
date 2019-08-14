const Router = require('koa-router')
const router = Router()
// const { ParameterException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')

router.post('/v1/:id/classic/latest', async (ctx, next) => {
  // header
  // body
  const path = ctx.params
  const query = ctx.request.query
  const header = ctx.request.header
  const body = ctx.request.body
  
  // abc

  const v = await new PositiveIntegerValidator().validate(ctx)
  const id = v.get('path.id', parsed=false)
  const x = v.get('body.b.e.x', parsed=false)

  // if (true) {
  //   // const error = new Error('为什么错误')
  //   // error.errorCode = 10001
  //   // error.status = 400 // 参数错误
  //   // const error = new ParameterException()
  //   throw new global.exceptions.ParameterException()
  // }

  ctx.body = { key: 'classic' }
})

module.exports = router
