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
  },
  wx: { // 微明教育：wovert@126.com
    appId: 'wx8e37091f1ca6b8bd',
    appSecret: '1a5466625cebd2ffc9f161864802af04',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  },
  yushu: {
    detailUrl: 'http://t.yushu.im/v2/book/id/%s',
    keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
  } 
}