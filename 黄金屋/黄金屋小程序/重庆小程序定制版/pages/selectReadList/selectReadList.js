//获取应用实例
const app = getApp()

var GetReq = require('../../utils/http.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReadList();
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
   * 获取文章列表
   */
  getReadList:function(){
    var t = this; 

    var data = {
      userId: app.globalData.userId,
      pageSize: 10,
      page:1
    };
    util.MD5Data(data);
    GetReq.GetReq('articlelist', data, function (res) {
      console.info(res);
      t.setData({
        readList: res.list
      });
    });
  },

  hiddenview: function (e) {
    var t = this;
    t.setData({
      flag: true
    });
  },

  stopHidden: function (e) {

  },

  /**
   * 选择文章
   */
  selectTap:function(e){
    var t = this;
    var i = e.currentTarget.dataset.id;
    var readList = t.data.readList;
    t.setData({
      flag: false,
      id: readList[i].articleId,
      title: readList[i].articleName,
      content: readList[i].content,
      record_time: readList[i].timeLength
    });
  },

  /**
   * 跳转至选择背景音
   */
  select:function(){
    var t = this;
    t.setData({
      flag: true
    });
    wx.navigateTo({
      url: '../selectBgmList/selectBgmList?id=' + t.data.id + '&title=' + t.data.title + '&content=' + t.data.content + '&record_time=' + t.data.record_time,
    })
  }
})