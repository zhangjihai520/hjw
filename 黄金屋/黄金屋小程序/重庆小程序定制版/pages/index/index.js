//index.js
//获取应用实例
const app = getApp()
var GetReq = require('../../utils/http.js');

var pkgname = ""; //操作类型 takebook  brbook  brbookbycellbig
var lvtcode = ""; //邀请码
var mactype = ""; //设备类型
var bookShelfId = ""; //书柜id
var bookCode = "";
var cellNo = "";
var xinghao = "";
var shelfType = 0; //1:带RFID 0：不带RFID

Page({
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    this.getOpenIdTap();
  },
  onLoad: function (options) {
    var t = this;
    if (options.lvtcode != null){//获取邀请码
      var scene = decodeURIComponent(options.lvtcode);
      if (scene != null){
        app.globalData.lvtcode = scene;
      }else{
        app.globalData.lvtcode = options.lvtcode;
      }
      console.info(options);
    } else if (options.q != null){ //处理带参数的普通二维码
      var code = decodeURIComponent(options.q);
      var questionIndex = code.split("?")[0];
      var data = code.split("?")[1];

      for (var i = 0; i < data.split("&").length; i++) {
        if (data.split("&")[i].split("=")[0] == "pkgname") {
          pkgname = data.split("&")[i].split("=")[1];
        } else if (data.split("&")[i].split("=")[0] == "lvtcode"){
          lvtcode = data.split("&")[i].split("=")[1];
          app.globalData.lvtcode = lvtcode;
        } else if (data.split("&")[i].split("=")[0] == "mactype") {
          xinghao = data.split("&")[i].split("=")[1];
          if (xinghao.indexOf("HJW") != -1) {
            shelfType = 1;
          }
        } else if (data.split("&")[i].split("=")[0] == "shelfId") {
          bookShelfId = data.split("&")[i].split("=")[1];
        } else if (data.split("&")[i].split("=")[0] == "bookcode") {
          bookCode = data.split("&")[i].split("=")[1];
        } else if (data.split("&")[i].split("=")[0] == "cellNo") {
          cellNo = data.split("&")[i].split("=")[1];
        }
      }
    }
    
    if (app.globalData.userInfo) {
      t.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.info(res);
        t.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          t.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    t.getOpenIdTap();

    wx.getSystemInfo({//获取系统信息
      success: function (res) {
        if (res.platform == 'ios'){
          app.globalData.platform = 2;
        }else{
          app.globalData.platform = 1;
        }
        app.globalData.windowHeight = res.windowHeight;
        t.setData({
          mobileModel: res.model,
          mobileePixelRatio: res.pixelRatio,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          language: res.language,
          version: res.version
        })
      }
    })  
  },
  getUserInfo: function(e) {
    var t = this;
    app.globalData.userInfo = e.detail.userInfo
    t.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  getOpenIdTap: function () {
    var t = this;
    wx.login({
      success: function (res) {
        console.info(res);
        var data = {
          code: res.code,
          orgId:9
        }
        GetReq.GetReq('xcx_check', data, function (res) {
          console.info(res);
          if (res.state == '1') {
            t.weixinLogin(res.telenumber);
          } else {
            console.info(JSON.stringify(t.data.userInfo));
            wx.redirectTo({
              url: '../register/register?openId=' + res.openId_xcx + '&userName=' + t.data.userInfo.nickName + '&version=' + t.data.version + '&mobileModel=' + t.data.mobileModel,
            })
          }
        });
      }
    })
  },

  weixinLogin: function (submit_cellphone) {
    var t = this;
    var userInfo = t.data.userInfo;
    var data = {
      type: 2,
      nickname: userInfo.nickName,
      avatar: userInfo.avatarUrl,
      tel: submit_cellphone,
      textCode: "",
      os: app.globalData.platform,
      regId: t.data.version
    }
    GetReq.GetReq('log_in', data, function (res) {
      console.info(res);
      if (res.result == 1) {
        app.globalData.userId = res.userId
        wx.redirectTo({
          url: '../borrow/borrow'
        })
      } else {
        wx.showToast({
          title: res.msg,
        })
      }
    });
  }
})