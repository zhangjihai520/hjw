var rootDocment = 'https://huangjw.kuguanyun.net/appInterface/';//你的域名  
// var rootDocment = 'http://z7rwxj.natappfree.cc/appInterface/'; 
var dockrootDocment = 'http://192.168.7.138:8080/appInterface/'; 

function GetReq(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'get',
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

function PostReq(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'post',
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

module.exports = {
  GetReq: GetReq,
  PostReq:PostReq
}