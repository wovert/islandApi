const Router = require('koa-router')
const { Favor } = require('../../models/favor')
const { Auth } = require('../../../middlewares/auth')
const { LikeValidator } = require('../../validators/validator')
const { success } = require('../../lib/helper')

// const { ClassicService } = require('../../services/classic')

const router = Router({
  prefix: '/v1/like'
})

router.post('/', new Auth().m, async (ctx, next) => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  })
  await Favor.like(
    v.get('body.art_id'),
    v.get('body.type'),
    ctx.auth.uid
  )
  success()
})

router.post('/cancel', new Auth().m, async (ctx, next) => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  })
  await Favor.disLike(
    v.get('body.art_id'),
    v.get('body.type'),
    ctx.auth.uid
  )
  success()
})

module.exports = router
