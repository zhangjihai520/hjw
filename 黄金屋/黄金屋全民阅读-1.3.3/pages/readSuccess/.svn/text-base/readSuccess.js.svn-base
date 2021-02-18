//获取应用实例
const app = getApp()

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
    startPlayRecord: '录音播放',
    isPlayRecord: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    t.setData({
      article_id: options.article_id,
      bgm_id: options.bgm_id,
      bgm_url: options.bgm_url,
      record_url: options.record_url
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
    wx.navigateBack({
      delta: 3
    })
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
        startPlayRecord: '录音播放'
      })
      innerAudioContext.stop();
      innerAudioContext2.stop();
    } else {
      t.setData({
        isPlayRecord: true,
        startPlayRecord: '停止播放'
      })
      innerAudioContext.src = 'https://huangjw.kuguanyun.net' + t.data.bgm_url;
      innerAudioContext2.src = t.data.record_url;
      console.info(t.data.record_url);
      innerAudioContext.play();
      innerAudioContext2.play();
    }
  },

  toReadList:function(){
    var t = this;
    wx.navigateTo({
      url: '../readList/readList',
    })
  }
})