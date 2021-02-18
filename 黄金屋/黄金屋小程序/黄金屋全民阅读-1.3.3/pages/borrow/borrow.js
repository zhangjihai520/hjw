//获取应用实例
const app = getApp()

var util = require('../../utils/util.js');
var GetReq = require('../../utils/http.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');

var latnew;
var lngnew;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    longitude: '',
    latitude: '',
    city: '',
    markers: [],
    lat: '',
    lng: '',
    markerss: [],
    isDownBtn: true,
    hiddenflag: true,
    down_btn: '/pages/image/hjw_down_img.png',
    isHaveText: true,
    text: '',
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marquee_margin: 30,
    size: 14,
    interval: 20, // 时间间隔
    reservationflag: true,
    signFlag:true
  },

  //事件处理函数
  scanTap: function () {
    this.toScan();
  },

  /**
   * 点击动画
   */
  downBtnTap: function () {
    var t = this;
    var y;
    var deg;
    if (t.data.isDownBtn) {
      y = 145;
      t.setData({
        isDownBtn: false,
        down_btn: '/pages/image/hjw_up_img.png'
      });
    } else {
      y = 0;
      t.setData({
        isDownBtn: true,
        down_btn: '/pages/image/hjw_down_img.png'
      });
    }

    // 显示遮罩层  
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation;
    animation.translateY(y).step();

    this.setData({
      animationData: animation.export()
    })
  },

  /**
   * 进入书柜列表界面
   */
  shelfListBtnTap: function () {
    var t = this;
    wx.navigateTo({
      url: '../borrowList/borrowList?lng=' + t.data.longitude + '&lat=' + t.data.latitude + '&city=' + t.data.city,
    })
  },

  /**
   * 进入钱包界面
   */
  walletBtnTap: function () {//判断是否缴纳押金，若未缴纳押金则进入缴纳押金页面   isFamily是否是内部会员：0否，是1
    var t = this;
    wx.navigateTo({
      url: '../wallet/wallet'
    })
  },

  /**
   * 跳转至选择朗读文章列表
   */
  toRecordBtn: function () {
    wx.navigateTo({
      url: '../selectReadList/selectReadList'
    })
  },

  /**
   * 跳转至书柜控制
   */
  shelf_control: function () {
    wx.navigateTo({
      url: '../shelfContorlList/shelfContorlList'
    })
  },

  /**
   * 跳转至录音列表
   */
  toRecordList: function () {
    wx.navigateTo({
      url: '../readList/readList',
    })
  },

  /**
   * 跳转至录音排名列表
   */
  toRecordRank: function () {
    wx.navigateTo({
      url: '../readRank/readRank',
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

  //map上标记的点击事件监听
  markertap: function (e) {
    var t = this;
    var shelfItem = t.data.shelfItem;
    var address;
    var latitude;
    var longitude;
    var title;
    for (var i = 0; i < shelfItem.length; i++) {
      if (shelfItem[i].id == e.markerId) {
        address = shelfItem[i].address;
        latitude = shelfItem[i].lat;
        longitude = shelfItem[i].lng;
        title = shelfItem[i].title;
      }
    }
    // 实例化API核心类
    var demo = new QQMapWX({
      key: getApp().data.weixinMapKey  // 必填  
    });
    // 调用接口
    demo.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      coord_type: 3,//baidu经纬度
      success: function (res) {
        wx.openLocation({
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          name: title,
          scale: 28
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_sign();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('map')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadInfo();
    this.getUserDetail();
    this.getReservationList();
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
    wx.stopPullDownRefresh();
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
   * 获取用户信息
   * HAS_DEPOSIT: 1,已交押金
     NO_DEPOSIT: 2,未交押金
     IN_WITHDRAW_APPLICATION: 3，退还押金中

     isDeposit 	number 		1 			是否免押金,1为免押金
   */
  getUserDetail: function () {
    var t = this;
    var data = {
      id: app.globalData.userId
    };
    util.MD5Data(data);
    GetReq.GetReq('user_detail', data, function (res) {
      console.info(res);
      app.globalData.isFamily = res.isFamily;
      app.globalData.hasDeposit = res.hasDeposit;
      app.globalData.role = res.role;
      app.globalData.invitCode = res.invitCode;
      t.setData({
        orgId: res.orgId
      });
    });
  },

  loadInfo: function () {
    var t = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        t.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
        t.loadCity(res.longitude, res.latitude);
      }
    })
  },

  loadCity: function (longitude, latitude) {
    var t = this;
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=' + getApp().data.baiduAk + '&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success    
        console.log(res);
        var city = res.data.result.addressComponent.city;
        var lastChar = city.substring(city.length - 1);
        if (lastChar === "市") {
          city = city.substring(0, city.length - 1);
        }
        t.setData({ city: city });
        t.getShelfList();
      },
      fail: function () {
        t.setData({ currentCity: "获取定位失败" });
      },
    })
  },

  /**
   * 获取书柜列表数据
   */
  getShelfList: function (e) {
    var t = this;
    var data = {
      userId: app.globalData.userId,
      lng: t.data.longitude,
      lat: t.data.latitude,
      keyword: "",
      city: "",
      distance: '',
      smart: '1',
      pagesize: 200,
      page: 1
    };
    var shelfItem;
    GetReq.GetReq('shelf_list_school', data, function (res) {
      console.info(res);
      shelfItem = res.list;
      var markers = [];
      for (var i = 0; i < shelfItem.length; i++) {
        // t.reverseLocation(shelfItem[i]);
        var map = {
          id: shelfItem[i].id,
          latitude: shelfItem[i].lat - 0.0059220641,
          longitude: shelfItem[i].lng - 0.00653888735,
          iconPath: '../image/hjw_shelf_item_img.png',
          name: shelfItem[i].title,
          label: shelfItem[i].address,
          width: 25,
          height: 25
        }
        markers.push(map);
      }
      t.setData({ shelfItem: shelfItem });
      t.setData({ markers: markers });
    });
  },

  reverseLocation: function (shelfItem) {
    var t = this;
    // 实例化API核心类
    var demo = new QQMapWX({
      key: getApp().data.weixinMapKey  // 必填  
    });
    // 调用接口
    demo.reverseGeocoder({
      location: {
        latitude: shelfItem.lat,
        longitude: shelfItem.lng
      },
      coord_type: 3,//baidu经纬度
      success: function (res) {
        latnew = res.result.location.lat;
        lngnew = res.result.location.lng;
      }
    })
  },

  /**
   * 扫码功能
   */
  toScan: function (e) {
    var t = this;

    wx.scanCode({
      success: (res) => {
        console.info(res.result);
        var code = res.result;
        var questionIndex = code.split("?")[0];
        var data = code.split("?")[1];
        var pkgname = ""; //操作类型 takebook  brbook  brbookbycellbig
        var mactype = ""; //设备类型
        var bookShelfId = ""; //书柜id
        var bookCode = "";
        var cellNo = "";
        var xinghao = "";
        var shelfType = 0; //1:带RFID 0：不带RFID

        for (var i = 0; i < data.split("&").length; i++) {
          if (data.split("&")[i].split("=")[0] == "pkgname") {
            pkgname = data.split("&")[i].split("=")[1];
          } else if (data.split("&")[i].split("=")[0] == "mactype") {
            xinghao = data.split("&")[i].split("=")[1];
            if (xinghao.indexOf("HJW") != -1) {
              shelfType = 1;
            }
          } else if (data.split("&")[i].split("=")[0] == "shelfId") {
            bookShelfId = data.split("&")[i].split("=")[1];
          } else if (data.split("&")[i].split("=")[0] == "bookcode") {
            bookCode = data.split("&")[i].split("=")[1];
          } else if (data.split("&")[i].split("=")[0] == "cellNo") {
            cellNo = data.split("&")[i].split("=")[1];
          }
        }
        console.info(JSON.stringify(pkgname));
        t.scanBorrow(pkgname, bookShelfId, bookCode, cellNo, shelfType);
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },

  /**
   * 扫码借书请求方法
   */
  scanBorrow: function (pkgname, bookShelfId, bookCode, cellNo, shelfType) {
    var t = this;
    var url;
    var data = {

    };

    switch (pkgname) {
      case "takebook":
        if (shelfType == 1) {
          url = 'reserve_book_scan';
        } else {
          url = 'get_book_scan';
        }
        data = {
          bookShelfId: bookShelfId,
          userId: app.globalData.userId
        };
        break;
      case "brbook":
        url = 'borrow_book_scan';
        data = {
          bookCode: bookCode,
          userId: app.globalData.userId
        };
        break;
      case "brbookbycellbig":
        url = 'scan_cellNo_multi';
        data = {
          bookShelfId: bookShelfId,
          cellNo: cellNo,
          userId: app.globalData.userId
        };
        break;
      case "lbrshelfQRscan":
        url = 'lbr_shelf_QRscan';
        data = {
          macId: bookShelfId,
          userId: app.globalData.userId
        }
        break;
      case "scan_userInfo":
        url = 'scan_userInfo';
        data = {
          bookShelfId: bookShelfId,
          userId: app.globalData.userId
        };
        break;
    }
    util.MD5Data(data);
    GetReq.GetReq(url, data, function (res) {
      console.info(JSON.stringify(res));
      if (res.result == 1) {
        t.getReservationList();
        wx.showToast({
          title: '成功',
        })
      } else if (res.result == 2) {//当没有缴纳押金时，跳转至缴纳押金界面
        wx.showModal({
          title: '黄金屋全民阅读',
          content: '您当前账号没有借阅权限，需要缴纳押金开通权限，是否前去开通？',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../deposit/deposit?orgId=' + t.data.orgId
              })
            }
          }
        })
      } else if (res.result == 3) {//余额不足
        wx.showModal({
          title: '黄金屋全民阅读',
          content: '您当前账号余额不足，是否需要充值？',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../wallet/wallet'
              })
            }
          }
        })
      }
      // else if(res.result == -9){
      //   wx.showModal({
      //     title: '黄金屋全民阅读',
      //     content: '您当前尚未绑定读书证，是否需要前往绑定？',
      //     success: function (res) {
      //       if (res.confirm) {
      //         wx.navigateTo({
      //           url: '../readCardBand/readCardBand',
      //         })
      //       }
      //     }
      //   })
      // }
      else {
        wx.showToast({
          icon: 'none',
          title: res.msg
        })
      }
    });
  },

  /**
   * 定位到当前位置
   */
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },

  /**
   * 获取预约信息
   */
  getReservationList: function () {
    var t = this;
    var data = {
      userId: app.globalData.userId, //18   89962
    }

    util.MD5Data(data);
    GetReq.GetReq('reserveXQ_xcx', data, function (res) {
      console.info(JSON.stringify(res));
      if (res.result == 1) {
        var time = util.formatTimeStr(res.invalidDate, 'Y-M-D h:m');
        var time1 = util.formatTimeStr(res.invalidDate, 'M-D h:m');
        var str = time + '预约《' + res.bookName.substring(0, 4) + '》 ' + '预约码:' + res.code;
        var str1 = '请在' + time1 + '之前使用取书码:';
        var str2 = res.code + ' 到指定书柜取书';
        console.info(str);
        t.setData({
          text: str,
          isHaveText: false,
          reserveId: res.Id,
          bookPic: res.bookPic,
          jingdu: res.jingdu,
          weidu: res.weidu,
          code: res.code,
          address: res.address,
          bookAuthor: res.bookAuthor,
          bookName: res.bookName,
          shelfName: res.shelfName,
          str1: str1,
          str2: str2
        })
      } else {
        t.setData({
          isHaveText: true
        })
      }
    });
  },

  /**
   * 显示预约详情
   */
  showDetail: function () {
    var t = this;
    t.setData({
      reservationflag: false
    })
  },

  /**
   * 取消预约
   */
  cancel: function () {
    var t = this;
    wx.showModal({
      title: '黄金屋全民阅读',
      content: '是否要取消预约？',
      success: function (res) {
        if (res.confirm) {
          var data = {
            userId: app.globalData.userId,
            reserveId: t.data.reserveId
          };
          util.MD5Data(data);
          GetReq.GetReq('cancel_reserve', data, function (res) {
            console.info(res);
            wx.showToast({
              icon: 'none',
              title: res.msg,
            })
            t.getReservationList();
            t.setData({
              reservationflag: true
            })
          });
        }
      }
    })
  },

  /**
   * 导航
   */
  getway: function () {
    var t = this;
    // 实例化API核心类
    var demo = new QQMapWX({
      key: getApp().data.weixinMapKey  // 必填  
    });
    // 调用接口
    demo.reverseGeocoder({
      location: {
        latitude: t.data.weidu,
        longitude: t.data.jingdu
      },
      coord_type: 3,//baidu经纬度
      success: function (res) {
        wx.openLocation({
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          name: t.data.shelfName,
          scale: 28
        })
      }
    })
  },

  hiddenview: function (e) {
    var t = this;
    t.setData({
      reservationflag: true
    });
  },

  stopHidden: function (e) {

  },

  /**
   * 功能按钮点击动画
   */
  multipleBtnTap: function () {
    var t = this;
    var ax1, ay1, ax2, ay2, ax3, ay3, ax4, ay4;
    if (t.data.hiddenflag) {
      ax1 = -30;
      ay1 = -30;
      ax2 = 0;
      ay2 = -50;
      ax3 = -50;
      ay3 = 0;
      ax4 = -30;
      ay4 = 30;
      t.setData({
        hiddenflag: false,
      });
    } else {
      ax1 = 0;
      ay1 = 0;
      ax2 = 0;
      ay2 = 0;
      ax3 = 0;
      ay3 = 0;
      ax4 = 0;
      ay4 = 0;
      t.setData({
        hiddenflag: true,
      });
    }

    // 显示遮罩层  
    var animation1 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    this.animation1 = animation1;
    animation1.translateX(ax1).translateY(ay1).step();

    // 显示遮罩层  
    var animation2 = wx.createAnimation({
      duration: 400,
      timingFunction: "linear",
      delay: 0
    })
    this.animation2 = animation2;
    animation2.translateX(ax2).translateY(ay2).step();

    // 显示遮罩层  
    var animation3 = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation3 = animation2;
    animation3.translateX(ax3).translateY(ay3).step();

    // 显示遮罩层  
    var animation4 = wx.createAnimation({
      duration: 100,
      timingFunction: "linear",
      delay: 0
    })
    this.animation4 = animation4;
    animation4.translateX(ax4).translateY(ay4).step();

    this.setData({
      toRecordRankAnimation: animation1.export(),
      recordAnimation: animation2.export(),
      toRecordAnimation: animation3.export(),
      borrowHistroyAnimation: animation4.export()
    })
  },

  /**
 * 签到
 */
  get_sign: function () {
    var t = this;
    var data = {
      userId: app.globalData.userId,
      scoreType:'signin',
      formId:''
    }
    util.MD5Data(data);
    GetReq.GetReq('user_jf_Add', data, function (res) {
      console.info(JSON.stringify(res));
      if(res.msg == "今天已签到！"){
        t.setData({
          signFlag:true
        })
      }else{
        wx.navigateTo({
          url: '../wallet/wallet?signFlag=' + false
        })
      }
    });
  },
})