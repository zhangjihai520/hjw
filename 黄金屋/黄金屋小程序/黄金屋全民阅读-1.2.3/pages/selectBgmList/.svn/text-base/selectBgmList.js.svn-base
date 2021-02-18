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
    t.setData({
      article_id:options.id,
      article_name: options.title,
      article_content:options.content,
      record_time:options.record_time
    });
    t.getBgmList();
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
 * 获取背景音乐列表
 */
  getBgmList: function () {
    var t = this;
    var data = {
      userId: app.globalData.userId,
      pageSize: 10,
      page: 1
    };
    util.MD5Data(data);
    GetReq.GetReq('bgmusiclist', data, function (res) {
      console.info(res);
      t.setData({
        bgmList: res.list
      });
    });
  },

  /**
   * 跳转至录音界面
   */
  selectTap: function (e) {
    var t = this;
    var i = e.currentTarget.dataset.id;
    var bgmList = t.data.bgmList;
    t.setData({
      flag: true
    });
    console.info(bgmList[i].bgmusicUrl);
    wx.navigateTo({
      url: '../read/read?article_id=' + t.data.article_id + '&article_name=' + t.data.article_name + '&article_content=' + t.data.article_content + '&record_time=' + t.data.record_time + '&bgm_id=' + bgmList[i].bgmusicId + '&bgm_mame=' + bgmList[i].bgmusicName + '&bgm_url=' + bgmList[i].bgmusicUrl,
    })
  }
})