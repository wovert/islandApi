function success(msg, errorCode) {
  throw new global.exceptions.Success(msg, errorCode)
}
module.exports = {
  success
}