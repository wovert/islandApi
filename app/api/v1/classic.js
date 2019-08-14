const Router = require('koa-router')
const router = Router({
  prefix: '/v1/classic'
})
// const { ParameterException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')


router.get('/latest', new Auth(9).m, async (ctx, next) => {
  // header
  // body
  // const path = ctx.params
  // const query = ctx.request.query
  // const header = ctx.request.header
  // const body = ctx.request.body
  
  // const v = await new PositiveIntegerValidator().validate(ctx)
  // const id = v.get('path.id', parsed=false)
  // const x = v.get('body.b.e.x', parsed=false)

  // if (true) {
  //   // const error = new Error('为什么错误')
  //   // error.errorCode = 10001
  //   // error.status = 400 // 参数错误
  //   // const error = new ParameterException()
  //   throw new global.exceptions.ParameterException()
  // }

  // ctx.body = { key: 'classic' }

  // 权限
  // 限制 token 角色
  // 普通用户 | 管理员
  // 分级 scope
  // 8:普通用户 16:管理员
  ctx.body = ctx.auth.uid
})

module.exports = router
