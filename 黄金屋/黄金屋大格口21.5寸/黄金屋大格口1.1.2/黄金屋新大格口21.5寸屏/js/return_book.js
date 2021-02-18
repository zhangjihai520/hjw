function return_init(){
	audioPlay("audio/scan.mp3");
	timerTask(60,"gl_time_cw_return",'-1');
}

function return_book_clear(){
	if(glo_audioPlayer) {
		glo_audioPlayer.stop();
		glo_audioPlayer = null
	}
}

var keychar = '';

document.onkeyup = function (e) {//按键信息对象以函数参数的形式传递进来了，就是那个e
    var code = e.charCode || e.keyCode;  //取出按键信息中的按键代码(大部分浏览器通过keyCode属性获取按键代码，但少部分浏览器使用的却是charCode)
	keychar += String.fromCharCode(e.keyCode);
    if (code == 13) {
		console.info(keychar);
		returnBookStar(keychar);
    }
}

function returnBookStar(bookCode) {//还书接口开门
	keychar = '';
	var url = createAjaxURL(interface_name.method_return_which_cell);
	var data = {
		bookShelfId: public_getBookShelfId(),
		bookCode: bookCode
	};
	
	util.encrypt.MD5Data(data);
	var success = function(response) {
		mui.toast(response.msg);
		switch(response.result) {
			case global_ajaxResult.SUCCESS:	
				localStorage.setItem('cellNo', response.cellNo);
				if(response.userId != null && response.userId != ''){
					public_open(response.cellNo, function(data) {
						localStorage.setItem('openResult', 'true');
						localStorage.setItem('openType', 'returnBook');
						localStorage.setItem('bookCode', bookCode);
						localStorage.setItem(localcacheName.method_borrow_user_id, response.userId);
						return_book_clear();
						window.location.href = 'show_result.html';
					})
				}else{
					window.location.href = 'supply_user.html';
				}
				break;
			case global_ajaxResult.FAILED:
				break;
			case global_ajaxResult.SIGN_ERROR:
				break;
		}
	};
	util.ajax.getJSONWaiting(url, data, success);
}
