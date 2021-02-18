function regStr(str) {
	var reg = /^[0-9]+$/;
	return reg.test(str);
}
/*
 * 播放语音
 */
function audioPlay(url) {
	glo_audioPlayer = plus.audio.createPlayer(url);
	glo_audioPlayer.play(function() {}, function(e) {})
}

function delayOperate() {
	isOperate = setTimeout(function() {
		index.openPage("slider");
	}, SKIP_TIME)
};
/*
 * 首页轮播图片
 */
function swipeIndexImgs(imgurls) {
	var indexSlider = doc.getElementById("list");
	indexSlider.innerHTML = "";
	for(var i = 0; i < imgurls.length; i++) {
		var newElement = document.createElement("div");
		newElement.className = 'swiper-slide';
		var childElement = doc.createElement("img");
		childElement.src = global_absoluteRoot + imgurls[i].ImgUrl;
		childElement.style.width = "1080px";
		childElement.style.height = "750px";
		newElement.appendChild(childElement)
		indexSlider.appendChild(newElement);
	}
	indexSlide();
}

function indexSlide() {
	var mySwiper = new Swiper(".swiper-container", {
		initialSlide: 0,
		direction: "horizontal",
		speed: 1000,
		delay:5000,
		loop: true,
		autoplayDisableOnInteraction: false,
		autoHeight: true,
		observer: true,
		observeParents:true
	})
	mySwiper.autoplay.stop();
	mySwiper.autoplay.start();
}
/*
 * 加载轮播睡眠图
 */
function swipeSleepImgs(bigImgsUrls) {
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
 * 刷新设备号
 */
function refleshShelfNum() {
	var deviceNums = doc.querySelectorAll(".shelf-no");
	for(var i = 0; i < deviceNums.length; i++) {
		deviceNums[i].innerText = public_getBookShelfNo();
	}
}
/*
 * 提交的参数Data赋值
 */
function setSubmitData(prefixClass, data) {
	//prefixClass前缀class
	for(var pro in data) {
		data[pro].value = doc.querySelector("." + prefixClass + pro).innerText.trim();
	}

}
/*
 * 初始化输入框的值,数据全部清空
 */
function InputDataClear(prefixClass, data) {
	for(var pro in data) {
		$("." + prefixClass + pro).empty();
		data[pro].value = "";
	}
}
/*
 * 判断Data是否ok
 */
function isSubmitDataOK(data) {
	for(var pro in data) {
		if(data[pro].value.length < 1) {
			mui.toast("请输入" + data[pro].text);
			return
		}
	}
}
/*
 * 管理员登录
 */
function login_submit(data) {
	var ao = global_ajaxObject.user;
	var url = util.str.createAjaxURL(ao, ao.method_shelf_manager_log_in);
	var submitData = {
		userName: data.userName.value,
		password: data.password.value
	}
	util.encrypt.MD5Data(submitData);
	var success = function(response) {
		switch(response.result) {
			case global_ajaxResult.SUCCESS:
				localStorage.setItem(global_localStorage.userId, response.userId);
				index.openPage("manager_home");
				break;
			case global_ajaxResult.FAILED:
			case global_ajaxResult.SIGN_ERROR:
				mui.toast(response.msg);
				break;
		}
	};
	util.ajax.getJSONWaiting(url, submitData, success);
}
/*
 * 设置设备号，通过设备号获取设备Id
 */
function setShelfId(deviceNum) {
	var ao = global_ajaxObject.setting;
	var url = util.str.createAjaxURL(ao, ao.method_set_shelf_id);
	console.log(url);
	var data = {
		id: public_getBookShelfId(),
		no: deviceNum,
		userId: localStorage.getItem(global_localStorage.userId)
	};
	util.encrypt.MD5Data(data);
	var success = function(response) {
		mui.toast(response.msg, {
			duration: 'long',
			type: 'div'
		});
		switch(response.result) {
			case global_ajaxResult.SUCCESS:
				localStorage.setItem(global_localStorage.shelfNo, deviceNum);
				localStorage.setItem(global_localStorage.shelfId, response.id);
				refleshShelfNum();
				mui.toast("设备即将重启，请稍后……");
				setTimeout(function() {
					_m.plusReady(function() {
						plus.runtime.restart();
					})
				}, 2000)
				break;
			case global_ajaxResult.FAILED:
			case global_ajaxResult.SIGN_ERROR:
				mui.toast(response.msg);
				break;
		}
	};
	util.ajax.getJSONWaiting(url, data, success);
}

function show_borrow_return_content(obj, bookName, cellNum,openType) {
	if(obj.type) {
		audioPlay("audio/borrow_book.mp3");
	} else {
		audioPlay("audio/return_book.mp3");
		doc.getElementById("inputBookCodeReturnBook").value = "";
	}
	if(openType == 'borrow'){
		document.getElementById('openDoorBtn').hidden = false;
	}else{
		document.getElementById('openDoorBtn').hidden = true;
	}
	doc.getElementById("operateFinishType").innerText = obj.text1;
	doc.getElementById("whatDo").innerText = obj.text2;
	doc.getElementById("whatBook_name").innerText = bookName;
	doc.getElementById("suc_gm").innerText = cellNum + "号柜门";
	openDoorMore = cellNum;
	index.openPage("get_book_success");
}
/*
 * 开启定时器
 */
function timerTask(time, boxId) {
	clearTimerTask();
	countDown = setInterval(function() {
		if(time > 0) {
			time--;
			doc.getElementById(boxId).innerText = time + "s";
		} else {
			index.openPage("home");
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
	doc.getElementById("localweek").innerHTML = showLocale(today).cur_week;
	now_time = showLocale(today).cur_time;
	doc.getElementById("localtime").innerHTML = now_time;
	doc.getElementById("localdate").innerHTML = showLocale(today).cur_date;
	setTimeout("tick()", 1000);
	showLocale(today)
}

/*
 * 开关灯
 */
function light_onOff(state) {
	//var ao = global_ajaxObject.boxctrl;
	var url = 'http://127.0.0.1:18001/' + global_ajaxObject.boxctrl.method_lightOnOff;
	var success = function(response) {};
	mui.ajaxSettings.beforeSend = function(xhr, setting) {
		//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
		console.log('beforeSend:::' + JSON.stringify(setting));
	};
	var data = {
		state: state
	};
	mui.ajax(url, {
		data: data,
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 120000, //超时时间设置为10秒；
		success: function(response) {
			success(response);
		},
		error: function(xhr, type, errorThrown) {
			//mui.toast("连接超时，打开柜门失败");
		}
	});
}
/*
 * 手势翻页
 */
function swipe(swipeId) {
	var mybody = doc.getElementById(swipeId);
	mybody.addEventListener('touchstart', touchMethod, false);
	mybody.addEventListener('touchend', touchMethod, false);
}

function touchMethod(e) {
	e.preventDefault();
	console.log(e.type)
	switch(e.type) {
		case "touchstart":
			startX = e.touches[0].pageX;
			startY = e.touches[0].pageY;
			break;
		case "touchend":
			moveEndX = e.changedTouches[0].pageX;
			moveEndY = e.changedTouches[0].pageY;
			X = moveEndX - startX;
			Y = moveEndY - startY;
			if(Math.abs(X) > Math.abs(Y) && X > 0 && Math.abs(X) > MOVELEN) {
				console.log("向右");
				glo_pageControllerBookList.previousPage();
				book_list_getBookList();
			} else if(Math.abs(X) > Math.abs(Y) && X < 0 && Math.abs(X) > MOVELEN) {
				console.log("向左");
				glo_pageControllerBookList.nextPage();
				book_list_getBookList();
			} else if(Math.abs(Y) > Math.abs(X) && Y > 0 && Math.abs(Y) > MOVELEN) {

				console.log("向下");

			} else if(Math.abs(Y) > Math.abs(X) && Y < 0 && Math.abs(Y) > MOVELEN) {
				console.log("向上");
			} else {
				console.log("没滑动");
			}
			break;
	}
}

/*
 * keyboard
 */
function keyboardOperation(writeInput, keyboardValue) {
	if(keyboardValue == "backspace") {
		rmgb();
		if(writeInput.classList.contains("compw")) {
			var childs = writeInput.childNodes;
			if(childs.length > 0) {
				writeInput.removeChild(childs[childs.length - 1])
			};
			writeInput.innerHTML += '<img  class="gb"  src="images/guangbiao.gif" alt="" />';
		} else {
			writeInput.innerHTML = (writeInput.innerHTML).substring(0, (writeInput.innerHTML).length - 1) + '<img  class="gb"  src="images/guangbiao.gif" alt="" />';
		}

	} else if(keyboardValue == "packUp") {
		hiddenKeyboard();
	} else {
		rmgb();
		switch(inputType) {
			case "0":
				writeInput.innerHTML += keyboardValue + '<img  class="gb"  src="images/guangbiao.gif" alt="" />'
				break;
			case "1":
				writeInput.innerHTML += '<span class="fakepw">' + keyboardValue + '</span>' + '<img  class="gb"  src="images/guangbiao.gif" alt="" />';
				break;
		}
	}
}

function showKeyBoard() {
	doc.getElementById("keyboardArea").style.display = "block";
	switch(index.getActivePageId()) {
		case "login":
			writeInput = doc.querySelector(".public-focused-input-login");
			break;
		case "login_student":
			writeInput = doc.querySelector(".public-focused-input-login-student");
			break;
		case "get_book_id_by_cell":
			writeInput = doc.getElementById("inputCodeGetBookIdByCell");
			break;
		case "input_code":
			writeInput = doc.getElementById("inputCodeInputCode");
			break;
		case "search":
			writeInput = doc.getElementById("inputBookSearch");
			break;
		case "set_shelf_no":
			writeInput = doc.querySelector(".public-focused-setShief-input");
			break;
		case "book_detail":
			writeInput = doc.querySelector(".public-focused-input-book-detail");
			break;
		case "changePassword":
			writeInput = doc.querySelector(".modify");
			break;
		default:
			alert(writeInput);
	}
}

function changeCss(o) {
	key_basket.push(o)
	o.style.backgroundColor = "red";
}

function clearLastKeyCss() {
	if(key_basket.length != 0) {
		key_basket[0].style.backgroundColor = "#4C5B78"
		key_basket = [];
	}
}

function bookTypeList(o) {
	glo_pageControllerBookList = new PageController(glo_countPerPageBookList)
};

function rmgb() {
	$("img.gb").remove();
}

function addgb(dom) {
	dom.innerHTML += '<img  class="gb"  src="images/guangbiao.gif" alt=""/>'
}

function hiddenKeyboard() {
	rmgb();
	clearLastKeyCss()
	doc.getElementById("keyboardArea").style.display = "none"
}

function CompareTime(t1, t2) {
	var date = new Date();
	var a = t1.split(":");
	var b = t2.split(":");
	return date.setHours(a[0], a[1]) > date.setHours(b[0], b[1])
}
/*
 * webSocket
 */

function buildWebSocket(wsurl) {
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
		doc.getElementById("websocketState").innerText = "socket状态：" + "open";
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
				if(msgData.result == 1) {
					doc.getElementById("shelfName").innerHTML = msgData.shelfName;
					// 创建二维码，验证码取书界面
					var qrcodeStr = msgData.shelf_QR;
					$("#bookshelf_QR").empty();
					qrcodeMethod("bookshelf_QR", 242, 242, qrcodeStr);
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
							util.helper.openWindow("progressBar.html", newVersionUrl)
						}
					});
				}
				break;
			case "force_update":
				if(msgData.bookshelfId == public_getBookShelfId()) {
					mui.toast("刷新版本……");
					var newVersionUrl = global_absoluteRoot + msgData.url;
					util.helper.openWindow("progressBar.html", newVersionUrl)
				}
				break;
			case "push_advert":
				console.log(JSON.stringify(msgData));
				if(msgData.bookshelfId == public_getBookShelfId()) {
					imgsUrls = msgData.list;
					swipeIndexImgs(imgsUrls);
					localStorage.setItem('adverType', msgData.adverType);
					if(msgData.adverType == '1') {
						var size = msgData.movieList.length - 1;
						var movieUrl = global_absoluteRoot + msgData.movieList[size].ImgUrl;
						var movieName = msgData.movieList[size].ImgUrl.substring(18,movieUrl.length);
						console.log(movieUrl + '---' + localStorage.getItem('movieUrl' + version));
						if(movieUrl != localStorage.getItem('movieUrl' + version)) {
							slideshow.hidden = true;
							videoArea.hidden = false;
							localStorage.setItem('movieUrl' + version, movieUrl);
							localStorage.setItem('movieName' + version, movieName);
							var fileurl = "_www/video/" + movieName;
							console.log(fileurl);
							util.helper.downloadNewVersion(movieUrl,fileurl ,function(data) {
								mui.toast('保存成功');
							});
						}
					} else {
						videoArea.hidden = true;
						slideshow.hidden = false;
						var bigImgsUrls = msgData.bigList;
						swipeSleepImgs(bigImgsUrls);
					}
				}
				break;
			case "openDoor":
				//	cellNo 	 	string				柜门号
				//	userId 		stirng/number 		借书人id				
				if(msgData.bookshelfId == public_getBookShelfId()) {
					
					if(msgData.userId) {
						public_open(msgData.cellNo, function(data) {
							try {
								show_borrow_return_content(borrow_return_data.borrowBook, msgData.bookName, msgData.cellNo,'borrow');
							} catch(e) {
								alert(e)
								//TODO handle the exception
							}
						})
					} else {
						public_open(msgData.cellNo, function() {
							mui.toast("远程打开" + msgData.cellNo + "成功")
						})
					}
				}
				break;
			case "lightOnOff":
				if(msgData.bookshelfId == public_getBookShelfId()) {
					light_onOff(msgData.state);
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
		doc.getElementById("websocketState").innerText = "socket状态：" + "error";
	}

	function onClose() {
		doc.getElementById("websocketState").innerText = "socket状态：" + "close";
		//						console.log("close")
	}
}

function tapHandler(obj, e) {
	var target = obj[0];
	var wrapper = target;
	if(wrapper) {
		var _localStorage = localStorage,
			wrapperDataset = wrapper.dataset,
			element, focusedInput, prop;
		switch(wrapperDataset.action) {
			case "allTypes":
				var types = doc.getElementById("ulBookType").children,
					item;
				for(var i = 0, len = types.length; i < len; i++) {
					item = types[i];
					if(item == wrapper) {
						item.querySelector("a").className = "on-book-type"
					} else {
						item.querySelector("a").classList.remove("on-book-type")
					}
				}
				book_list_getBookList();
				break;
			case "back":
				index.back();
				break;
			case "bookDetail":
				bookDetailId = wrapperDataset.id;
				index.openPage("book_detail");
				break;
			case "bookSearch":
				search_getBookList();
				break;
			case "searchInput":
				rmgb();
				addgb(wrapper);
				inputType = "0";
				try {
					e.stopPropagation();
					showKeyBoard();
				} catch(e) {
					alert(e)
				}
				break;
			case "detailHelp":
				_localStorage.setItem(global_localStorage.helpId, wrapperDataset.id);
				index.openPage("help_detail");
				break;
			case "changePassword":
				index.openPage("changePassword");
				break;
			case "changePasswordSubmit":
				timerTask(changePassword_countTime, "changePassword_countDown");
				rmgb();
				changePw_setData(submit_data_changePw);
				changePw_isSubmitOk(submit_data_changePw);
				if(submit_data_changePw.newPassword.value != submit_data_changePw.confirmPassword.value) {
					mui.toast("确认输入密码和新密码不一致！")
				}
				changePw_submit(submit_data_changePw);
				break;
			case "displayTypes":
				wrapper.classList.toggle("open-book-type");
				book_list_displayTypes();
				break;
			case "home":
				index.goHome();
				break;
			case "inputGetBookIdByCell":
				inputType = wrapperDataset.type;
				rmgb();
				addgb(wrapper);
				try {
					e.stopPropagation();
					showKeyBoard();
				} catch(e) {
					alert(e)
				}
				break;
			case "inputInputCode":
				rmgb();
				addgb(wrapper);
				inputType = wrapperDataset.type;

				try {
					e.stopPropagation();
					showKeyBoard();
				} catch(e) {
					alert(e)
				}
				break;
			case "inputLogin":
				focusedInput = doc.querySelector(".public-focused-input-login");
				focusedInput.value += wrapperDataset.value;
				break;
			case "inputSelectBookDetail":
				inputType = wrapperDataset.type;
				rmgb();
				addgb(wrapper);
				book_detail_setSelectInput(wrapper);
				try {
					e.stopPropagation();
					showKeyBoard();
				} catch(e) {
					alert(e)
					//TODO handle the exception
				}
				break;
			case "inputSelectLogin":
				rmgb();
				inputType = wrapperDataset.type;
				addgb(wrapper);
				selectInput(wrapper, "app-input-login", "public-focused-input-login");
				try {
					e.stopPropagation();
					showKeyBoard();
				} catch(e) {
					alert(e)
					//TODO handle the exception
				}
				break;
			case "submitLogin":
				rmgb();
				setSubmitData("login-value-", submit_data);
				isSubmitDataOK(submit_data);
				login_submit(submit_data);
				break;
			case "inputSelectLoginStudent":
				rmgb();
				addgb(wrapper);
				inputType = wrapperDataset.type;
				login_student_setSelectInput(wrapper);
				try {
					e.stopPropagation();
					showKeyBoard();
				} catch(e) {
					alert(e)
				}
				break;
			case "inputShelfNo":
				rmgb();
				inputType = "0";
				addgb(wrapper);
				try {
					e.stopPropagation();
					showKeyBoard();
				} catch(e) {
					alert(e)
					//TODO handle the exception
				}
				break;
			case "nextPageBookList":
				glo_pageControllerBookList.nextPage();
				book_list_getBookList();
				break;
			case "cellList_retreat":
				cellListPageController.previousPage();
				cell_list_getCellList();
				break;
			case "cellList_forward":
				cellListPageController.nextPage();
				cell_list_getCellList();
				break;
			case "open":
				if(cell_list_isRemoveBookOk()) {
					public_open(wrapperDataset.id, function(openResult) {
						if(openResult.success) {
							cell_list_setCellState(wrapper, global_doorState.OPEN);
							glo_checkDoorStateIntervalCellList && clearInterval(glo_checkDoorStateIntervalCellList);
							glo_checkDoorStateIntervalCellList = setInterval(function() {
								public_status(wrapperDataset.id, function(statusResult) {
									if(statusResult.data == "closed") {
										clearInterval(glo_checkDoorStateIntervalCellList);
										cell_list_setCellState(wrapper, global_doorState.OCCUPIED, "");
										public_getBooksInCell(wrapperDataset.id, function(getBooksResponse) {
											if(getBooksResponse.success == true) {
												cell_list_managerCloseDoor(wrapperDataset.id, getBooksResponse.data)
											} else {
												mui.toast("读取格口失败")
											}
										})
									}
								})
							}, 2000)
						} else {
							mui.alert(openResult.data, global_stringObject.project, null)
						}
					})
				}
				break;
			case "openNewWebview":
				if(wrapperDataset.executable != "false") {
					wrapperDataset.executable = "false";
					var webview = wrapperDataset.webview;
					if(webview) {
						if(wrapperDataset.actiontype) {
							_localStorage.setItem(global_localStorage.actionType, global_actionType[wrapperDataset.actiontype])
						}
						util.helper.openWindow(webview)
					}
					glo_tappedElement = wrapper
				}
				break;
			case "openWebview":
				if(wrapperDataset.type) {
					inputType = wrapperDataset.type
				}
				index.openPage(wrapperDataset.webview);
				break;
			case "previousPageBookList":
				glo_pageControllerBookList.previousPage();
				book_list_getBookList();
				break;
			case "reboot":
				public_reboot();
				break;
			case "closeApp":
				plus.runtime.quit();
				break;
			case "manualUpdate":
				util.helper.checkUpdate();
				break;
			case "selectProblem":
				report_problems_selectProblem(wrapper);
				break;
			case "submitBookDetail":
				rmgb();
				timerTask(bookDetail_countTime, "bookDetail_time");
				book_detail_setData(submit_data_bookDetail);
				if(book_detail_isSubmitOk(submit_data_bookDetail)) {
					book_detail_submit(submit_data_bookDetail);
				}
				break;
			case "submitGetBookIdByCell":
				rmgb();
				var submit_code_get_book_id_by_cell = doc.getElementById("inputCodeGetBookIdByCell").innerText;
				if(submit_code_get_book_id_by_cell.length > 0 && regStr(submit_code_get_book_id_by_cell)) {
					get_book_id_by_cell_submit(submit_code_get_book_id_by_cell);
				} else {
					mui.toast("请输入正确的格口号");
				}
				break;
			case "submitInputCode":
				timerTask(inputCode_countDown, "inputCode_countDown");
				rmgb();
				submit_code_input_code = doc.getElementById("inputCodeInputCode").innerText;
				if(input_code_isSubmitOk()) {
					input_code_submit()
				}
				break;

			case "submitLoginStudent":
				rmgb();
				login_student_setData(submit_data_login_student);
				if(login_student_isSubmitOk(submit_data_login_student)) {
					login_student_submit(submit_data_login_student)
				}
				break;
			case "submitReportProblems":
				report_problems_setData(submit_data_report_problems);
				if(report_problems_isSubmitOk(submit_data_report_problems)) {
					report_problems_submit(submit_data_report_problems)
				}
				break;
			case "submitShelfNo":
				rmgb();
				setSubmitData("device-", submit_deviceNum);
				isSubmitDataOK(submit_deviceNum);
				setShelfId(submit_deviceNum.num.value);
				break;
			case "switchType":
				book_list_displayTypes();
				var types = doc.getElementById("ulBookType").children,
					item;
				for(var i = 0, len = types.length; i < len; i++) {
					item = types[i];
					if(item == wrapper) {
						item.querySelector("a").className = "on-book-type"
					} else {
						item.querySelector("a").classList.remove("on-book-type")
					}
				}
				glo_pageControllerBookList = new PageController(glo_countPerPageBookList);
				book_list_getBookList();
				break;
			case "changeActive":
				try {
					e.stopPropagation();
					changePw_setSelectInput(wrapper);
					showKeyBoard();
				} catch(e) {
					alert(e)
				}
				rmgb();

				inputType = wrapperDataset.type;

				addgb(wrapper);
				break;
			case "putBook":
				putBook(doc.getElementById("manualInput").value.trim());
				break;
			case "removeBook":
				doc.getElementById("inputBookCode").focus();
				if(isRemoveBookOk()) {
					removeBook(wrapper);
				}
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
					clearLastKeyCss();
					changeCss(wrapper);
					keyboardOperation(writeInput, wrapperDataset.value);
				} catch(e) {
					alert(e)
					//TODO handle the exception
				}
				break;
			case "openDoor":
				public_open(openDoorMore, function() {
					mui.toast("开门成功")
				})
				break;
		}
	}
}

function qrcodeMethod(id, w, h, text) {
	var qrcode = new QRCode(id, {
		text: text,
		width: w,
		height: h,
		colorDark: '#3290c1',
		colorLight: '#ffffff',
		correctLevel: QRCode.CorrectLevel.H
	});

}

/**
 *  删除文件(文件夹)
 * @param {Object} path
 */
function deleteFile(path) {
	var File = plus.android.importClass("java.io.File");
	var fd = new File(path);
	if(fd != null && fd.exists()) {
		fd.delete();
	}
}