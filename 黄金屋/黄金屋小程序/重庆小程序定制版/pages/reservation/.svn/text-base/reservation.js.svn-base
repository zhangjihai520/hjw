//获取应用实例
const app = getApp()

var GetReq = require('../../utils/http.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookShelfId:'',
    bookId: '',
    bookName: '',
    address: '',
    date:'',
    flag1: false,
    flag2:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = new Date();
    var startTime = time.getFullYear();
    var endTime = time.getFullYear();
    this.setData({ bookId: options.bookId, bookName: options.bookName, address: options.address, bookShelfId: options.id, bookDetailImg: options.bookDetailImg, startTime: startTime, endTime: endTime });
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startTime, this.data.endTime);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj.dateTimeArray.pop();
    var lastTime = obj.dateTime.pop();
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
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

  bindDateChange: function (e) {
    var t = this;
    t.setData({
      dateTime: e.detail.value
    });

    var dateTimeArray = t.data.dateTimeArray;
    var dateTime = t.data.dateTime;
    var date = dateTimeArray[0][dateTime[0]] + '-' + dateTimeArray[1][dateTime[1]] + '-' + dateTimeArray[2][dateTime[2]] + ' ' + dateTimeArray[3][dateTime[3]] + ':' + dateTimeArray[4][dateTime[4]];

    t.setData({
      date: date
    });
  },

  formSubmit: function (e) {
    var t = this;
    t.submitFormId(e);
    console.info(t.data.date);
    var data = {
      userId: app.globalData.userId,
      bookShelfId: t.data.bookShelfId,
      bookId: t.data.bookId,
      time: t.data.date
    };
    util.MD5Data(data);
    GetReq.GetReq('reserve', data, function (res) {
      console.info(JSON.stringify(res));
      if (res.result == '1') {
        t.setData({
          flag1: true,
          flag2: false,
          code: res.code
        });
      } else {
        wx.showToast({
          icon: 'none',
          title: res.msg,
        })
      }
    });
  },

  submitFormId: function (e) {
    console.log('form发生了submit事件，formId为：', e.detail.formId)
    console.log(e.detail.formId);
    var t = this;
    var data = {
      userId: app.globalData.userId,
      formId: e.detail.formId
    };
    util.MD5Data(data);
    GetReq.GetReq('user_formId_Add', data, function (res) {
      console.info(JSON.stringify(res));

    });
  },
})