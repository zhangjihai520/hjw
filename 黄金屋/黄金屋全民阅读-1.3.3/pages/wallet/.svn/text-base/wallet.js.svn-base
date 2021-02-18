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
    isToBanding:true,
    readcardhidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    
    if (options.signFlag == 'false'){
      t.setData({
        signFlag: false
      });
    }else{
      t.setData({
        signFlag: true
      });
    }

    t.get_sign_grade();
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
    var t = this;
    t.getUserDetail();  
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
  reservaBtn:function(e){
    console.info(JSON.stringify(e));
    this.submitFormId(e);
    wx.navigateTo({
      url: '../reservaList/reservaList',
    })
  },

  /**
   * 跳转至借阅历史列表
   */
  borrowHistroy: function (e) {
    console.info(JSON.stringify(e));
    this.submitFormId(e);
    wx.navigateTo({
      url: '../historyList/historyList',
    })
  },

  /**
   * 跳转至收藏记录
   */
  saveHistroy:function(){
    wx.navigateTo({
      url: '../saveHistory/saveHistory',
    })
  },

    /**
   * 跳转至借阅卡
   */
  readcard:function(e){
    console.info(JSON.stringify(e));
    this.submitFormId(e);
    var t = this;
    if (t.data.isToBanding){
      wx.redirectTo({
        url: '../readCardBand/readCardBand?libraryList=' + JSON.stringify(t.data.libraryList) ,
      })
    }else{
      wx.navigateTo({
        url: '../readCard/readCard?name=' + t.data.name + '&certNo=' + t.data.certNo + '&libraryList='+ JSON.stringify(t.data.libraryList),
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
    wx.showLoading({
      title: '加载中',
    })
    GetReq.GetReq('user_detail', data, function (res) {
      wx.hideLoading();
      console.info(JSON.stringify(res));
      app.globalData.isFamily = res.isFamily;
      app.globalData.hasDeposit = res.hasDeposit;
      app.globalData.role = res.role;
      app.globalData.invitCode = res.invitCode;
      app.globalData.orgId = res.orgId;
      if (res.libraryList != null && res.libraryList.length > 0){
        t.setData({
          readcardhidden:false,
          libraryList: res.libraryList
        })
      }

      if (app.globalData.isFamily == 0) {
        if (app.globalData.hasDeposit == 1) {//已交押金
          if (res.deposit != res.cash){
            t.setData({
              flag1: true,
              flag2: true,
              flag3: true,
              flag4: false
            });
          }else{
            t.setData({
              flag1: false,
              flag2: true,
              flag3: true,
              flag4: true
            });
          }
        } else if (app.globalData.hasDeposit == 2) {//未交押金
          t.setData({
            flag1: true,
            flag2: true,
            flag3: false,
            flag4: true,
            rechargeHidden: true
          });
        } else if (app.globalData.hasDeposit == 0) {//免押金
          t.setData({
            flag1: true,
            flag2: false,
            flag3: true,
            flag4: true
          });
        }
      } else {
        t.setData({
          flag1: true,
          flag2: true,
          flag3: true,
          flag4: true
        });
      }

      var deposit = res.deposit + '元';
      if (res.certBindTime != null){
        t.setData({
          isToBanding:false,
          name:res.name,
          certNo:res.certNo
        })
      }

      var balance_num = parseFloat(res.cash) - parseFloat(res.deposit);
      console.info(balance_num);
      t.setData({
        balance:res.balance,
        deposit_type: res.hasDeposit,
        orgId: res.orgId,
        cellphone: res.cellphone,
        orgName:res.orgName,
        deposit: deposit,
        balance_num: balance_num
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
  * 签到
  */
  get_sign_grade: function () {
    var t = this;
    var data = {
      userId: app.globalData.userId
    }
    util.MD5Data(data);
    GetReq.GetReq('user_jf_grade', data, function (res) {
      console.info(JSON.stringify(res));
      t.setData({
        level_num: res.grade,
        level_num_next: parseInt(res.grade) + 1,
        level_exl: parseInt(res.gradeScore) - parseInt(res.curScore),
        titleName: res.titleName,
        percent: parseInt(res.curScore) / parseInt(res.gradeScore) * 100,
        pc: '#FDD017',
        pbc: '#f3f3f3',
        isActive: true,
        isSi: false,
        sw: 3,
      })
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
  payDeposit: function (e){
    console.info(JSON.stringify(e));
    this.submitFormId(e);
    var t = this;
    wx.navigateTo({
      url: '../deposit/deposit?orgId=' + t.data.orgId
    })
  },

  close_btn: function () {
    var t = this;
    t.setData({
      signFlag: true
    })
  },

  /**
   * 点击签到
   */
  sign_btn: function (e) {
    var t = this;
    t.submitFormId(e);
    wx.showToast({
      title: '签到成功',
    })

    t.setData({
      signFlag: true
    })
  },

  submitFormId:function(e){
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

  /**
   * 补交押金
   */
  addPayDeposit:function(){
    var t = this;
    var data = {
      way: 2,
      userId: app.globalData.userId,
      type: 2, //微信小程序type为2
      amount: t.data.balance_num,
      cashId: "",
      orgId: t.data.orgId
    };

    util.MD5Data(data);

    wx.showLoading({
      title: '加载中',
    })

    GetReq.GetReq('recharge', data, function (res) {
      wx.hideLoading();
      if (res.result == 0){
        wx.showToast({
          icon:'none',
          title: res.msg
        })
      }else{
        console.info(JSON.stringify(res));
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
              console.info(res);
            },
            'complete': function (res) {
              console.info(res);
            }
          })
      }
    });
  }
})