const Router = require('koa-router')
const { Favor } = require('../../models/favor')
// const { ParameterException } = require('../../../core/http-exception')
const { ClassicValidator, PositiveIntegerValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { ClassicService } = require('../../services/classic')

const router = Router({
  prefix: '/v1/classic'
})


router.get('/latest', new Auth().m, async (ctx, next) => {
  // header
  // body
  // const path = ctx.params
  // const query = ctx.request.query
  // const header = ctx.request.header
  // const body = ctx.request.body
  
  // const v = await new PositiveIntegerValidator().validate(ctx)
  // const id = v.get('path.id', parsed=false)
  // const x = v.get('body.b.e.x', parsed=false)

  const data = await ClassicService.latest()
  ctx.body = data

  // 权限
  // 限制 token 角色
  // 普通用户 | 管理员
  // 分级 scope
  // 8:普通用户 16:管理员
  // ctx.body = ctx.auth.uid
})

// 获取某一期详细信息
router.get('/:type/:id/favor', new Auth().m, async ctx => {
  const v = await new ClassicValidator().validate(ctx)
  // const id = v.get('path.id')
  // const type = v.get('path.type')
  const { id, type } = ctx.params

  const art = await ClassicService.getData(id, type)
  // console.log(id, type)
  await Favor.like(
    id,
    type,
    ctx.auth.uid
  )

})

module.exports = router
