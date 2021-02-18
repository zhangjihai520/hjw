//获取应用实例
const app = getApp()

var MD5Data = require('../../utils/util.js');
var GetReq = require('../../utils/http.js');

var touchDotX = 0;//触摸时的原点
var touchDotY = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    selectTypeIndex: 0,
    address: '',
    bookTypeId: '',
    bookTypeSelect: '全部',
    bookList: [],
    flag: true,
    bookIdSelect: '',
    bookDetailImg: '',
    bookDetailName: '',
    bookDetailAuthor: '',
    bookDetailContent: '',
    page: 1,
    isPull: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id,
      address: options.address,
      Height: app.globalData.windowHeight
    });
    this.getBookType();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var t = this;
    t.setData({
      isPull: true,
      page: 1
    });
    t.getBookList(t.data.bookTypeId, '');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var t = this;
    t.setData({
      page: t.data.page + 1,
      isPull: false
    });
    wx.showLoading({
      title: '加载中',
    })
    t.getBookList(t.data.bookTypeId, '');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var t = this;
    var info = app.globalData.invitCode;
    return {
      title: '',
      path: '/pages/index/index?lvtcode=' + info,
      success: function(res) {
        console.info(res);
      }
    }
  },

  hiddenview: function(e) {
    var t = this;
    t.setData({
      flag: true
    });
  },

  stopHidden: function(e) {

  },

  /**
   * 进入图书预约界面，若未缴纳押金则进入缴纳押金界面
   */
  toReservation: function(e) {
    var t = this;
    t.setData({
      flag: true
    })
    wx.navigateTo({
      url: '/pages/reservation/reservation?bookId=' + t.data.bookIdSelect + '&id=' + t.data.id + '&address=' + t.data.address + '&bookName=' + t.data.bookDetailName + '&bookDetailImg=' + t.data.bookDetailImg,
    })
  },

  /**
   * 选择书籍类型
   */
  bookTypeTap: function(e) {
    var t = this;
    var selectTypeIndex = e.currentTarget.dataset.id;
    var bookTypeId = e.currentTarget.dataset.bookid;
    console.info(selectTypeIndex);
    t.setData({
      selectTypeIndex: selectTypeIndex,
      bookTypeId: bookTypeId,
      isPull: true,
      page: 1
    });
    wx.showLoading({
      title: '加载中',
    })
    t.getBookList(bookTypeId, '');
  },

  bookTap: function(e) {
    var t = this;
    var bookid = e.currentTarget.dataset.bookid;
    t.setData({
      bookIdSelect: bookid
    });
    var data = {
      bookShelfId: t.data.id,
      bookId: bookid,
      cell: ""
    };
    MD5Data.MD5Data(data);
    GetReq.GetReq('bookXq', data, function(res) {
      // console.info(JSON.stringify(res));
      var bookContent = "";
      var bookPic = "";
      var bookName = "";
      var bookAuthor = "";
      if(res.bookContent != undefined){
        bookContent = res.bookContent.substring(0, 160) + '...';
      }

      if (res.bookPic != undefined){
        bookPic = res.bookPic;
      }

      if(res.bookName != undefined){
        bookName = res.bookName;
      }

      if(res.bookAuthor != undefined){
        bookAuthor = res.bookAuthor;
      }
      
      t.setData({
        flag: false,
        bookDetailImg: bookPic,
        bookDetailName: bookName,
        bookDetailAuthor: bookAuthor,
        bookDetailContent: bookContent
      });
    });
  },

  /**
   * 获取书柜类型
   */
  getBookType: function(e) {
    var t = this;
    var data = {
      bookShelfId: t.data.id
    };
    GetReq.GetReq('book_type_list', data, function(res) {
      var typeList = res.list;
      typeList.unshift({
        typeId: "",
        typeName: "全部"
      });
      console.info(typeList);
      t.setData({
        booktype: typeList
      });
      t.getBookList('', '');
    });
  },

  /**
   * 获取书柜列表数据
   */
  getBookList: function(typeId, keyword) {
    var t = this;
    var data = {
      bookshelfId: t.data.id,
      typeId: typeId,
      pagesize: 20,
      page: t.data.page,
      keyword: keyword
    };
    GetReq.GetReq('book_list', data, function(res) {
      var bookList = [];
      if (t.data.isPull) {
        bookList = res.list;
      } else {
        bookList = t.data.bookList;
        for (var i = 0; i < res.list.length; i++) {
          bookList.push(res.list[i]);
        }
      }
      wx.hideLoading();
      wx.stopPullDownRefresh();
      t.setData({
        bookList: bookList
      });
    });
  },

  // 触摸开始事件
  touchStart: function (e) {
    touchDotX = e.touches[0].pageX; // 获取触摸时的原点 
    touchDotY = e.touches[0].pageY; // 获取触摸时的原点 
  },
  // 触摸结束事件
  touchEnd: function (e) {
    var t = this;
    var selectTypeIndex =  t.data.selectTypeIndex;
    var booktype = t.data.booktype;
    var touchMoveX = e.changedTouches[0].pageX;
    var touchMoveY = e.changedTouches[0].pageY;

    if (Math.abs(touchMoveY - touchDotY) > Math.abs(touchMoveX - touchDotX) && Math.abs(touchMoveY - touchDotY) > 20){
      return;
    }
    // 向左滑动   
    if (touchMoveX - touchDotX <= -40 && selectTypeIndex < booktype.length) {
      //执行切换页面的方法
      console.log("向右滑动"); // ++1
      selectTypeIndex++;
      t.setData({
        selectTypeIndex: selectTypeIndex,
        bookTypeId: booktype[selectTypeIndex].typeId,
        isPull: true,
        page: 1
      })
      wx.showLoading({
        title: '加载中',
      })
      t.getBookList(t.data.bookTypeId, '');
    }
    // 向右滑动   
    if (touchMoveX - touchDotX >= 40 && selectTypeIndex > 0) {
      //执行切换页面的方法
      console.log("向左滑动"); //+1
      selectTypeIndex--;
      t.setData({
        selectTypeIndex: selectTypeIndex,
        bookTypeId: booktype[selectTypeIndex].typeId,
        isPull: true,
        page: 1
      })
      wx.showLoading({
        title: '加载中',
      })
      t.getBookList(t.data.bookTypeId, '');
    }
  }
})