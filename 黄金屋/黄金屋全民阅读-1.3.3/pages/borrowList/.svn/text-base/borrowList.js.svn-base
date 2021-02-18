//获取应用实例
const app = getApp()

var GetReq = require('../../utils/http.js');

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
      lng: options.lng,
      lat: options.lat,
      city: options.city,
    });

    t.getShelfList();
  
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
    this.getShelfList();
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
   * 获取书柜列表数据
   */
  getShelfList: function (e) {
    var t = this;
    var data = {
      userId: app.globalData.userId,
      lng: t.data.lng,
      lat: t.data.lat,
      keyword: "",
      city: t.data.city,
      distance: '',
      smart: '1',
      pagesize: 100,
      page: 1
    };
    var shelfItem;

    GetReq.GetReq('shelf_list_school', data, function (res) {
      wx.stopPullDownRefresh();
      shelfItem = res.list;
      var itemList = [];
      for(var i = 0;i < shelfItem.length;i++){
        var map = {//将地址截取市以后的数据
          address: shelfItem[i].address.split('市')[1],
          id: shelfItem[i].id,
          no: shelfItem[i].no,
          src: shelfItem[i].src,
          title: shelfItem[i].title,
        }
        itemList.push(map);
      }
      t.setData({ shelfItem: itemList });
    });
  },

  itemTap:function(e){
    var t = this;
    var id = e.currentTarget.dataset.id;
    var address = e.currentTarget.dataset.address;
    console.info(address);
    wx.navigateTo({
      url: '/pages/bookList/bookList?id=' + id + '&address=' + address,
    })
  }
})