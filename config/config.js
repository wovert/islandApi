module.exports = {
  environment: 'dev',
  database: {
    dbName: 'island',
    host: '192.168.1.2',
    port: 3306,
    user: 'root',
    password: '123456789'
  },
  security: {
    secretKey: "a8z52ghxe5s",
    expiresIn: 60*60*24*30 // 30天，上线之后2个小时
  }
}