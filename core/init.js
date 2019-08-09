const rd = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
  }
  // 初始化加载路由
  static initLoadRouters() {
    // path config
    const apiDir = `${process.cwd()}/app/api`
    rd(module, apiDir, {
      visit: function (obj) {
        if (obj instanceof Router) {
          InitManager.app.use(obj.routes())
        }
      }
    })
  }  
}

module.exports = InitManager