const Router = require('koa-router')
const { TokenValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const {
  generateToken
} = require('../../../core/util')

const router = Router({
  prefix: '/v1/token'
})

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  // 根据不同的type 校验登录
  // API: 权限 公开API
  // token: 过期，不合法
  let token
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break;
    case LoginType.USER_MINI_PROGRAM:
      break;
    default:
      throw new global.exceptions.ParameterException('没有相应的处理函数')
      break;
  }
  ctx.body = {
    token
  }
})

async function emailLogin(account ,secret) {
  const user = await User.verifyEmailPassword(account, secret)
  return generateToken(user.is, 2)
}

module.exports = router
