//app.js
App({
  data:{
    appid: 'wx5df85d77614b3f0b', //小程序appid
    secret: '08e4b3839f5e3fce17b02150ede0cb07', //小程序secret
    weixinMapKey:'RBNBZ-QUO6F-4NWJN-NYP2R-U22Z2-QFBTP', //腾讯地图key
    baiduAk:'x0jzGhx3jPsOW0H7w5izThO56qzdLIyK',  //百度地图Ak
    lvtcode:'44583'
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userId: null, 
    platform:null,
    windowHeight:null,
    isFamily:null,
    hasDeposit:null,
    lvtcode:null,
    role:null,
    invitCode:null,
    orgId:null
  }
})