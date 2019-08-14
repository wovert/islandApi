const Router = require('koa-router')
const { TokenValidator } = require('../../validators/validator')
// const { User } = require('../../models/user')
// const {  generateToken } = require('../../../core/util')
// const { Auth } = require('../../../middlewares/auth')
const { LoginService } = require('../../services/login')

const router = Router({
  prefix: '/v1/token'
})

// 获取令牌
router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  const params = {
    account: v.get('body.account'),
    secret: v.get('body.secret'),
    type: v.get('body.type')
  }
  const token = await LoginService.login(params)
  ctx.body = {
    token
  }
})



module.exports = router
