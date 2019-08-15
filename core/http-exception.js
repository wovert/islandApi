class HttpException extends Error {
  constructor(msg='服务器异常', errorCode=10000, code=400) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg='参数错误', errorCode=10000) {
    super(msg, errorCode, 400)
  }  
}

class NotFound extends HttpException {
  constructor(msg='资源未找到', errorCode=10000) {
    super(msg, errorCode, 404)
  }
}

class AuthFailed extends HttpException {
  constructor(msg='授权失败', errorCode=10004) {
    super(msg, errorCode, 401)
  }
}

class Forbbiden extends HttpException {
  constructor(msg='进制访问', errorCode=10006) {
    super(msg, errorCode, 403)
  }
}

class LikeError extends HttpException {
  constructor(msg='你已经点赞过', errorCode=60001) {
    super(msg, errorCode, 400)
  }
}

class DislikeError extends HttpException {
  constructor(msg='你已取消点赞', errorCode=60002) {
    super(msg, errorCode, 400)
  }
}

class Success extends HttpException {
  constructor(msg='ok', errorCode=0) {
    super(msg, errorCode, 201)
  }
}

module.exports = {
  HttpException,
  Success,
  LikeError,
  DislikeError,
  NotFound,
  AuthFailed,
  Forbbiden,
  ParameterException
}