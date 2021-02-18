const app = getApp()

var GetReq = require('../../utils/http.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true,
    page: 1,
    isPull: true
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
    var t = this;
    t.setData({
      isPull: true,
      page: 1
    });
    t.getReadList();
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
    t.getReadList();
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
    var Type;
    if (app.globalData.role == 3 || app.globalData.role == 8){
      Type = 0;
      t.setData({
        hiddenSorce:false
      })
    }else{
      Type = 1;
      t.setData({
        hiddenSorce: true
      })
    }
    var data = {
      userId: app.globalData.userId,
      type: Type,
      pageSize: 10,
      page: t.data.page
    };
    util.MD5Data(data);
    
    GetReq.GetReq('recordlist', data, function (res) {
      console.info(res);
      var recordlist = [];
      if (t.data.isPull) {
        recordlist = res.list;
      } else {
        recordlist = t.data.recordlist;
        for (var i = 0; i < res.list.length; i++) {
          recordlist.push(res.list[i]);
        }
      }
      wx.hideLoading();
      wx.stopPullDownRefresh();
      t.setData({
        recordlist: recordlist
      });
    });
  },

  selectTap:function(e){
    var t =this;
    var id = e.currentTarget.dataset.id;
    var recordlist = t.data.recordlist;
    wx.navigateTo({
      url: '../recordPlay/recordPlay?articleName=' + recordlist[id].articleName + '&recordUrl=' + recordlist[id].recordUrl + '&content=' + recordlist[id].content + '&bgmusicName=' + recordlist[id].bgmusicName + '&bgmusicUrl=' + recordlist[id].bgmusicUrl,
    })
  },

  /**
   * 监听输入分数
   */
  inputScore: function (event) {
    var t = this;
    t.setData({
      Score: event.detail.value,
      ScoreSize: event.detail.cursor
    });
  },

  showScore: function (e){
    var t = this;
    console.info(e);
    var recordId = e.currentTarget.dataset.id;
    t.setData({
      flag:false,
      recordId: recordId
    })
  },

  hiddenview: function () {
    var t = this;
    t.setData({
      flag: true,
    });
  },

  stopHidden: function (e) {

  },

  setScore:function(){
    var t = this;
    console.info(t.data.recordId);
    if (t.data.Score >= 40 && t.data.Score <= 100){
      var data = {
        userId: app.globalData.userId,
        recordId: t.data.recordId,
        score: t.data.Score
      };
      util.MD5Data(data);
      GetReq.GetReq('score_record', data, function (res) {
        console.info(res);
        wx.showToast({
          icon:'none',
          title: res.msg,
        })
        t.setData({
          flag: true
        });
        t.getReadList();
      });
    }else{
      wx.showToast({
        icon:'none',
        title: '请输入40~100之间的分数',
      })
    }
  },
})