const Router = require('koa-router')
const { TokenValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')

const router = Router({
  prefix: '/v1/token'
})

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  // 根据不同的type 校验登录
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      await emailLogin(v.get('body.account'), v.get('body.secret'))
      break;
    case LoginType.USER_MINI_PROGRAM:
      break;
    default:
      throw new global.exceptions.ParameterException('没有相应的处理函数')
      break;
  }
})

async function emailLogin(account ,secret) {
  const user = await User.verifyEmailPassword(account, secret)
}

module.exports = router
