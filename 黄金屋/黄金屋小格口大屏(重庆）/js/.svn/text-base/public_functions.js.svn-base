/**
 * 获取设备id
 */
function public_getBookShelfId() {
	return localStorage.getItem(localcacheName.method_shelfId) || "";
}

function public_getBookShelfNo() {
	return localStorage.getItem(localcacheName.method_shelfNo) || "";
}

/*
 * 开关灯
 */
function light_onOff(state) {
	var url = createBoxctrlServiceURL(interface_name.method_lightOnOff);
	var success = function(response) {};
	var data = {
		state: state
	};
	util.ajax.getJSON(url, data, success);
}

/*
 * 开柜门
 * id:柜门号
 */
function public_open(id, toDo) {
	var url = createBoxctrlServiceURL(interface_name.method_open);
	var data = {
		boxid: id,
		isbig:1
	};
	var success = function(response) {
		if(typeof toDo == "function") {
			toDo(response);
		}
	};
	util.ajax.getJSONByControl(url, data, success);
}

/*
 * shelfNo： 格子id
 */
function public_getBooksInCell(shelfNo, toDo){
	var url = createBoxctrlServiceURL(interface_name.method_get_books_in_cell);	
	var data = {
		boxid: shelfNo
	};	
	var success = function(response) {		
		if(typeof toDo === "function"){
			toDo(response);
		}
	};
	util.ajax.getJSON(url, data, success);
}

/*
 * shelfNo： 格子id
 */
function public_getDoor(shelfNo, toDo){
	var url = createBoxctrlServiceURL(interface_name.method_getDoor);	
	var data = {
		boxid: shelfNo,
		isbig:1
	};
	var success = function(response) {
		if(typeof toDo === "function"){
			toDo(response);
		}	
	};
	util.ajax.getJSON(url, data, success);
}

/**
 * 重启设备
 */
function public_reboot() {
	var url = createBoxctrlServiceURL(interface_name.method_reboot);
	var data = {};
	var success = function(response) {
		console.log("reboot: " + JSON.stringify(response));
	};
	util.ajax.getJSONByControl(url, data, success);
}

/**
 * 当发送控制端指令失败时，重启控制端
 * @param {Object} title
 * @param {Object} content
 * @param {Object} errorMsg
 */
function linkControl(id,title,content,errorMsg){
	uploadError(id, '','',content,'');
//	mui.alert(errorMsg,title,'确定',function(){
//		var newElement = document.createElement("a");
//		newElement.href = "hjw://contorl";
//		newElement.click();
//	});
}

/**
 * 生成二维码
 * @param {Object} id
 * @param {Object} w
 * @param {Object} h
 * @param {Object} text
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
			if(type == 'back') {
				var view = plus.webview.currentWebview().opener();
				mui.fire(view, 'back');
				mui.back();
			} else if(type == 'result_back') {
				ClosetoWindow();
				var view = plus.webview.currentWebview().opener();
				mui.fire(view, 'back');
				mui.back();
			} else if(type == 'back_home') {
				clearTimerTask();
				delayOperate();
				div_home.hidden = false;
				div_book_list_page.hidden = true;
				div_book_item.hidden = true;
				div_return_book.hidden = true;
				div_slider.hidden = true;
				back.hidden = true;
				document.getElementById("keyboardArea").style.display = "none";
				return_book_clear();
			} else if(type == 'confirm_back'){
				get_book_success_userCloseDoor(cellNo,localStorage.getItem(localcacheName.method_borrow_user_id), finalData);
			}
		}
	}, 1000);
}

/**
 * 关闭指定页面
 */
function ClosetoWindow() {
	var plusWebview = plus.webview,
		webviewsToClose = [
			"get_book.html",
			"setting.html",
			"borrow_by_cell.html"
		];

	for(var i = 0, len = webviewsToClose.length; i < len; i++) {
		plusWebview.close(webviewsToClose[i], "none");
	}
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
 * 清除定时器广告
 */
function clearTimerTaskOperate() {
	if(isOperate) {
		clearInterval(isOperate);
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
	wainshow();
//	public_heart();
	autoOpenCloseLight(now_time);
	showLocale(today);
}

/**
 * 定时自动开关灯
 * @param {Object} now_time
 */
function autoOpenCloseLight(now_time) {
	if(now_time == localStorage.getItem(localcacheName.method_start_Light) && (localStorage.getItem('auto_light_is_open') == 'false' || localStorage.getItem('auto_light_is_open') == null)) {
		localStorage.setItem('auto_light_is_open', 'true');
		public_Lamp('1');
	} else if(now_time == localStorage.getItem(localcacheName.method_end_Light) && (localStorage.getItem('auto_light_is_open') == 'true' || localStorage.getItem('auto_light_is_open') == null)) {
		localStorage.setItem('auto_light_is_open', 'false');
		public_Lamp('0');
	}
}

/*
 * 播放语音
 */
function audioPlay(url) {
	if(glo_audioPlayer) {
		glo_audioPlayer.stop();
		glo_audioPlayer = null
	}
	glo_audioPlayer = plus.audio.createPlayer(url);
	glo_audioPlayer.play(function() {}, function(e) {})
}

/**
 * 检查网络连接
 */
function wainshow() {
    if (localStorage.getItem(localcacheName.method_netWorkType) == 'false') {
//      mui.toast("网络异常，请检查网络设置！");
		network.src = 'images/hjw_no_network.png';
    } else {
//  	mui.toast("网络正常");
		network.src = 'images/hjw_have_network.png';
    }
}

/**
 * 自动上报错误
 * 问题类型：0书柜端，1设备端，2手机端，3其它
 */
function uploadError(cellNo,userId,bookCode,probleminfo,codeText){
	var url = createAjaxURL(interface_name.method_report_problem_sys);
	var data = {
		bookShelfId: public_getBookShelfId(),
		cellNo:cellNo,
		userId:userId,
		bookCode: bookCode,
		probleminfo:probleminfo,
		codeText:codeText,
		problemType:0
	};
	util.encrypt.MD5Data(data);
	var success = function(response) {
		mui.toast(response.msg);
	};
	util.ajax.getJSONWaiting(url, data, success);
}

/**
 * 判断是否为数字
 * @param {Object} val
 */
function isNumber(val){
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)){
        return true;
    }else{
        return false;
    }
}

/*
 * click到的输入框,对其class进行添加
 */
function selectInput(wrapper, comClass, flowClass) {
	var inputs = doc.querySelectorAll("." + comClass);
	for(var i = 0; i < inputs.length; i++) {
		inputs[i].classList.remove(flowClass)
	}
	wrapper.classList.add(flowClass);
}

/*
 * 清除定时器
 */
function clearTimerTask() {
	if(countDown) {
		clearInterval(countDown)
	};
}

/**
 * 判断字符串是否存在于数组
 * @param {Object} stringToSearch
 * @param {Object} arrayToSearch
 */
function in_array(stringToSearch, arrayToSearch) {
	for(s = 0; s < arrayToSearch.length; s++) {
		thisEntry = arrayToSearch[s].toString();
		if(thisEntry == stringToSearch) {
			return true;
		}
	}
	return false;
}

/*
 * 加载轮播睡眠图
 */
function swipeSleepImgs(bigImgsUrls) {
	var bigList=doc.getElementById("slideshow")
	if(bigImgsUrls.length > 0) {
		bigList.innerHTML = "";
		bigImgCount = bigImgsUrls.length;
		for(var i = 0; i < bigImgsUrls.length; i++) {
			var newEle = doc.createElement("img");
			newEle.src = global_absoluteRoot + bigImgsUrls[i].ImgUrl;
			if(i == 0) {
				newEle.className = "active"
			};
			bigList.appendChild(newEle);
		}
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
		var slideon = setInterval(changeSlide, 20000);
	}
}