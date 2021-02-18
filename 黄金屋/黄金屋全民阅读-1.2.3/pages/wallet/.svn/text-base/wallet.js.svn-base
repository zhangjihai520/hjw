//获取应用实例
const app = getApp()

var util = require('../../utils/util.js');
var GetReq = require('../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargeHidden:false,
    isToBanding:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    if (app.globalData.isFamily == 0){
      if (app.globalData.hasDeposit == 1) {//已交押金
        t.setData({
          flag1: false,
          flag2: true,
          flag3:true
        });
      } else if (app.globalData.hasDeposit == 2){//未交押金
        t.setData({
          flag1: true,
          flag2: true,
          flag3:false,
          rechargeHidden:true
        });
      } else if (app.globalData.hasDeposit == 0){//免押金
        t.setData({
          flag1: true,
          flag2: false,
          flag3:true
        });
      }
    }else{
      t.setData({
        flag1: true,
        flag2: true,
        flag3:true
      });
    }
    t.getUserDetail();
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
   * 预约记录
   */
  reservaBtn:function(){
    wx.navigateTo({
      url: '../reservaList/reservaList',
    })
  },

  /**
   * 跳转至借阅历史列表
   */
  borrowHistroy: function () {
    wx.navigateTo({
      url: '../historyList/historyList',
    })
  },

    /**
   * 跳转至借阅卡
   */
  readcard:function(){
    var t = this;
    if (t.data.isToBanding){
      wx.redirectTo({
        url: '../readCardBand/readCardBand',
      })
    }else{
      wx.navigateTo({
        url: '../readCard/readCard?name=' + t.data.name + '&certNo=' + t.data.certNo,
      })
      
    }
  },

  /**
   * 获取用户信息
   * 	HAS_DEPOSIT: 1,已交押金
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
      console.info(JSON.stringify(res));
      var deposit = res.deposit + '元';
      if (res.certBindTime != null){
        t.setData({
          isToBanding:false,
          name:res.name,
          certNo:res.certNo
        })
      }
      t.setData({
        balance:res.balance,
        deposit_type: res.hasDeposit,
        orgId: res.orgId,
        cellphone: res.cellphone,
        orgName:res.orgName,
        deposit: deposit
      });
      t.getStarLevel();
    });
  },

  getStarLevel: function () {
    var t = this;
    var data = {
      orgId: t.data.orgId,
      city: ""
    }
    util.MD5Data(data);
    GetReq.GetReq('cashfee_list', data, function (res) {
      var describe = '1、每人最多借' + res.list[0].bookNumber + '本,' + res.list[0].beyondTime + '天之内归还';
      t.setData({
        describe: describe,
      });
    });
  },

  /**
   * 点击进入充值页面
   */
  recharge:function(){
    var t = this;
    wx.navigateTo({
      url: '/pages/recharge/recharge?orgId=' + t.data.orgId,
    })
  },

  /**
   * 点击执行退还押金操作
   */
  deposit:function(){
    var t = this;
    if (t.data.deposit_type == 1){
      wx.showModal({
        title: '黄金屋全民阅读',
        content: '退款后，您将不能进行图书借阅，确认要进行此退款吗？',
        success:function(e){
          if(e.confirm){//执行退款操作
            t.withdraw();
          }
        }
      })
    }else{
      wx.showToast({
        title: '退款中',
      })
    }
  },

  /**
   * 申请退款方法
   */
  withdraw:function(){
    var t = this;
    var data = {
      userId: app.globalData.userId
      // userId: '18'
    };
    util.MD5Data(data);
    GetReq.GetReq('withdraw', data, function (res) {
      console.info(JSON.stringify(res));
      wx.showToast({
        icon:'none',
        title: res.msg,
      })
      t.setData({//设置押金为退还中的状态
        deposit_type: 3
      });
    });
  },

  /**
   * 跳转至交押金界面
   */
  payDeposit:function(){
    var t = this;
    wx.navigateTo({
      url: '../deposit/deposit?orgId=' + t.data.orgId
    })
  }
})