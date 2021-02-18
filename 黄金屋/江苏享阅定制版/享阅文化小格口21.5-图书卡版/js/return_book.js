function return_book_handleInputBookCode() {
	var inputBookCode = document.getElementById("inputBookCodeReturnBook");
	returnBookCode(inputBookCode);
}

function returnBookCode(obj) {
	if($(obj).val().length >= global_BOOK_CODE_LENGTH) {
		var str = $(obj).val();
		var bookEncoding = str.substring(0, global_BOOK_CODE_LENGTH);
		mui.toast("读取成功", {
			duration: 'long',
			type: 'div'
		});
		returnBook(bookEncoding);
	}
}

function returnBook(bookCode) {
	var ao = global_ajaxObject.product;
	var url = util.str.createAjaxURL(ao, ao.method_return_book);
	var data = {
		bookShelfId: public_getBookShelfId(),
		bookCode: bookCode
	};
	util.encrypt.MD5Data(data);
	var success = function(response) {
		switch(response.result) {
			case global_ajaxResult.SUCCESS:
				localStorage.setItem(global_localStorage.json.getBook, JSON.stringify({
					bookName: response.bookName,
					shelfNo: response.shelfNo
				}));
				localStorage.setItem(global_localStorage.readId, response.readId);
				public_open(response.shelfNo, function(data) {
					show_borrow_return_content(borrow_return_data.returnBook, response.bookName, response.shelfNo,'return');
				})
				break;
			case global_ajaxResult.FAILED:
			case global_ajaxResult.SIGN_ERROR:
				mui.toast(response.msg, {
					duration: 'long',
					type: 'div'
				});
				break;
		}
	};
	util.ajax.getJSONWaiting(url, data, success);
}

function return_book_clear() {
	if(glo_audioPlayer) {
		glo_audioPlayer.stop();
		glo_audioPlayer = null
	}
	doc.getElementById("inputBookCodeReturnBook").value = "";
	doc.getElementById("inputBookCodeReturnBook").removeEventListener("input", return_book_handleInputBookCode, false);
}

function return_book_init() {
	doc.getElementById("inputBookCodeReturnBook").focus();
	audioPlay("audio/scan.mp3");
	doc.getElementById("inputBookCodeReturnBook").value = "";
	doc.getElementById("inputBookCodeReturnBook").addEventListener("input", return_book_handleInputBookCode, false);
	public_getBookCodeNum(function(res){
		isGetBookCode = res.success;
		if(isGetBookCode){
			var data = res.data;
//			mui.toast("读取成功:" + data, { duration: 'long', type: 'div' });
			returnBook(data);
		}
	})
}

function return_book_returnBook(bookCode) {
	var ao = global_ajaxObject.product;
	var url = util.str.createAjaxURL(ao, ao.method_return_book);
	var data = {
		bookShelfId: public_getBookShelfId(),
		bookCode: bookCode
	};
	util.encrypt.MD5Data(data);
	var success = function(response) {
		console.log("returnWhichCell: " + JSON.stringify(response));
		switch(response.result) {
			case global_ajaxResult.SUCCESS:
				localStorage.setItem(global_localStorage.userId, response.userId);
				glo_cellNoReturnBook = response.cellNo;
				glo_bookNameReturnBook = response.bookName;
				public_open(glo_cellNoReturnBook, function(data) {
					index.openPage("get_book_success");
				})
				break;
			default:
				mui.toast(response.msg);
				return_book_resetInputBookCode();
				break;
		}
	};
	util.ajax.getJSONWaiting(url, data, success);
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
		//        var Focus = plus.android.invoke(main, 'getCurrentFocus');
		//        var WindowToken = plus.android.invoke(Focus, 'getWindowToken');
		//        imm.hideSoftInputFromWindow(WindowToken,InputMethodManager.HIDE_NOT_ALWAYS);

		//imm.toggleSoftInput(0, InputMethodManager.HIDE_NOT_ALWAYS);//HIDE_NOT_ALWAYS SHOW_FORCED
		//imm.hideSoftInputFromWindow(InputMethodManager.getWindowToken(), 0); 
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