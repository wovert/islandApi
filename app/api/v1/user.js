const Router = require('koa-router')
const { User } = require('../../models/user')
const { success } = require('../../lib/helper')
const { RegisterValidator } = require('../../validators/validator')

const router = Router({
  prefix: '/v1/user' // 路由前缀
})


// 注册
router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.nickname')
  }
  await User.create(user) // 保存用户数据
  success()
})

/** 
 * 登录
 * email password
 * token 无意义的随机字符串
 * token => jwt
 * uid 放到 jwt 
 */



module.exports = router
