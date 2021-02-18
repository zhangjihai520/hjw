function return_book_state(wrapperDataset){
	var  tt = wrapperDataset.action;
	if(tt == 'return_book') {
		audioPlay("audio/scan.mp3");
	}else if(tt=='back'){
		return_book_clear();
	}
	doc.getElementById("inputBookCodeReturnBook").focus();
	doc.getElementById("inputBookCodeReturnBook").value = "";
	doc.getElementById("inputBookCodeReturnBook").addEventListener("input", return_book_handleInputBookCode, false);
}
function return_book_clear(){
	if(glo_audioPlayer) {
		glo_audioPlayer.stop();
		glo_audioPlayer = null
	}
	doc.getElementById("inputBookCodeReturnBook").removeEventListener("input", return_book_handleInputBookCode, false);
}

function return_book_handleInputBookCode() {
	var inputBookCode = document.getElementById("inputBookCodeReturnBook");
	returnBookCode(inputBookCode);
}

function returnBookCode(obj) {
	var str = $(obj).val();
	if($(obj).val().length == 8){
		var bookEncoding = str.substring(0, 8);
		returnBookStar(str);
	}else if($(obj).val().length == 9){
		var bookEncoding = str.substring(0, 9);
		returnBookStar(str);
	}else if($(obj).val().length == 10){
		var bookEncoding = str.substring(0, 10);
		returnBookStar(str);
	}
}

function returnBookStar(bookCode) {//还书接口开门
	var url = createAjaxURL(interface_name.method_return_book_star);
	var data = {
		bookShelfId: public_getBookShelfId(),
		bookCode: bookCode
	};
	
	util.encrypt.MD5Data(data);
	var success = function(response) {
		switch(response.result) {
			case global_ajaxResult.SUCCESS:		
				public_open(response.cellNo, function(data) {
					localStorage.setItem('openResult', 'true');
					localStorage.setItem('openType', 'returnBook');
					localStorage.setItem('cellNo', response.cellNo);
					localStorage.setItem(localcacheName.bookCode, bookCode);
					return_book_clear();
					mui.openWindow('show_result.html');
				})
				break;
			case global_ajaxResult.FAILED:
				if(bookCode.length == 10){
					mui.toast(response.msg);
				}
				break;
			case global_ajaxResult.SIGN_ERROR:
				if(bookCode.length == 10){
					mui.toast(response.msg);
				}
				break;
		}
	};
	util.ajax.getJSON(url, data, success);
}

var nativeWebview, imm, InputMethodManager, main;
var initNativeObjects = function() {
	if(mui.os.android) {
		main = plus.android.runtimeMainActivity();
		var Context = plus.android.importClass("android.content.Context");
		InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
		imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
	} else {
		nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
	}
};
var showSoftInput = function() {
	if(mui.os.android) {

	} else {
		nativeWebview.plusCallMethod({
			"setKeyboardDisplayRequiresUserAction": false
		});
	}
	setTimeout(function() {
		//此处可写具体逻辑设置获取焦点的input
		var inputElem = document.getElementById("inputBookCodeReturnBook");
		inputElem.focus();
		var Focus = plus.android.invoke(main, 'getCurrentFocus');
		var WindowToken = plus.android.invoke(Focus, 'getWindowToken');
		imm.hideSoftInputFromWindow(WindowToken, InputMethodManager.HIDE_NOT_ALWAYS);

	}, 200);
};