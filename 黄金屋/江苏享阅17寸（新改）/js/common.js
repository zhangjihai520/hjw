function webSocket(wsurl) {
	if("WebSocket" in window) {
		console.log("ws://" + wsurl + "/ws");
		ws = new ReconnectingWebSocket("ws://" + wsurl + "/ws", null, {
			debug: true,
			reconnectInterval: 5000
		})
	} else {
		ws = new SockJS("http://" + wsurl + "/sockjs/ws")
	}

	ws.onopen = onOpen;
	ws.onmessage = onMessage;
	ws.onerror = onError;
	ws.onclose = onClose;

	function onOpen() {
		if(public_getBookShelfNo() != "") {
			var msg = {
				"modeCode": "shelf_login",
				"shelfNo": public_getBookShelfNo()
			};
			ws.send(JSON.stringify(msg))
		}
	}

	function onMessage(e) {
		var msgData = JSON.parse(e.data);
		switch(msgData.modeCode) {
			case "shelf_login":
				console.log(JSON.stringify(msgData));
				if(msgData.result == 1) {
					localStorage.setItem(global_ajaxObject.setting.method_shelf_Name, msgData.shelfName);
					localStorage.setItem(global_ajaxObject.setting.method_shelf_QR, msgData.shelf_QR);
					localStorage.setItem(global_ajaxObject.setting.method_start_Light, msgData.lightStart);
					localStorage.setItem(global_ajaxObject.setting.method_end_Light, msgData.lightEnd);
					
					document.getElementById('shelfName').innerHTML = localStorage.getItem(global_ajaxObject.setting.method_shelf_Name);
				} else {
					mui.toast("请使用前，先绑定设备号")
				}
				break;
			case "update_program":
				if(msgData.bookshelfId == public_getBookShelfId()) {
					var newVersion = parseInt(msgData.version.replace(/\./g, ""));
					plus.runtime.getProperty(plus.runtime.appid, function(inf) {
						var data = {
							version: inf.version
						};
						var curVersion = parseInt(inf.version.replace(/\./g, ""));
						if(curVersion < newVersion) {
							mui.toast("更新新的版本……");
							var newVersionUrl = global_absoluteRoot + msgData.url;
							localStorage.setItem('newVersionUrl', newVersionUrl);
							util.helper.openWindow("progressBar.html", newVersionUrl)
						}
					});
				}
				break;
			case "force_update":
				if(msgData.bookshelfId == public_getBookShelfId()) {
					mui.toast("刷新版本……");
					var newVersionUrl = global_absoluteRoot + msgData.url;
					localStorage.setItem('newVersionUrl', newVersionUrl);
					util.helper.openWindow("progressBar.html", newVersionUrl);
				}
				break;
			case "push_advert":
				if(msgData.bookshelfId == public_getBookShelfId()) {
					console.log(JSON.stringify(msgData));
					var bigImgsUrls = msgData.bigList;
					console.log(JSON.stringify(bigImgsUrls));
					swipeSleepImgs(bigImgsUrls);
					swipeSleepImgsAll(bigImgsUrls);
				}
				break;
			case "openDoor":
				
				//	cellNo 	 	string				柜门号
				//	userId 		stirng/number 		借书人id				
				if(msgData.bookshelfId == public_getBookShelfId()) {
					if(msgData.userId) {
						localStorage.setItem(global_localStorage.method_borrow_user_id, msgData.userId);
						clearTimerTask();
						public_open(msgData.cellNo, function(data) {
							try {
								localStorage.setItem('openType', 'borrowBook');
								localStorage.setItem('openResult', 'true');
								localStorage.setItem('cellNo', msgData.cellNo);
								localStorage.setItem(global_localStorage.bookCode, msgData.bookCode);
								localStorage.setItem(global_localStorage.bookName, msgData.bookName);
							} catch(e) {
								localStorage.setItem('openResult', 'false');
							}
							mui.openWindow('show_result.html');
						})
					} else {
						localStorage.setItem(global_localStorage.method_borrow_user_id,'');
						public_open(msgData.cellNo, function() {
							mui.toast("远程打开" + msgData.cellNo + "成功")
						})
					}
				}
				break;
			case "lightOnOff":
				if(msgData.bookshelfId == public_getBookShelfId()) {
					public_Lamp(msgData.state);
				}
				break;
			case "reboot":
				if(msgData.bookshelfId == public_getBookShelfId()) {
					public_reboot();
				}
				break;
			case "rebootapp":
				plus.runtime.restart();
				break;
			default:
				console.log(msgData.modeCode);
		}
	}

	function onError() {

	}

	function onClose() {

	}
}

function public_Lamp(TypeId) {
	var url = 'http://127.0.0.1:18001/lightOnOff';
	var data = {
		state: TypeId
	};
	var success = function(response) {

	};

	mui.ajaxSettings.beforeSend = function(xhr, setting) {
		//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
		console.log('beforeSend:::' + JSON.stringify(setting));
	};

	mui.ajax(url, {
		data: data,
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(response) {
			success(response);
		},
		error: function(xhr, type, errorThrown) {
			mui.toast(errorThrown);
		}
	});
}

function public_openTake(id) {
	var url = 'http://127.0.0.1:18001/open';
	var data = {
		boxid: id
	};

	mui.ajaxSettings.beforeSend = function(xhr, setting) {

	};

	mui.ajax(url, {
		data: data,
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(response) {
			audioPlay('audio/borrow_book.mp3');
			localStorage.setItem('openType', 'borrowBook');
			localStorage.setItem('openResult', 'true');
			localStorage.setItem('cellNo', id);
			MuiUse.openWindow('show_result.html');
		},
		error: function(xhr, type, errorThrown) {
			localStorage.setItem('openResult', 'false');
			MuiUse.openWindow('show_result.html');
		}
	});
}

function public_reboot() {
	var url = 'http://127.0.0.1:18001/reboot';
	var data = {};
	var success = function(response) {
		console.log("reboot: " + JSON.stringify(response));
	};
	util.ajax.getJSONWaiting(url, data, success);
}

function public_getDoor(id, toDo){
	var url = 'http://127.0.0.1:18001/getDoor';
	var data = {
		boxid: id
	};
	var success = function(response) {
		if(typeof toDo === "function") {
			toDo(response);
		}
	};
	util.ajax.getJSON(url, data, success);
}

/*
 * 生成二维码
 */
function qrcodeMethod(id, w, h, text) {
	var qrcode = new QRCode(id, {
		text: text,
		width: w,
		height: h,
		colorDark: '#000000',
		colorLight: '#ffffff',
		correctLevel: QRCode.CorrectLevel.H
	});
}

function clearLastKeyCss() {
	if(key_basket.length != 0) {
		key_basket[0].style.backgroundColor = "#4C5B78"
		key_basket = [];
	}
}

var p = null;

function audioPlay(url) {
	if(plus.audio == undefined) {
		alert("Device not ready!");
	}
	if(p != null) {
		p.stop();
		p = null;
	}
	p = plus.audio.createPlayer(url);
	p.play(function() {
		//alert("Audio play success!");
	}, function(e) {
		//alert("Audio play error: " + e.message);
	});
}

/*
 * 开启定时器
 */
function timerTask(time, boxId, type) {
	clearTimerTask();
	countDown = setInterval(function() {
		if(time > 0) {
			time--;
			doc.getElementById(boxId).innerText = time + "s";
		} else {
			clearTimerTask();
			if(type == 'back') {
				var view = plus.webview.currentWebview().opener();
				mui.fire(view, 'back');
				mui.back();
			} else if(type == 'result_back') {
				ClosetoWindow();
				mui.back();
			}
			delayOperate();
		}
	}, 1000);
}
/*
 * 清除定时器
 */
function clearTimerTask() {
	if(countDown) {
		clearInterval(countDown)
	};
}

/*
 * 时钟
 */
function showLocale(objD) {
	var strArr, colorhead, colorfoot;
	var yy = objD.getYear();
	if(yy < 1900) {
		yy = yy + 1900
	}
	var MM = objD.getMonth() + 1;
	if(MM < 10) {
		MM = "0" + MM
	}
	var dd = objD.getDate();
	if(dd < 10) {
		dd = "0" + dd
	}
	var hh = objD.getHours();
	if(hh < 10) {
		hh = "0" + hh
	}
	var mm = objD.getMinutes();
	if(mm < 10) {
		mm = "0" + mm
	}
	var ss = objD.getSeconds();
	if(ss < 10) {
		ss = "0" + ss
	}
	var ww = objD.getDay();
	if(ww == 0) {
		colorhead = '<font color="black">'
	}
	if(ww > 0 && ww < 6) {
		colorhead = '<font color="black">'
	}
	if(ww == 6) {
		colorhead = '<font color="black">'
	}
	if(ww == 0) {
		ww = "星期日"
	}
	if(ww == 1) {
		ww = "星期一"
	}
	if(ww == 2) {
		ww = "星期二"
	}
	if(ww == 3) {
		ww = "星期三"
	}
	if(ww == 4) {
		ww = "星期四"
	}
	if(ww == 5) {
		ww = "星期五"
	}
	if(ww == 6) {
		ww = "星期六"
	}
	colorfoot = "</font>";
	strArr = {
		cur_time: hh + ":" + mm,
		cur_date: MM + "月" + dd + "日 ",
		cur_week: ww
	};
	return(strArr)
}

function tick() {
	var today;
	today = new Date();
	document.getElementById("localweek").innerHTML = showLocale(today).cur_week;
	now_time = showLocale(today).cur_time;
	document.getElementById("localtime").innerHTML = now_time;
	document.getElementById("localdate").innerHTML = showLocale(today).cur_date;
	setTimeout("tick()", 1000);

	autoOpenCloseLight(now_time);
	showLocale(today);
}

/**
 * 定时自动开关灯
 * @param {Object} now_time
 */
function autoOpenCloseLight(now_time) {
	if(now_time == localStorage.getItem(global_ajaxObject.setting.method_start_Light) && (localStorage.getItem('auto_light_is_open') == 'false' || localStorage.getItem('auto_light_is_open') == null)) {
		console.info(localStorage.getItem(global_ajaxObject.setting.method_start_Light));
		localStorage.setItem('auto_light_is_open', 'true');
		public_Lamp('1');
	} else if(now_time == localStorage.getItem(global_ajaxObject.setting.method_end_Light) && (localStorage.getItem('auto_light_is_open') == 'true' || localStorage.getItem('auto_light_is_open') == null)) {
		console.info(localStorage.getItem(global_ajaxObject.setting.method_end_Light));
		localStorage.setItem('auto_light_is_open', 'false');
		public_Lamp('0');
	}
}

function openWindow(url) {
	mui.openWindow({
		id: url,
		url: url,
		styles: {
			popGesture: "close"
		},
		show: {
			aniShow: "pop-in",
			autoShow: true
		},
		waiting: {
			autoShow: false
		}
	});
	plus.webview.currentWebview().close(); //关闭该页面
}

/**
 * 关闭指定页面
 */
function ClosetoWindow() {
	var plusWebview = plus.webview,
		webviewsToClose = [
			"reservation_book.html",
			"return_book.html",
			"borrow_book_list_new.html",
			"bookitem.html"
		];

	for(var i = 0, len = webviewsToClose.length; i < len; i++) {
		plusWebview.close(webviewsToClose[i], "none");
	}
}

//---------轮播图函数-------------
function slideshowIndex() {
	var slideshow = document.getElementById("slideshow"),
		imgs = slideshow.getElementsByTagName("img"), //得到图片们
		current = 0; //current为当前活跃的图片编号

	function slideOff() {
		imgs[current].className = ""; //图片淡出
	}

	function slideOn() {
		imgs[current].className = "active"; //图片淡入
	}

	function changeSlide() { //切换图片的函数
		slideOff(); //图片淡出
		current++; //自增1
		if(current >= bigImgCount) current = 0;
		slideOn(); //图片淡入
	}
	//每2s调用changeSlide函数进行图片轮播
	var slideon = setInterval(changeSlide, 15000);
}

/*
 * 加载轮播睡眠图
 */
function swipeSleepImgs(bigImgsUrls) {
	if(bigImgsUrls.length > 0) {
		slideshow.innerHTML = "";
		bigImgCount = bigImgsUrls.length;
		for(var i = 0; i < bigImgsUrls.length; i++) {
			var newEle = doc.createElement("img");
			newEle.src = global_absoluteRoot + bigImgsUrls[i].ImgUrl;
			newEle.className = "bannerimg";
			if(i == 0) {
				newEle.className = "bannerimg active"
			};
			slideshow.appendChild(newEle);
		}
		slideshowIndex();
	}
}

//---------轮播图函数-------------
function slideshowAllIndex() {
	var slideshow = document.getElementById("slideshowAll"),
		imgs = slideshow.getElementsByTagName("img"), //得到图片们
		current = 0; //current为当前活跃的图片编号

	function slideOff() {
		imgs[current].className = ""; //图片淡出
	}

	function slideOn() {
		imgs[current].className = "active"; //图片淡入
	}

	function changeSlide() { //切换图片的函数
		slideOff(); //图片淡出
		current++; //自增1
		if(current >= bigImgCount) current = 0;
		slideOn(); //图片淡入
	}
	//每2s调用changeSlide函数进行图片轮播
	var slideon = setInterval(changeSlide, 15000);
}

/*
 * 加载轮播睡眠图
 */
function swipeSleepImgsAll(bigImgsUrls) {
	if(bigImgsUrls.length > 0) {
		slideshowAll.innerHTML = "";
		bigImgCount = bigImgsUrls.length;
		for(var i = 0; i < bigImgsUrls.length; i++) {
			var newEle = doc.createElement("img");
			newEle.src = global_absoluteRoot + bigImgsUrls[i].ImgUrl;
			if(i == 0) {
				newEle.className = "active"
			};
			slideshowAll.appendChild(newEle);
		}
		slideshowAllIndex();
	}
}

/**
 * 睡眠轮播
 */
var isOperate;
var index = document.getElementById('Index');
var indexSliderAll = document.getElementById('indexSliderAll');

function delayOperate() {
	if(isOperate) {
		clearTimeout(isOperate)
	};
	isOperate = setTimeout(function() {
		if(index.style.display != 'none') {
			indexSliderAll.style.display = 'inline';
			index.style.display = 'none';
			clearTimeout(isOperate);
		} else {
			clearTimeout(isOperate);
			delayOperate();
		}
	}, 35000)
};