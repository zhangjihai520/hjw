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
    console.info(JSON.parse(options.libraryList));
    t.setData({
      libraryArray: JSON.parse(options.libraryList)
    })
    var dockNameMap = [];
    for (var i = 0; i < t.data.libraryArray.length; i++) {
      dockNameMap.push(t.data.libraryArray[i].dockName);
    }
    t.setData({
      dockNameMap: dockNameMap,
      dockOrg: t.data.libraryArray[0].dockOrg
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  bindChange:function(e){
    var t = this;
    t.setData({
      dockName: t.data.libraryArray[e.detail.value].dockName
    });

    for (var i = 0; i < t.data.libraryArray.length;i++){
      if (t.data.dockName == t.data.libraryArray[i].dockName){
        t.setData({
          dockOrg: t.data.libraryArray[i].dockOrg
        });
      }
    }
  },

  /**
   * 监听输入卡号
   */
  inputCard: function(event) {
    var t = this;
    t.setData({
      CardNum: event.detail.value
    });
  },

  /**
   * 监听输入姓名
   */
  inputName: function(event) {
    var t = this;
    t.setData({
      name: event.detail.value
    });
  },

  /**
   * 扫码功能
   */
  toScan: function (e) {
    var t = this;
    wx.scanCode({
      success: (res) => {
        console.log(res);
        t.setData({
          CardNum: res.result
        });
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },


  /**
    * 绑定
    */
  bandingBtn: function () {
    var t = this;
    var data = {
      userId: app.globalData.userId,
      dockOrg: t.data.dockOrg,
      certNo: t.data.CardNum
    };
    util.MD5Data(data);
    data.realname = t.data.name;
    GetReq.GetReq('bindBorrowCard', data, function (res) {
      console.info(JSON.stringify(res));
      if (res.result == 1) {
        wx.showToast({
          title: res.msg,
        })
        wx.navigateBack({
          
        })
      }else{
        wx.showToast({
          icon: 'none',
          title: res.msg,
        })
      }
    });
  },
})