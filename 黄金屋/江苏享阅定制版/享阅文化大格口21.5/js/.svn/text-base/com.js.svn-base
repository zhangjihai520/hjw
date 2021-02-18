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
/*
 * 睡眠图轮播方法
 */
function delayOperate() {
	isOperate = setTimeout(function() {
		if(index.getActivePageId() == "home") {
			index.openPage("slider");
		}
	}, SKIP_TIME)
};
/*
 * 开启定时器
 */
function timerTask(time, boxId) {
	clearTimerTask();
	countDown = setInterval(function() {
		if(time > 0) {
			time--;
			//			console.log(time);/
			doc.getElementById(boxId).innerText = time + "s";
		} else {
			clearTimerTask();
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
	var tic = setTimeout("tick()", 1000);
	showLocale(today);
	if(now_time == "00:30") {
		clearTimeout(tic);
		setTimeout(function() {			
			    mui.toast("1分钟后，程序将重启,如有操作请停止或快速完成，谢谢配合");					
				plus.runtime.restart();		
		},61 * 1000)
	}
}

function audioPlay(url) {
	glo_audioPlayer = plus.audio.createPlayer(url);
	glo_audioPlayer.play(function() {}, function(e) {})
}

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
		hiddenKeyboard()
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

function hiddenKeyboard() {
	rmgb();
	clearLastKeyCss()
	doc.getElementById("keyboardArea").style.display = "none"
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
		case "inputGridScope":

			writeInput = doc.querySelector(".public-focused-input-detection");
			break;
		case "changePassword":
			writeInput = doc.querySelector(".modify");
			break;
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

function rmgb() {
	$("img.gb").remove();
}

function addgb(dom) {
	dom.innerHTML += '<img  class="gb"  src="images/guangbiao.gif" alt="" />'
}

function bookTypeList(o) {
	glo_pageControllerBookList = new PageController(glo_countPerPageBookList)
};

function buildWebsocket(WSURL) {
	if("WebSocket" in window) {
		ws = new ReconnectingWebSocket("ws://" + WSURL + "/ws", null, {
			debug: true,
			reconnectInterval: 5000
		})
	} else {
		ws = new SockJS("http://" + WSURL + "/sockjs/ws")
	}
	ws.onopen = onOpen;
	ws.onmessage = onMessage;
	ws.onerror = onError;
	ws.onclose = onClose;

	function onOpen() {
		doc.getElementById("websocketState").innerText = "socket状态：" + "open";
		if(ws.readyState == SockJS.OPEN && public_getBookShelfNo() != "-") {
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
			case "force_update": //强制更新
				if(msgData.bookshelfId == public_getBookShelfId()) {
					var newVersionUrl = global_absoluteRoot + msgData.url;
					mui.toast("更新新版本……url:" + newVersionUrl);
					util.helper.openWindow("progressBar.html", newVersionUrl)
				};
				break;
			case "push_advert": //推送广告
				console.log(JSON.stringify(msgData));
				if(msgData.bookshelfId == public_getBookShelfId()) {
					var imgsUrls = msgData.list;
					swipeIndexImgs("homeSwipeImgs", imgsUrls);
					localStorage.setItem('adverType', msgData.adverType);
					if(msgData.adverType == '1') {
						slideshow.hidden = true;
						videoArea.hidden = false;
						var size = msgData.movieList.length - 1;
						var movieUrl = global_absoluteRoot + msgData.movieList[size].ImgUrl;
						var movieName = msgData.movieList[size].ImgUrl.substring(18,movieUrl.length);
						if(movieUrl != localStorage.getItem('movieUrl' + version)) {
							localStorage.setItem('movieUrl' + version, movieUrl);
							localStorage.setItem('movieName' + version, movieName);
							util.helper.downloadNewMovie(movieUrl, movieName,function(data) {
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
				if(msgData.bookshelfId == public_getBookShelfId()) {
					if(msgData.userId) {
						OPEN_PERSON = msgData.userId;
						OPEN_CELLNUM = msgData.cellNo;
						index.openPage("get_book_success");
						localStorage.setItem('openType','borrow');
					} else {
						public_open(msgData.cellNo, function() {
							mui.toast("管理员远程打开" + msgData.cellNo + "成功")
						})
					}
				}
				break;
			case "lightOnOff":
				if(msgData.bookshelfId == public_getBookShelfId()) {
					public_light(msgData.state);
				}
				break;
			case "reboot":
				if(msgData.bookshelfId == public_getBookShelfId()) {
					public_reboot();
				}
			case "rebootapp":
				plus.runtime.restart();
				break;
			default:
				console.log(msgData.modeCode)
		}
	}

	function onError() {
		doc.getElementById("websocketState").innerText = "socket状态：" + "error";
		//						console.log("error")
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
				glo_pageControllerBookList = new PageController(glo_countPerPageBookList);
				book_list_getBookList();
				break;
			case "openWebview":
				index.openPage(wrapperDataset.webview);
				break;
			case "back":
				console.log("a")
				index.back();
				break;
			case "gotFocus":
				switch(index.getActivePageId()) {
					case "return_book":
						mui.later(function() {
							doc.getElementById("inputBookCodeReturnBook").focus()
						}, 300);
						break;
				}
				break;
			case "backspaceShelfNo":
				public_backspace(doc.getElementById("inputCodeSetShelfNo"));
				break;
			case "bookDetail":
				_localStorage.setItem(global_localStorage.bookId, wrapperDataset.id);
				_localStorage.setItem(global_localStorage.reserveCode, "");
				index.openPage("book_detail");
				break;
			case "bookSearch":
				search_getBookList();
				try {
					e.stopPropagation();
					showKeyBoard();
				} catch(e) {
					alert(e)
				}
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
			case "changePasswordSubmit":
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
//				book_list_displayTypes();
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
				inputType = wrapperDataset.type;
				addgb(wrapper);
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

				login_setSelectInput(wrapper);
				try {
					e.stopPropagation();
					showKeyBoard();
				} catch(e) {
					alert(e)
				}
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
			case "nextPageCellList":
				glo_pageControllerCellList.nextPage();
				cell_list_getCellList();
				break;
			case "open":
				//格口列别开门

				if(cell_list_isRemoveBookOk()) {
					public_open(wrapperDataset.id, function(openResult) {
						if(openResult.success) {
							cell_list_setCellState(wrapper, global_doorState.OPEN);
							glo_checkDoorStateIntervalCellList && clearInterval(glo_checkDoorStateIntervalCellList);
							glo_checkDoorStateIntervalCellList = setInterval(function() {
								public_status(wrapperDataset.id, function(statusResult) {
									if(statusResult.data == "closed") {
										if(glo_checkDoorStateIntervalCellList) clearInterval(glo_checkDoorStateIntervalCellList);
										cell_list_setCellState(wrapper, global_doorState.OCCUPIED, "");
										public_getBooksInCell(wrapperDataset.id, function(getBooksResponse) {
											if(getBooksResponse.success == true) {
												cell_list_managerCloseDoor(wrapperDataset.id, getBooksResponse.data);
											} else {
												mui.toast("读取格口失败")
											}
											flagCtrl = 1;
										})
									}
								})
							}, 2000)
						} else {
//							mui.alert(openResult.data, global_stringObject.project, null)
						}
					})
				}
				break;

			case "previousPageBookList":
				glo_pageControllerBookList.previousPage();
				book_list_getBookList();
				break;
			case "previousPageCellList":
				glo_pageControllerCellList.previousPage();
				cell_list_getCellList();
				break;
			case "reboot":
				public_reboot();
				break;
			case "closeApp":
				plus.runtime.quit();
				break;
			case "selectProblem":
				report_problems_selectProblem(wrapper);
				break;
			case "submitBookDetail":
				rmgb();
				book_detail_setData(submit_data_bookDetail);
				if(book_detail_isSubmitOk(submit_data_bookDetail)) {
					book_detail_submit(submit_data_bookDetail);
				}
				break;
			case "submitGetBookIdByCell":
				rmgb();
				submit_code_get_book_id_by_cell = doc.getElementById("inputCodeGetBookIdByCell").innerHTML;
				if(get_book_id_by_cell_isSubmitOk()) {
					get_book_id_by_cell_submit(submit_code_get_book_id_by_cell);
				}
				break;
			case "submitInputCode":
				rmgb();
				input_code_setData();
				if(input_code_isSubmitOk()) {
					input_code_submit();
				}
				break;
			case "submitLogin":
				rmgb();
				login_setData(submit_data_login);
				if(login_isSubmitOk(submit_data_login)) {
					login_submit(submit_data_login)
				} else {
					if(glo_TimeCountDownInterval) {
						clearInterval(glo_TimeCountDownInterval)
					}
					TimeCountDown("gl_time_cw", 60);
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
				set_shelf_no_setData(submit_data_shelfNo);
				if(set_shelf_no_isSubmitOk(submit_data_shelfNo)) {
					set_shelf_no_submit(submit_data_shelfNo)
				}
				break;
			case "switchType":
//				book_list_displayTypes();
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
				glo_pageControllerBookList.currentPage=1;
				book_list_getBookList();
				break;
			case "detection_submit":
				doc.getElementById("detectionScrollArea").innerHTML = "";
				var first = parseInt(doc.getElementById("firstShelfSymbol").innerText.trim()),
					last = parseInt(doc.getElementById("lastShelfSymbol").innerText.trim());
				if(first > last || isNaN(first) || isNaN(last) || first <= 0 || last > 48 || first > 48) {
					mui.toast("请正确输入查询格口号");
					return;
				}
				var $BookItem = $('<a href="javascript:void(0)" onclick="doSomething(this)" ></a>');
				doSomething($BookItem);

				function doSomething() {
					index.back();
				}
				doc.getElementById("firstGird").value = first;
				doc.getElementById("lastGrid").value = last;
				var ol = doc.getElementById("detectionScrollArea");
				for(var i = first; i <= last; i++) {
					var li = doc.createElement("li");
					ol.appendChild(li);
					var span = doc.createElement("span");
					if(i < 10) {
						span.innerHTML = '0' + i;
					} else {
						span.innerHTML = i;
					}
					li.appendChild(span);
					var dl = doc.createElement("dl");
					dl.setAttribute("id", "dl_" + i);
					li.appendChild(dl);
				}
				getCellsNames();
				var detectionTotal = 0; //统计全部书本总数
				function getCellsNames() {
					public_getBooksInCell2(first, function(getBooksResponse) {
						if(getBooksResponse.success == true) {
							var bookArr = getBooksResponse.data;
							var bookCodes = bookArr.join(",");
							detectionTotal += bookArr.length;
							doc.getElementById("detectionTotal").innerHTML = "总计<a>" + detectionTotal + "</a>本";
							public_gridTesting(first, bookCodes, function(data, gridnum) {
								var detectionItemResult = {
									gridNum: first,
									gridTestingResult: data.bookCodes_cv,
									booksInSysReult: data.bookCodes_lg
								};
								var dl = doc.getElementById("dl_" + detectionItemResult.gridNum);
								dl.innerHTML = createDetectionScrollHtml(detectionItemResult.gridTestingResult);
								first++;
								if(first <= last) {
									getCellsNames();
								}
							})
						} else {
							console.log(0);
						}
					})
				}
				$(doc.getElementById("firstShelfSymbol")).empty();
				$(doc.getElementById("lastShelfSymbol")).empty();
				break;
			case "Symbol":
				rmgb();
				inputType = wrapperDataset.type;
				addgb(wrapper);
				shelfSymbol_setSelectInput(wrapper);
				try {
					e.cancelBubble = true;
					e.stopPropagation();
					showKeyBoard();
				} catch(e) {
					alert(e)
				}
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
					changeCss(wrapper);
					keyboardOperation(writeInput, wrapperDataset.value);
				} catch(e) {
					//TODO handle the exception
				}
				break;
		}
	}
}

function openWhitchDoor(boxnum, userId) {
	public_open(boxnum, function(response) {
		if(response.success) {
			if(glo_cellStateIntervalGetBookSuccess) {
				clearInterval(glo_cellStateIntervalGetBookSuccess);
			}
			glo_cellStateIntervalGetBookSuccess = setInterval(function() {
				public_status(boxnum, function(response) {
					if(response.data == "closed") {
						public_getBooksInCell(boxnum, function(getBooksResponse) {
							if(getBooksResponse.success == true) {
								if(glo_cellStateIntervalGetBookSuccess) {
									clearInterval(glo_cellStateIntervalGetBookSuccess);
								}
								try{
									get_book_success_userCloseDoor(boxnum, userId, getBooksResponse.data);
								}catch(e){
									get_book_success_userCloseDoor(boxnum, userId, '');
								}
								
							} else {
								mui.toast("读取格口失败");
							}
						});
					}
				});
			}, 2000);
		} else {
			mui.toast('开门失败', {
				duration: 'long',
				type: 'div'
			});
			index.goHome();
		}
	});
}
function checkout(data){
	if(data==""||data==undefined||data==null){
		return true;
	}else{
		return false;
	}
}
