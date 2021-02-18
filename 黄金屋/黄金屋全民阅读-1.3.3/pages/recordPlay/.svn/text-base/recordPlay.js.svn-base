//获取应用实例
const app = getApp()

var GetReq = require('../../utils/http.js');
var util = require('../../utils/util.js');

const innerAudioContext = wx.createInnerAudioContext()

innerAudioContext.loop = true;

innerAudioContext.onPlay(() => {
  console.log('开始播放1')
})
innerAudioContext.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})

const innerAudioContext2 = wx.createInnerAudioContext()
innerAudioContext2.onPlay(() => {
  console.log('开始播放2')
})
innerAudioContext2.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})
innerAudioContext2.onEnded((res) => {
  innerAudioContext.stop();
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startRecord:'播放',
    isPlayRecord:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    var contentHeight = app.globalData.windowHeight - 250;
    t.setData({
      articleName: options.articleName,
      recordUrl: options.recordUrl,
      content: options.content,
      bgmusicName: options.bgmusicName,
      bgmusicUrl: options.bgmusicUrl,
      contentHeight: contentHeight
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
    innerAudioContext.stop();
    innerAudioContext2.stop();
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

  play: function () {
    var t = this;
    if (t.data.isPlayRecord) {
      t.setData({
        isPlayRecord: false,
        startRecord: '播放'
      })
      innerAudioContext.stop();
      innerAudioContext2.stop();
    } else {
      t.setData({
        isPlayRecord: true,
        startRecord: '停止'
      })
      innerAudioContext.src = 'https://huangjw.kuguanyun.net' + t.data.bgmusicUrl;
      innerAudioContext2.src = 'https://huangjw.kuguanyun.net' + t.data.recordUrl;
      console.info(t.data.bgmusicUrl);
      console.info(t.data.recordUrl);
      innerAudioContext.play();
      innerAudioContext2.play();
    }
  },
})