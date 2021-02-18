//获取应用实例
const app = getApp()

var util = require('../../utils/util.js');
var GetReq = require('../../utils/http.js');

var lvtcode;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitClass: 'submit_unclick',
    phoneNum: '',
    view1: false,
    view2: true,
    view3: true,
    time:'获取验证码',
    submitVerificationCode: 'submit_unclick',
    registerBtn:'submit_unclick',
    nextText:'下一步'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    if (app.globalData.lvtcode != null){
      lvtcode = app.globalData.lvtcode;
    }else{
      lvtcode = '';
    }
    
    t.setData({
      userName:options.userName,
      openId:options.openId,
      version: options.version
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var t = this;
    var info = app.globalData.invitCode;
    return {
      title: '',
      path: '/pages/index/index?lvtcode=' + info,
      success: function (res) {
        console.info(res);
      }
    }
  },

  /**
   * 监听输入手机号
   */
  inputPhone: function (event) {
    var t = this;
    t.setData({
      phoneNum: event.detail.value,
      phoneNumSize: event.detail.cursor
    });
    if (event.detail.cursor == 11) {
      t.setData({
        submitClass: 'submit_click'
      });
    } else {
      t.setData({
        submitClass: 'submit_unclick'
      });
    }
  },

  /**
   * 提交手机号
   */
  submit: function () {
    var t = this;
    if (t.data.phoneNumSize == 11) {
      t.setData({
        view1: true,
        view2: false,
      });
      if(lvtcode.length == 5){
        t.setData({
          nextText:'注册'
        });
      }
    } else {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号'
      })
    }
  },

  /**
   * 获取验证码
   */
  get_verification_code: function () {
    var t = this;
    if (t.data.time == '获取验证码'){ //防止重复点击
      var time = 60;
      t.setData({
        time: time
      });
    }else{
      return;
    }
    var data = {
      tel: t.data.phoneNum
    };
    util.MD5Data(data);
    GetReq.GetReq('verif_code', data, function (res) { //verif_code
      console.info(res);
      if (res.invitCode != null){
        lvtcode = res.invitCode;
        t.setData({
          nextText: '注册'
        });
      }
      wx.showToast({
        title: '发送成功',
      })
      
      var IntervalId =  setInterval(function () {
        time--;
        if(time == 0){
          t.setData({
            time: '获取验证码'
          });
          clearInterval(IntervalId);
        }else{
          time = time;
          t.setData({
            time: time
          });
        }
      }, 1000)
    });
  },

  /**
   * 监听输入验证码
   */
  inputVerificationCode: function (event) {
    var t = this;
    t.setData({
      VCode: event.detail.value,
      VCodeSize: event.detail.cursor
    });
    if (event.detail.cursor == 6) {
      t.setData({
        submitVerificationCode: 'submit_click'
      });
    } else {
      t.setData({
        submitVerificationCode: 'submit_unclick'
      });
    }
  },

  /**
   * 提交验证码
   */
  submitVerificationCode: function () {
    var t = this;
    if(lvtcode.length == 5){
      var data = {
        userName: t.data.userName,
        tel: t.data.phoneNum,
        textCode: t.data.VCode,
        inviteCode: lvtcode,
        os: app.globalData.platform,
        regId: t.data.version,
        openId: t.data.openId
      };
      util.MD5Data(data);
      GetReq.GetReq('register_xcx', data, function (res) { //register_xcx
        console.info('注册成功-----' + JSON.stringify(res));
        if (res.result == 1) {
          app.globalData.userId = res.userId;
          wx.showToast({
            title: '注册成功',
          })
          wx.redirectTo({
            url: '../borrow/borrow'
          })
        } else {
          wx.showModal({
            title: '黄金屋全民阅读',
            content: res.msg,
          })
          app.globalData.userId = res.userId;
        }
      });
    }else{
      if (t.data.VCodeSize == 6) {
        t.setData({
          view2: true,
          view3: false
        });
      } else {
        wx.showToast({
          icon: 'none',
          title: '请输入正确的验证码'
        })
      }
    }
  },

  /**
   * 返回至输入手机号的页面
   */
  back1:function(){
    var t = this;
    t.setData({
      view1: false,
      view2: true
    });
  },

  /**
   * 返回至输入验证码的页面
   */
  back2: function () {
    var t = this;
    t.setData({
      view2: false,
      view3: true
    });
  },

  /**
   * 扫码功能
   */
  toScan: function (e) {
    var t = this;
    wx.scanCode({
      success: (res) => {
        var code = res.path;
        console.info(code);
        var questionIndex = code.split("?")[0];
        var data = code.split("?")[1];
        
        for (var i = 0; i < data.split("&").length; i++) {
          if (data.split("&")[i].split("=")[0] == "lvtcode") {
            var inviationCode = data.split("&")[i].split("=")[1];
            t.setData({
              IvCode: inviationCode,
              IvCodeSize: 5,
              registerBtn: 'submit_click'
            });
          }
        }
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },

  /**
   * 监听邀请码输入
   */
  inputIvCode: function (event){
    var t = this;
    t.setData({
      IvCode: event.detail.value,
      IvCodeSize: event.detail.cursor
    });
    if (event.detail.cursor == 5) {
      t.setData({
        registerBtn: 'submit_click'
      });
    }else{
      t.setData({
        registerBtn: 'submit_unclick'
      });
    }
  },

  /**
   * 注册按钮
   */
  registerBtn:function(){
    var t = this;
    if (t.data.IvCodeSize != 5) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的邀请码'
      })
    }
    var data = {
      userName: t.data.userName,
      tel: t.data.phoneNum,
      textCode: t.data.VCode,
      inviteCode: t.data.IvCode,
      os: app.globalData.platform,
      regId: t.data.version,
      openId: t.data.openId
    };
    util.MD5Data(data);
    GetReq.GetReq('register_xcx', data, function (res) { //register_xcx
      console.info('注册成功-----' + JSON.stringify(res));
      if (res.result == 1){
        app.globalData.userId = res.userId;
        wx.showToast({
          title: '注册成功',
        })
        wx.redirectTo({
          url: '../borrow/borrow'
        })
      }else{
        wx.showModal({
          title: '黄金屋全民阅读',
          content: res.msg,
        })
        app.globalData.userId = res.userId;
      }
    });
  }
})