const Router = require('koa-router')
const { TokenValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const {  generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const { WxManager } = require('../../services/wx')

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
      token = await WxManager.codeToToken(v.get('body.account')) // 小程序 account=code
      break;
    case LoginType.ADMIN_EMAIL:
      break;
    default:
      throw new global.exceptions.ParameterException('没有相应的处理函数')
  }
  ctx.body = {
    token
  }
})

async function emailLogin(account ,secret) {
  const user = await User.verifyEmailPassword(account, secret)
  return generateToken(user.id, Auth.USER) // 8:普通用户
}

module.exports = router
