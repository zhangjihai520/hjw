const app = getApp()

var GetReq = require('../../utils/http.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    describe: '',
    price: '',
    service_describe:'',
    service_price:'',
    price_notice:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    t.setData({
      orgId: options.orgId
    });
    this.getStarLevel();
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

  getStarLevel: function () {
    var t = this;
    var data = {
      orgId: t.data.orgId,
      city: ""
    }
    util.MD5Data(data);
    GetReq.GetReq('cashfee_list', data, function (res) {
      console.info(res);
      // var listtt = [{ "beyondTime": "3", "cashName": "黄金屋标准", "useFee": "0", "bookNumber": 1, "id": 1, "cash": 199, "attrOrgId": "0" }, { "beyondTime": "15", "cashName": "公益♦兴国", "useFee": "0", "bookNumber": 1, "id": 2, "cash": 50, "attrOrgId": "27" }, { "beyondTime": "2", "cashName": "标准•济南", "cost": 0, "useFee": "1", "bookNumber": 1, "numberdays": 365, "id": 3, "cash": 99, "attrOrgId": "18" }, { "beyondTime": "3", "cashName": "标准&bull;山西", "useFee": "0", "bookNumber": 3, "id": 4, "cash": 169, "attrOrgId": "29" }, { "beyondTime": "1", "cashName": "公益♦龙南", "useFee": "0", "bookNumber": 1, "id": 6, "cash": 50, "attrOrgId": "22" }, { "beyondTime": "1", "cashName": "公益♦中国航空", "cost": 30, "useFee": "0", "bookNumber": 1, "numberdays": 30, "id": 7, "cash": 69, "attrOrgId": "28" }];

      var describe = '押金(可退，可借' + res.list[0].bookNumber + '本,可阅读' + res.list[0].beyondTime + '天)';
      var service_describe = '';
      var service_price = '';
      if (res.list[0].useFee == "1"){
        service_describe = '服务费(不可退,期限为' + res.list[0].numberdays + '天)';
        service_price = res.list[0].cost + '元';
      }
      switch (res.list[0].billIng){
        case "1":
          t.setData({
            price_notice: res.list[0].bill1Msg
          })
          break;
        case "2":
          t.setData({
            price_notice: res.list[0].bill2Msg
          })
          break;
      }
      t.setData({
        list: res.list,
        describe: describe,
        price: res.list[0].cash,
        service_describe: service_describe,
        service_price: service_price
      });
    });
  },

  selectStar: function (e) {
    var t = this;
    var id = e.currentTarget.dataset.id;
    var list = t.data.list;
    var describe = '押金(可退，可借' + list[id].bookNumber + '本,可阅读' + list[id].beyondTime + '天)';
    var service_describe = '';
    var service_price = '';
    if (list[id].useFee == "1") {
      service_describe = '服务费(不可退,期限为' + list[id].numberdays + '天)';
      service_price = list[id].cost + '元';
    }
    t.setData({
      id: id,
      describe: describe,
      price: list[id].cash,
      service_describe: service_describe,
      service_price: service_price
    });
  },


  /**
   * way:	BALANCE: 1(充值),DEPOSIT: 2（押金）,
   * weixinPay:type = 1
   */
  recharge: function () {
    var t = this;
    var amount;
    t.submitFormId();
    if (t.data.list[t.data.id].useFee == "1"){//判断是否需要服务费,1为需要，0为不需要
      amount = t.data.list[t.data.id].cash + t.data.list[t.data.id].cost;
    }else{
      amount = t.data.list[t.data.id].cash;
    }
    var cashId = t.data.list[t.data.id].id;
    var orgId = t.data.list[t.data.id].attrOrgId;
    var data = {
      way: 2,
      userId: app.globalData.userId,
      type: 2, //微信小程序type为2
      amount: amount,
      cashId: cashId,
      orgId: orgId
    }
    util.MD5Data(data);

    wx.showLoading({
      title: '加载中',
    })

    GetReq.GetReq('recharge', data, function (res) {
      if(res.result == 0){
        wx.showToast({
          icon:'none',
          title: res.msg
        })
        wx.hideLoading();
      }else{
        console.info(res);
        wx.hideLoading();
        var statement = res.data.statement;
        statement = statement.substring(1, statement.length - 1);
        var state = statement.split(',');
        var timestamp, noncestr, packAge, paySign;
        for (var i = 0; i < state.length; i++) {
          var key = state[i].split(':')[0]
          key = key.substring(1, key.length - 1);
          var value = state[i].split(':')[1];
          switch (key) {
            case "paySign":
              paySign = value.substring(1, value.length - 1);
              break;
            case "package":
              packAge = value.substring(1, value.length - 1);
              break;
            case "nonceStr":
              noncestr = value.substring(1, value.length - 1);
              break;
            case "timeStamp":
              timestamp = value.substring(1, value.length - 1);
              break;
          }
        }
        //调用微信支付方法
        wx.requestPayment(
          {
            'timeStamp': timestamp,
            'nonceStr': noncestr,
            'package': packAge,
            'signType': 'MD5',
            'paySign': paySign,
            'success': function (res) {
              wx.navigateBack({

              })
            },
            'fail': function (res) {
              wx.navigateBack({

              })
              wx.showModal({
                title: 'none',
                content: '支付失败',
              })
            },
            'complete': function (res) {
              wx.navigateBack({

              })
            }
          })
      }
    });
  },

  /**
 * 获取用户信息
 * HAS_DEPOSIT: 1,已交押金
   NO_DEPOSIT: 2,未交押金
   IN_WITHDRAW_APPLICATION: 3，退还押金中
 */
  getUserDetail: function () {
    var t = this;
    var data = {
      id: app.globalData.userId
    };
    util.MD5Data(data);
    GetReq.GetReq('user_detail', data, function (res) {
      app.globalData.hasDeposit = res.hasDeposit;
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