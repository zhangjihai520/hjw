//获取应用实例
const app = getApp()

var GetReq = require('../../utils/http.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    t.moneyList();
    t.setData({
      orgId:options.orgId
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

  moneyList:function(){
    var moneyList = [10,20,30,50,100,200];
    var t = this;
    t.setData({
      moneyList:moneyList
    })
  },

  balance_input: function (event) {
    var t = this;
    t.setData({
      balance_num: event.detail.value
    });
  },

  tap:function(event){
    console.info(event.currentTarget.dataset.money);
    var t = this;
    t.setData({
      balance_num: event.currentTarget.dataset.money
    });
    t.recharge();
  },

  recharge:function(){
    var t = this;
    var data = {
      way: 1,
      userId: app.globalData.userId,
      type: 2, //微信小程序type为2
      amount: t.data.balance_num,
      cashId: "",
      orgId: t.data.orgId
    };

    util.MD5Data(data);
    GetReq.GetReq('recharge', data, function (res) {
      console.info(JSON.stringify(res));
      var statement = res.data.statement;

      statement = statement.substring(1, statement.length - 1);
      var state = statement.split(',');
      var timestamp, noncestr, packAge, paySign;
      for (var i = 0; i < state.length; i++) {
        var key = state[i].split(':')[0]
        key = key.substring(1, key.length - 1);
        var value = state[i].split(':')[1];
        switch (key) {
          case "paySign":
            paySign = value.substring(1, value.length - 1);
            break;
          case "package":
            packAge = value.substring(1, value.length - 1);
            break;
          case "nonceStr":
            noncestr = value.substring(1, value.length - 1);
            break;
          case "timeStamp":
            timestamp = value.substring(1, value.length - 1);
            break;
        }
      }
      //调用微信支付方法
      wx.requestPayment(
        {
          'timeStamp': timestamp,
          'nonceStr': noncestr,
          'package': packAge,
          'signType': 'MD5',
          'paySign': paySign,
          'success': function (res) {

          },
          'fail': function (res) {
            console.info(res);
          },
          'complete': function (res) {
            console.info(res);
          }
        })
    });
  },
})