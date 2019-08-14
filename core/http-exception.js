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

class Success extends HttpException {
  constructor(msg='ok', errorCode=0) {
    super(msg, errorCode, 201)
  }
}

module.exports = {
  HttpException,
  Success,
  NotFound,
  AuthFailed,
  ParameterException
}