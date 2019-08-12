const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    
    const isHttpException = error instanceof HttpException
    const isDev = process.env.NODE_ENV === 'dev' || global.config.environment === 'dev'

    // 开发环境
    if (isDev && !isHttpException) {
      throw error
    }

    // 已知异常
    if (error instanceof HttpException) {
      ctx.body = {
        msg: error.msg,
        errorCode: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    } else {
      // 未知异常
      ctx.body = {
        msg: '未知错误',
        errorCode: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError