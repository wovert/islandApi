const Router = require('koa-router')
const { TokenValidator, NotEmptyValidator } = require('../../validators/validator')
// const { User } = require('../../models/user')
// const {  generateToken } = require('../../../core/util')
// const { Auth } = require('../../../middlewares/auth')
const { LoginService } = require('../../services/login')
const { WxService } = require('../../services/wx')

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

// 验证令牌
router.post('/verify', async (ctx) => {
  // token
  const v = await new NotEmptyValidator().validate(ctx)
  const result = await WxService.verify(v.get('body.token'))
  ctx.body = {
    result
  }
})



module.exports = router
