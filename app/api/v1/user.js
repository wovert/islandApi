const Router = require('koa-router')
const router = Router({
  prefix: '/v1/user' // 路由前缀
})
const { RegisterValidator } = require('../../validators/validator')

// 注册
router.post('/register', async (ctx) => {
  const v = new RegisterValidator().validate(ctx)
})

module.exports = router
