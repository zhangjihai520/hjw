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
		if(public_getBookShelfNo() != "") {
			var msg = {
				"modeCode": "shelf_login",
				"shelfNo": public_getBookShelfNo(),
				"apkVersion":version
			};
			ws.send(JSON.stringify(msg))
		}
	}

	function onMessage(e) {
		var msgData = JSON.parse(e.data);
		console.log(JSON.stringify(msgData));
		switch(msgData.modeCode) {
			case "shelf_login":
				if(msgData.result == 1) {
					doc.getElementById("shelfName").innerHTML = msgData.shelfName;
					// 创建二维码，验证码取书界面
					localStorage.setItem(localcacheName.method_shelf_Name, msgData.shelfName);
					localStorage.setItem(localcacheName.method_shelf_QR, msgData.shelf_QR);
					localStorage.setItem(localcacheName.method_orgQrCodeUrl,msgData.orgQrCodeUrl);
					localStorage.setItem(localcacheName.method_start_Light, msgData.lightStart);
					localStorage.setItem(localcacheName.method_end_Light, msgData.lightEnd);
				} else {
					mui.toast("请使用前，先绑定设备号")
				}
				break;
			case "update_program":
				console.log(JSON.stringify(msgData));			
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
					util.helper.openWindow("progressBar.html", newVersionUrl)
				}
				break;
			case "push_advert":
				console.log(JSON.stringify(msgData));
				if(msgData.bookshelfId == public_getBookShelfId()) {
					localStorage.setItem('adverType',msgData.adverType);
					if(msgData.adverType == '1'){
						var size = msgData.movieList.length - 1;
						var movieUrl = global_absoluteRoot + msgData.movieList[size].ImgUrl;
						var movieName = msgData.movieList[size].ImgUrl.substring(18,movieUrl.length);
						if(movieUrl != localStorage.getItem('movieUrl' + version)){
							console.log(movieUrl);
							localStorage.setItem('movieUrl' + version, movieUrl);
							localStorage.setItem('movieName' + version, movieName);
							util.helper.downloadNewVedio(movieUrl,movieName,function(data) {
								mui.toast('保存成功');
							});
						}
					}else{
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
						localStorage.setItem(localcacheName.method_borrow_user_id, msgData.userId);
						clearTimerTask();
						public_open(msgData.cellNo, function(data) {
							try {
								localStorage.setItem('openType', 'borrowBook');
								localStorage.setItem('openResult', 'true');
								localStorage.setItem('cellNo', msgData.cellNo);
								localStorage.setItem(localcacheName.bookCode, msgData.bookCode);
							} catch(e) {
								localStorage.setItem('openResult', 'false');
							}
							mui.openWindow('show_result.html');
						})
					} else {
						localStorage.setItem(localcacheName.method_borrow_user_id,'');
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

	}

	function onClose() {

	}
}

