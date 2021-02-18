const app = getApp()

var GetReq = require('../../utils/http.js');
var util = require('../../utils/util.js');

const innerAudioContext = wx.createInnerAudioContext()
const recorderManager = wx.getRecorderManager()

innerAudioContext.loop = true;

innerAudioContext.onPlay(() => {
  console.log('开始播放')
  wx.hideLoading();
  recorderManager.start(options);
})
innerAudioContext.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})

var tempFilePath;
var article_id;
var bgm_id;
var bgm_url;

recorderManager.onStart(() => {
  console.log('recorder start')
})
recorderManager.onPause(() => {
  console.log('recorder pause')
})

recorderManager.onFrameRecorded((res) => {
  const { frameBuffer } = res
  console.log('frameBuffer.byteLength', frameBuffer.byteLength)
})

const options = {
  duration: 600000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'mp3',
  frameSize: 3000
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRecord:false,
    tempFilePath:'',
    startRecord:'录音',
    contentHeight:'',
    flag:true,
    flag1:true,
    flag2: true,
    flag3: true,
    flag4: true,
    time:3,
    success_hide:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    var contentHeight = app.globalData.windowHeight - 150;
    article_id = options.article_id;
    bgm_id = options.bgm_id;
    bgm_url = options.bgm_url;
    t.setData({
      contentHeight: contentHeight,
      article_id: options.article_id,
      article_name: options.article_name,
      article_content: options.article_content,
      record_time: options.record_time,
      bgm_id: options.bgm_id,
      bgm_mame: options.bgm_mame,
      bgm_url: options.bgm_url
    })
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    recorderManager.stop();
    innerAudioContext.stop();
  },

  /**
   * 录音按钮
   */
  recording:function(){
    var t = this;
    if(t.data.isRecord){//录音结束完成时，跳转到录音成功界面
      t.setData({
        isRecord: false,
        startRecord:'录音'
      })
      recorderManager.stop();
      innerAudioContext.stop();
      recorderManager.onStop(function(res){
        console.log('recorder stop', res)
        innerAudioContext.stop();
        tempFilePath = res;
        wx.showToast({
          title: tempFilePath,
        })
        wx.uploadFile({
          url: 'https://huangjw.kuguanyun.net/appInterface/xcxUploadFile', //仅为示例，非真实的接口地址
          filePath: res.tempFilePath,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            console.info(res);
            var data1 = res.data.substring(1, res.data.length - 1);
            var state = data1.split(',');
            var success, url, msg;
            for (var i = 0; i < state.length; i++) {
              var key = state[i].split(':')[0];
              key = key.substring(1, key.length - 1);
              var value = state[i].split(':')[1];
              switch (key) {
                case "success":
                  success = value;
                  break;
                case "url":
                  url = value.substring(1, value.length - 1);
                  break;
                case "msg":
                  msg = value;
                  break;
              }
            }
            console.info(url);

            if (success == 'true') {
              wx.hideLoading();
              var data = {
                userId: app.globalData.userId,
                bgmusicId: bgm_id,
                articleId: article_id,
                recordUrl: url
              };
              util.MD5Data(data);
              GetReq.GetReq('addMusrecord', data, function (res) {
                console.info(res);
                t.setData({
                  success_hide: false
                })
              });
            } else {
              wx.showToast({
                icon: 'none',
                title: res.msg,
              })
            }
          }
        })
      })
      wx.showLoading({
        title: '保存中',
      })
    }else{//开始录音
      t.setData({
        isRecord: true,
        startRecord: '完成',
        flag:false
      })
      t.setData({
        flag1: false
      });
      t.animation1();
    }
  },

  animation1:function(){
    var t = this;
    var animation = wx.createAnimation({
      duration: 1000,
    })
    console.info(3);
    animation.opacity(0).scale(3, 3).step();//修改透明度,放大
    this.setData({
      animation1: animation.export()
    })  

    setTimeout(function () {
      t.setData({
        flag1: true,
        flag2: false,
        time:2
      });
      t.animation2();
    }.bind(this), 950)
  },

  animation2: function () {
    var t = this;
    var animation = wx.createAnimation({
      duration: 1000,
    })
    console.info(2); 
    animation.opacity(0).scale(3, 3).step();//修改透明度,放大
    this.setData({
      animation2: animation.export()
    })

    setTimeout(function () {
      t.setData({
        flag2: true,
        flag3: false,
        time: 1
      });
      t.animation3();
    }.bind(this), 950)
  },

  animation3: function () {
    var t = this;
    var animation = wx.createAnimation({
      duration: 1000,
    })
    console.info(1);
    animation.opacity(0).scale(3, 3).step();//修改透明度,放大
    this.setData({
      animation3: animation.export()
    })

    setTimeout(function () {
      t.setData({
        flag3: true,
        flag4: false,
        time: '开始'
      });
      t.animation4();
    }.bind(this), 950)
  },

  animation4: function () {
    var t = this;
    var animation = wx.createAnimation({
      duration: 1000,
    })
    console.info(0);
    animation.opacity(0).scale(3, 3).step();//修改透明度,放大
    this.setData({
      animation4: animation.export()
    })

    setTimeout(function () {
      t.setData({
        flag: true
      });
      innerAudioContext.src = 'https://huangjw.kuguanyun.net' + t.data.bgm_url;
      innerAudioContext.play(); //播放背景音乐
      wx.showLoading({
        title: '加载中',
      })
    }.bind(this), 950)
  },

  confirm:function(){
    wx.navigateTo({
      url: '../readList/readList',
    })
  }
})