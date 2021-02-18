function tapHandler(obj, e) {
	var act = obj.getAttribute("data-action");
	switch(act) {
		case "openView":
			var webUrl = obj.getAttribute("data-view");
			index.openPage(webUrl);
			break;
		case "input_selected":
			showKeyboard();
			writeInput = obj;
			gb_beat(obj);
			inputType = $(obj).hasClass("compw");
			break;
		case "adminLogin":
			var name = getValue("adminName");
			var pw = getValue("adminPw");
			if(booleanData(name)) {
				M.toast("请输入用户名");
				return
			};
			if(booleanData(pw)) {
				M.toast("请输入用户密码");
				return
			}
			var url = MAIN_PATH_INT + "/shelf_manager_log_in";
			var data = {
				userName: name,
				password: pw
			}
			ajax(url, data, function(res) {
				switch(res.result) {
					case 1:
						localStorage.setItem(LS.adminId, res.userId);
						refreshDeviceNum();
						index.openPage("admin_home");
						break;
					case 0:
					case -1:
						M.toast(res.msg)
						break;
				}
			})
			break;
		case "submitDeviceNum":
			var deviceNum = getValue("deviceNum");
			if(booleanData(deviceNum)) {
				M.toast("请输入设备号");
				return;
			};
			var data = {
				id: public_getBookShelfId(),
				no: deviceNum,
				userId: localStorage.getItem(LS.adminId)
			};
			ajax(MAIN_PATH_INT + globalAjax.setDeviceNum, data, function(res) {		
				console.info(JSON.stringify(res));
				switch(res.result) {
					case 1:
						localStorage.setItem(LS.deviceNum, deviceNum);
						localStorage.setItem(LS.deviceId, res.id);
						localStorage.setItem(LS.deviceName, res.shelfName);
						localStorage.setItem(LS.payType,res.payType);
						refreshDeviceNum();
						index.back();
						break;
					case 0:
					case -1:
						M.toast(res.msg)
						break;
				}
			})
			break;
		case "removeBook":			
				M.later(function() {
					doc.getElementById("inputBookCode").focus();
				}, 300);
				var cell = obj.getAttribute("data-bookNumber");
//				removeBook(cell)
				waitSetBook(cell);
		     	break;
		case "switchType":
			var curPage = doc.getElementById("bookList_cur").innerText = 1;
			if(key_basket[0]) {
				key_basket[0].querySelector("a").classList.remove("on-book-type");
				key_basket = [];
			}
			key_basket.push(obj);
			key_basket[0].querySelector("a").className = "on-book-type";
			var typeId = key_basket[0].dataset.id
			getSellBookList(typeId);

			break;

		case "left_turn_bookList":
			var curPage = parseInt(getValue("bookList_cur"));
			var totalPage = parseInt(getValue("bookList_total"));
			curPage > 1 ? curPage-- : curPage = totalPage;
			doc.getElementById("bookList_cur").innerText = curPage;
			var typeId = key_basket[0].dataset.id;
			getSellBookList(typeId);
			break;
		case "right_turn_bookList":
			var curPage = parseInt(getValue("bookList_cur"));
			var totalPage = parseInt(getValue("bookList_total"));
			curPage < totalPage ? curPage++ : curPage = 1;
			doc.getElementById("bookList_cur").innerText = curPage;
			var typeId = key_basket[0].dataset.id;
			getSellBookList(typeId);
			break;
		case "left_turn_cellList":
			var curPage = parseInt(getValue("cellList_cur"));
			var totalPage = parseInt(getValue("cellList_total"));
			curPage > 1 ? curPage-- : curPage = totalPage;
			doc.getElementById("cellList_cur").innerText = curPage;
			getSellCellList()
			break;
		case "right_turn_cellList":
			var curPage = parseInt(getValue("cellList_cur"));
			var totalPage = parseInt(getValue("cellList_total"));
			curPage < totalPage ? curPage++ : curPage = 1;
			doc.getElementById("cellList_cur").innerText = curPage;
			getSellCellList()
			break;
		case "bookDetail":
			var bookId = obj.getAttribute("data-id");
			getBookInfo(bookId);
			break;
		case "submitBookIdByCell":
			var cellNum = getValue("inputCodeBookIdByCell");
		
			if(booleanData(cellNum)) {
				M.toast("请输入格口号");
				return
			}else if(!regStr(cellNum)){			
				M.toast("请输入正确格口号");
				return
			}
			var url = MAIN_PATH_INT + globalAjax.byCell;
			var data = {
				bookshelfId: public_getBookShelfId(),
				cell: '0' + cellNum
			}
			ajax(url, data, function(res) {
				var RMessage = res.msg;
				if(res.result == '1') {
					var bookId = res.bookId;
					getBookInfo(bookId);
				} else {
					M.toast(RMessage);
				}
			});
			break;

		case "confirmSuc":
			$(".pop").css("display", "none");
			index.openPage("sellbookList");
			break;
		case  "submitBinNums":
		    var s=getValue("startBinNum");
		    var e=getValue("endBinNum");
		    if(!regStr(s)){M.toast("请输入正确开始格口号");return};
		    if(!regStr(e)){M.toast("请输入正确结束格口号");return};
		    var s0 = parseInt(s);
			var e0 = parseInt(e);
			if(s0 > e0) {
					mui.toast("请按正确规则输入格口号");
					return;
				}
			openBox(s0, e0);
		    break;
		case "light":
		     var state=obj.getAttribute("data-state");
		         light_onOff(state);
		     break;
		case "reboot":
			public_reboot();
			break;
		case "closeApp":
	    	plus.runtime.quit();
			break;
		case "hiddenKey":
			hiddenKeyboard();
			break;
		case "clearKeyCss":
			clearLastKeyCss()
			break;
		case "keyboard":
			try {
				e.stopPropagation();
				clearLastKeyCss()
				changeCss(obj);
				keyboardOperation(writeInput, obj.getAttribute("data-value"));
			} catch(e) {
				alert(e)
				//TODO handle the exception
			}
			break;
		case "back":		   
		    switch(index.getActivePageId()){
		    	case "as_cell":
		    		index.openPage("sellbookList");
		    		break;
		    		case "sellbookList":		    
		    		index.openPage("index");
		    		break;
		    		default:
		    		index.back();
		    }			
			break;

	}
}

function public_getBookShelfId() {
	return localStorage.getItem(LS.deviceId) || "";
}

function public_getBookShelfNo() {
	return localStorage.getItem(LS.deviceNum) || "";
}

function public_getBookShelfName() {
	return localStorage.getItem(LS.deviceName) || "";
}

function refreshDeviceNum() {
	var objs = doc.getElementsByClassName("sellDeviceNum");
	for(var i = 0, len = objs.length; i < len; i++) {
		objs[i].innerText = public_getBookShelfNo();
	}
}

function refreshDeviceName() {
	var objs = doc.getElementsByClassName("sellDeviceName");
	for(var i = 0, len = objs.length; i < len; i++) {
		objs[i].innerText = public_getBookShelfName();
	}
}
function getValue(o) {
	return doc.getElementById(o).innerText;
}
/*
 * 首页轮播图片
 */
function IndexScrollImg() {
	var url = MAIN_PATH_INT + "/index";
	var success = function(response) {
		console.info(JSON.stringify(response))
		var imgsUrls = response.list;
		swipeIndexImgs("homeSwipeImgs", imgsUrls);
	}
	var data = {
		bookShelfId: public_getBookShelfId()
	}
	ajax(url, data, success);
}

function swipeIndexImgs(id, imgurls) {
	if(imgurls.length != 0) {
		var indexSlider = doc.getElementById(id);
		indexSlider.innerHTML = "";
		for(var i = 0; i < imgurls.length; i++) {
			var newElement = doc.createElement("div");
			newElement.className = "swiper-slide";
			var childElement = doc.createElement("img");
			childElement.src = imgurls[i].ImgUrl;

			childElement.style.width = "1080px";
			childElement.style.height = "750px";
			newElement.appendChild(childElement);
			indexSlider.appendChild(newElement)
		}

		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			speed: 1000,
			autoplay: {
				delay: 8000
			},
			effect: "fade"
		});
	}
}

function booleanData(data) {
	if(data == "" || data == undefined || data == null) {
		return true
	} else {
		return false
	}
}
/*
 * 教验是否是数字
 */
function regStr(str) {
	var reg = /^[0-9]+$/;
	return reg.test(str);
}
/*
 * 开启定时器
 */
function timerTask(time, boxId) {
	clearTimerTask();
	COUNT_DOWN = setInterval(function() {
		if(time > 0) {
			time--;
			doc.getElementById(boxId).innerText = time + "s";
		} else {
			index.openPage("index");
			clearTimerTask();
		}
	}, 1000);
}
/*
 * 清除定时器
 */
function clearTimerTask() {
	if(COUNT_DOWN) {
		clearInterval(COUNT_DOWN)
	};
}
function public_open(id,success) {
	var url = DEVICE_CTR+boxctrl.method_open;
	var data = {
		boxid: id
	};	
	ajaxNoMd5(url,data,function(res){
		success(res)
	})
}

function tick(s,e) {
	var today;
	today = new Date();
	doc.getElementById("date_week").innerHTML = showLocale(today).cur_date + '&nbsp;&nbsp;' + showLocale(today).cur_week;
	var now_time = showLocale(today).cur_time;
	doc.getElementById("date_time").innerHTML = now_time;
	var tic = setTimeout("tick()", 1000);
	showLocale(today);
	if(now_time == "00:30") {
		clearTimeout(tic);
		setTimeout(function() {
			mui.toast("1分钟后，程序将重启,如有操作请停止或快速完成，谢谢配合");
			plus.runtime.restart();
		}, 61 * 1000)
	};		
	if(now_time == s) { light_onOff(1)};
	if(now_time == e) { light_onOff(0)}
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

/*
 * 开关灯
 */
function light_onOff(state) {
	var url = DEVICE_CTR + boxctrl.method_lightOnOff;
	mui.ajaxSettings.beforeSend = function(xhr, setting) {
		//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
		console.log('beforeSend:::' + JSON.stringify(setting));
	};
	var data = {
		state: state
	};
	console.log(state)
	ajaxNoMd5(url,data,function(res){});	
}
function public_reboot(){
	var url = DEVICE_CTR+boxctrl.method_reboot;
	var data = {};	
	ajaxNoMd5(url,data,function(res){})
}
function lampPeriod(){
	url=MAIN_PATH_INT+globalAjax.lampPeriod;
	var data={bookShelfId:public_getBookShelfId()};
	ajaxNoMd5(url,data,function(res){
		console.log(JSON.stringify(res));
		var startLamp=res.start;
		var endLamp=res.end;
		tick(startLamp,endLamp);
	})
}

function openBox(s, e){	
	var url = DEVICE_CTR+boxctrl.method_open	
	var data = {boxid: s};		
	ajaxNoMd5(url,data,function(res){
		   s++;
    if(s<=e) openBox(s,e);            
	})
	
}

