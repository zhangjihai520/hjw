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
    if (code == 13) {
		console.info(keychar);
		returnBookStar(keychar);
    }else{
    	keychar += String.fromCharCode(e.keyCode);
    }
}

function returnBookStar(bookCode) {//还书接口开门
	keychar = '';
	var url = createAjaxURL(interface_name.method_return_book_star);
	var data = {
		bookShelfId: public_getBookShelfId(),
		bookCode: bookCode
	};
	
	util.encrypt.MD5Data(data);
	var success = function(response) {
		mui.toast(response.msg);
		switch(response.result) {
			case global_ajaxResult.SUCCESS:		
				public_open(response.cellNo, function(data) {
					localStorage.setItem('openResult', 'true');
					localStorage.setItem('openType', 'returnBook');
					localStorage.setItem(localcacheName.method_cellNo, response.cellNo);
					localStorage.setItem(localcacheName.method_bookcode, bookCode);
					localStorage.setItem(localcacheName.method_readId,response.readId);
					return_book_clear();
					windowToHerf('show_result.html');
				})
				break;
			case global_ajaxResult.FAILED:
				break;
			case global_ajaxResult.SIGN_ERROR:
				break;
		}
	};
	util.ajax.getJSONWaiting(url, data, success);
}