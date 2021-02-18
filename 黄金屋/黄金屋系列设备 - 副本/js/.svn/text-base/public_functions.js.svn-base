/**
 * 获取设备id
 */
function public_getBookShelfId() {
	return localStorage.getItem(localcacheName.method_shelfId) || "";
}

function public_getBookShelfNo() {
	return localStorage.getItem(localcacheName.method_shelfNo) || "";
}

function getbook_code(){
	return localStorage.getItem(localcacheName.method_book_code) || "";
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
			clearTimerTask();
			switch(type){
				case 1:
					history.go(-1);
					break;
				case 2:
					history.go(-2);
					break;
				case 3:
					history.go(-3);
					break;
				case 0:
					clearInterval(readIdentityState);
					history.go(-1);
					break;
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
			"borrow_read_bookcodes.html"
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
	setTimeout("tick()", 1000);
	showLocale(today);
}

function tick_borrow_return_device() {
	var today;
	today = new Date();
	now_time = showLocale(today).cur_time;
	document.getElementById("time_text").innerHTML = showLocale(today).cur_date + " " + now_time + " " + showLocale(today).cur_week;
	setTimeout("tick_borrow_return_device()", 1000);
	showLocale(today);
	wainshow();
}

/*
 * 播放语音
 */
function audioPlay(url) {
	glo_audioPlayer = plus.audio.createPlayer(url);
	glo_audioPlayer.play(function() {}, function(e) {})
}

/**
 * 检查网络连接
 */
function wainshow() {
    if (localStorage.getItem(localcacheName.method_netWorkType) == 'false') {
//      mui.toast("网络异常，请检查网络设置！");
		network.src = '../img/hjw_no_network.png';
    } else {
//  	mui.toast("网络正常");
		network.src = '../img/hjw_have_network.png';
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

///*
// * click到的输入框,对其class进行添加
// */
//function selectInput(wrapper, comClass, flowClass) {
//	var inputs = doc.querySelectorAll("." + comClass);
//	for(var i = 0; i < inputs.length; i++) {
//		inputs[i].classList.remove(flowClass)
//	}
//	wrapper.classList.add(flowClass);
//}

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


function formatDate(now) {
    var year = now.getYear() + 1900;
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date;
}