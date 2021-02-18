const app = getApp()

var GetReq = require('../../utils/http.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    isPull: true,
    hidden1: false,
    hidden2: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    t.getReservationList();
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
    var t = this;
    t.setData({
      isPull: true,
      page: 1
    });
    t.getReservationList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var t = this;
    t.setData({
      page: t.data.page + 1,
      isPull: false
    });
    wx.showLoading({
      title: '加载中',
    })
    t.getReservationList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getReservationList: function () {
    var t = this;
    var data = {
      id: app.globalData.userId,
      pagesize: 10,
      page: t.data.page
    };
    util.MD5Data(data);
    GetReq.GetReq('my_reservation_list', data, function (res) {
      console.info(res);
      var reservationList = [];
      if (t.data.isPull) {
        reservationList = res.list;
      } else {
        reservationList = t.data.reservationList;
        for (var i = 0; i < res.list.length; i++) {
          reservationList.push(res.list[i]);
        }
      }
      wx.hideLoading();
      wx.stopPullDownRefresh();
      t.setData({
        reservationList: reservationList
      });
      if (reservationList.length == 0) {
        t.setData({
          hidden1: true,
          hidden2: false
        });
        
      }
    });
  }
})