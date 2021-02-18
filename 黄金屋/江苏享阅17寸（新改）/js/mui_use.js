var MuiUse = {
	openWindow: function(url, id, aniShow, WAutoShow) {

		if(!arguments[0]) {
			mui.toast('未检测到界面');
			return false;
		}
		id = arguments[1] ? arguments[1] : arguments[0];
		aniShow = arguments[2] ? arguments[2] : 'slide-in-right';
		WAutoShow = arguments[3] ? arguments[3] : false;

		mui.openWindow({
			url: url,
			id: id, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			show: {
				autoShow: true, //页面loaded事件发生后自动显示，默认为true
				aniShow: aniShow //页面显示动画，默认为”slide-in-right“；
			},
			waiting: {
				autoShow: WAutoShow, //自动显示等待框，默认为true
				title: '正在加载...' //等待对话框上显示的提示内容
			}
		})
	}
}

/**
 * @description 判断网络状态
 */
function GetNetWorkState() {
	var NetStateStr = '未知';
	var types = {};
	types[plus.networkinfo.CONNECTION_UNKNOW] = "未知";
	types[plus.networkinfo.CONNECTION_NONE] = "未连接网络";
	types[plus.networkinfo.CONNECTION_ETHERNET] = "有线网络";
	types[plus.networkinfo.CONNECTION_WIFI] = "WiFi网络";
	types[plus.networkinfo.CONNECTION_CELL2G] = "2G蜂窝网络";
	types[plus.networkinfo.CONNECTION_CELL3G] = "3G蜂窝网络";
	types[plus.networkinfo.CONNECTION_CELL4G] = "4G蜂窝网络";
	NetStateStr = types[plus.networkinfo.getCurrentType()];

	return NetStateStr;
};

/**
 * @description 判断是否有网络
 */
var IsNetWorkCanUse = function() {
	var IsCanUseNetWork = false;
	if(GetNetWorkState() == '未知' || GetNetWorkState() == '未连接网络') {
		IsCanUseNetWork = false;
	} else {
		IsCanUseNetWork = true;
	}
	return IsCanUseNetWork;
};

/**
 * @description 成功响应的回调函数
 * @url sad
 */
var ajax = function(url, data, success, type, dataType) {

	type = arguments[3] ? arguments[3] : 'get';
	dataType = arguments[4] ? arguments[4] : 'json';

	data = MD5Data(data);

	console.log('检测网络环境:' + GetNetWorkState());
	//alert('检测网络环境:' + GetNetWorkState());
	//if(IsNetWorkCanUse() == false) { return; }
	console.log('进入ajax方法...');
	//发送数据
	console.log('url:' + url + "|type:" + type + "|dataType:" + dataType);
	/**
	 * @description 设置全局beforeSend
	 */
	mui.ajaxSettings.beforeSend = function(xhr, setting) {
		//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
		console.log('beforeSend:::' + JSON.stringify(setting));
	};
	/**
	 * @description 设置全局complete
	 */
	mui.ajaxSettings.complete = function(xhr, status) {
		console.log('complete:::' + status);
		console.log('ajax结束...');
		//complete(xhr, status);
	}	
	//plus.nativeUI.showWaiting('加载中...');	
	mui.ajax(url, {
		data: data,
		dataType: dataType, //服务器返回json格式数据
		type: type, //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(response) {
			//plus.nativeUI.closeWaiting();	
			success(response);
		},
		error: function(xhr, type, errorThrown) {	
			plus.nativeUI.closeWaiting();
			//异常处理			
			console.log('xhr:' + xhr + "|type:" + type + "|errorThrown:" + errorThrown);
			//error(xhr, type, errorThrown);
		}
	});

};

var MD5Data = function(data) {
	var message = "";
	for(var prop in data) {
		message += (prop + data[prop]);
	}
	message += "qfsdfsdfasd";
	console.log("message1111: " + message);
	//alert(data);
	data.sign = MD5(message);
	return data;
}