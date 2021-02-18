var hexMD5 = require('/md5.js');
var QQMapWX = require('/qqmap-wx-jssdk.js');
var barcode = require('./barcode.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTimeStr(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

function MD5Data(data) {
  var message = "";
  for (var prop in data) {
    message += (prop + data[prop]);
  }
  message += "qfsdfsdfasd";
  data.sign = hexMD5.hexMD5(message);
}

function reverseLocation(latitude, longitude, cb) {
  // 实例化API核心类
  var demo = new QQMapWX({
    key: 'A7NBZ-OVEC3-A3S3G-YMRKR-6CNRJ-T5BTT' // 必填
  });
  // 调用接口
  demo.reverseGeocoder({
    location: {
      latitude: latitude,
      longitude: longitude
    },
    coord_type: 3,//baidu经纬度
    success: function (res) {
      return cb(res);
    }
  });
}

function convert_length(length) {
  return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
}

function barc(id, code, width, height) {
  barcode.code128(wx.createCanvasContext(id), code, convert_length(width), convert_length(height))
}

module.exports = {
  formatTime: formatTime,
  MD5Data: MD5Data,
  reverseLocation: reverseLocation,
  formatTimeStr: formatTimeStr,
  barcode: barc
}