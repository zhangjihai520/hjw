//获取应用实例
const app = getApp()

var GetReq = require('../../utils/http.js');
var util = require('../../utils/util.js');

var shelfId; //书柜id
var cellnum; //书格总数

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    shelfId = options.id;
    cellnum = options.cellNum;
    t.setData({
      cellNum: '共' + options.cellNum + '格口'
    });
    t.getShelfZongList();
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
   * 重启书柜
   */
  reboot_shelf: function () {
    var t = this;
    wx.showModal({
      title: '渝书房+',
      content: '是否需要重启书柜?',
      success: function (res) {
        if (res.confirm) {
          var data = {
            userId: app.globalData.userId,
            bookshelfId: shelfId,
          };
          util.MD5Data(data);
          GetReq.GetReq('reboot', data, function (res) {
            wx.showToast({
              icon: 'none',
              title: res.msg,
            })
          });
        }
      }
    })
  },

  /**
   * 重启app
   */
  reboot_app: function () {
    var t = this;
    wx.showModal({
      title: '渝书房+',
      content: '是否需要重启书柜App?',
      success: function (res) {
        if (res.confirm) {
          var data = {
            userId: app.globalData.userId,
            bookshelfId: shelfId,
          };
          util.MD5Data(data);
          GetReq.GetReq('rebootApp', data, function (res) {
            wx.showToast({
              icon: 'none',
              title: res.msg,
            })
          });
        }
      }
    })
  },

  /**
   * 开关灯
   */
  switchChange: function (e) {
    var state;
    if (e.detail.value) {
      state = '1';
    } else {
      state = '0';
    }
    var t = this;
    var data = {
      userId: app.globalData.userId,
      bookshelfId: shelfId,
      state: state
    };
    util.MD5Data(data);
    GetReq.GetReq('lightOnOff', data, function (res) {
      wx.showToast({
        icon: 'none',
        title: res.msg,
      })
    });
  },

  //计算格口查询选择列表
  getShelfZongList: function () {
    var t = this;
    var LatticeNumlistData = [];
    for (var i = 1; i < cellnum; i = i + 20) {
      if ((i + 19) <= cellnum) {
        var listItem = i + "-" + (i + 19);
        LatticeNumlistData.push(listItem);
      } else {
        var listItem = i + "-" + cellnum;
        LatticeNumlistData.push(listItem);
      }
    }
    t.getCellList(LatticeNumlistData[0]);
    t.setData({
      cellitem: LatticeNumlistData
    });
  },

  /**
   * 选择格口区域
   */
  cellSelect:function(e){
    var t = this;
    var selectIndex = e.currentTarget.dataset.id;
    var cell = e.currentTarget.dataset.cell;
    t.setData({
      selectIndex: selectIndex,
      cell: cell,
    });
    wx.showLoading({
      title: '加载中',
    })
    t.getCellList(cell);
  },

  /**
   * 获取格口数据
   */
  getCellList: function (cell){
    var startLatticeNum = cell.split('-')[0] - 1;
    var endLatticeNum = cell.split('-')[1];
    var t = this;
    var data = {
      bookshelfId: shelfId,
      starts: startLatticeNum,
      ends: endLatticeNum
    };
    util.MD5Data(data);
    GetReq.GetReq('cell_list_mag', data, function (res) {
      wx.hideLoading();
      console.info(res);
      var cellList = [];
      for(var i = 0;i < res.list.length;i++){
        var bookInfo;
        var booksize;
        if (res.list[i].myList.length == 0){
          bookInfo = '空';
          booksize = 0;
        } else if (res.list[i].myList.length == 1){
          bookInfo = res.list[i].myList[0];
          booksize = 1;
        }else{
          bookInfo = '数量:' + res.list[i].myList.length + '本';
          booksize = res.list[i].myList.length;
        }
        var map = {
          number: res.list[i].number,
          bookInfo: bookInfo,
          booksize:booksize
        }
        cellList.push(map);
      }
      t.setData({
        cellList: cellList
      });
    });
  },

  /**
   * 开格口门
   */
  openDoor:function(e){
    var t = this;
    var cellNo = e.currentTarget.dataset.number;
    wx.showModal({
      title: '渝书房+',
      content: '是否需要打开该格口?',
      success:function(res){
        if (res.confirm) {
          var data = {
            userId: app.globalData.userId,
            bookshelfId: shelfId,
            cellNo: cellNo
          };
          util.MD5Data(data);
          GetReq.GetReq('openDoor', data, function (res) {
            wx.showToast({
              icon:'none',
              title: res.msg,
            })
          });
        }
      }
    })
  }
})