// 获取应用实例
const app = getApp()

Page({
  data: {
   },
  onLoad: function () {
    if (app.globalData.userInfo) {
      // ...
    }
  },
  onGetToken() {
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: 'http://localhost:3000/v1/token',
            method: 'POST',
            data: {
              account: res.code,
              type: 100
            },
            success(res) {
              const code = res.statusCode.toString()
              if (code.startsWith('2')) {
                wx.setStorageSync('token', res.data.token)
              }
            }
          })
        }
      }
    })
  },
  onVerifyToken() {
    wx.request({
      url: 'http://localhost:3000/v1/token/verify',
      method: 'post',
      data: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res.data)
      }
    })

  }
})
