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

  },

  /**
   * 获取书柜列表数据
   */
  getShelfList: function (e) {
    var t = this;
    var data = {
      userId: app.globalData.userId,
      pagesize: 100,
      page: 1
    };
    var shelfItem;
    util.MD5Data(data);
    GetReq.GetReq('shelf_list_mag', data, function (res) {
      wx.stopPullDownRefresh();
      console.info(res);
      shelfItem = res.list;
      var itemList = [];
      for (var i = 0; i < shelfItem.length; i++) {
        var src = 'http://b.huangjw.com/' + shelfItem[i].imgUrl;
        var map = {//将地址截取市以后的数据
          address: shelfItem[i].address.split('市')[1],
          id: shelfItem[i].bookshelfId,
          no: shelfItem[i].number,
          src: src,
          title: shelfItem[i].name,
          state: shelfItem[i].state,
          cellNum: shelfItem[i].zong
        }
        itemList.push(map);
      }
      t.setData({ shelfItem: itemList });
    });
  },

  itemTap: function (e) {
    var t = this;
    var id = e.currentTarget.dataset.id;
    var cellNum = e.currentTarget.dataset.cellnum;
    if (e.currentTarget.dataset.state){
      wx.navigateTo({
        url: '/pages/shelfContorl/shelfContorl?id=' + id + '&cellNum=' + cellNum,
      })
    }else{
      wx.showToast({
        icon:'none',
        title: '该设备不在线',
      })
    }
  }
})