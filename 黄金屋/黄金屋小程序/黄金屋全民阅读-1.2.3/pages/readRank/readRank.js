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
    t.getReadList();
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
   * 获取录音列表
   */
  getReadList: function () {
    var t = this;
    var data = {
      userId: app.globalData.userId,
      type: 0,
      pageSize: 10,
      page: 1
    };
    util.MD5Data(data);

    GetReq.GetReq('recordlist', data, function (res) {
      console.info(res);
      t.setData({
        recordlist: res.list
      });
    });
  },

  selectTap: function (e) {
    var t = this;
    var id = e.currentTarget.dataset.id;
    var recordlist = t.data.recordlist;
    wx.navigateTo({
      url: '../recordPlay/recordPlay?articleName=' + recordlist[id].articleName + '&recordUrl=' + recordlist[id].recordUrl + '&content=' + recordlist[id].content + '&bgmusicName=' + recordlist[id].bgmusicName + '&bgmusicUrl=' + recordlist[id].bgmusicUrl,
    })
  },
})