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
    var libraryList = JSON.parse(options.libraryList)
    // for(var i = 0;i < libraryList.length;i++){
    //   if (libraryList[i].dockOrg == app.globalData.orgId){
    //     this.setData({
    //       name: options.name,
    //       certNo: options.certNo,
    //       imgBei: libraryList[i].imgBei,
    //       imgZheng: libraryList[i].imgZheng
    //     });
    //   }
    // }

    this.setData({
      name: options.name,
      certNo: options.certNo,
      imgBei: libraryList[0].imgBei,
      imgZheng: libraryList[0].imgZheng
    });

    util.barcode('barcode', options.certNo, 420, 50);
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
    
  },
})