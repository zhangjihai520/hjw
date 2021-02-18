function return_book_handleInputBookCode() {
	var inputBookCode = document.getElementById("inputBookCodeReturnBook");	
		bookCode = inputBookCode.value.trim();	
	if(bookCode.length >= global_BOOK_CODE_LENGTH){	
		inputBookCode.removeEventListener("input", return_book_handleInputBookCode, false);
		return_book_returnBook(bookCode);
	}
}

function return_book_init(e){
	glo_bookCodeReturnBook = "";
	glo_bookNameReturnBook = "";
	glo_cellNoReturnBook = "";
	e.value = "";
	e.blur();
	if(glo_audioPlayer) {
		glo_audioPlayer.stop();
		glo_audioPlayer = null
	}
}

function return_book_resetInputBookCode(){
	var inputBookCode = document.getElementById("inputBookCodeReturnBook");
	inputBookCode.value = "";
	inputBookCode.addEventListener("input", return_book_handleInputBookCode, false);
	inputBookCode.focus();
}

function return_book_returnBook(bookCode){
	var ao = global_ajaxObject.product;
	var url = util.str.createAjaxURL(ao, ao.method_return_which_cell);
	var data = {
		bookShelfId: public_getBookShelfId(),
		bookCode: bookCode
	};
	util.encrypt.MD5Data(data);	
	var success = function(response){
		switch(response.result){
			case global_ajaxResult.SUCCESS:
			    OPEN_PERSON=response.userId;
			    OPEN_CELLNUM=response.cellNo;
			    if(checkout(OPEN_PERSON)){
			    	mui.toast("未从服务器获取到用户ID");return;
			    }else if(checkout(OPEN_CELLNUM)){
			    	mui.toast("未从服务器获取到格口号");return;
			    }
			    localStorage.setItem('openType','return');
			    index.openPage("get_book_success");	
				break;
			default:
				mui.toast(response.msg);
				return_book_resetInputBookCode();
				break;
		}
	};
	util.ajax.getJSONWaiting(url, data, success);
}


var nativeWebview, imm, InputMethodManager,main;
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
          imm.hideSoftInputFromWindow(WindowToken,InputMethodManager.HIDE_NOT_ALWAYS);

	}, 200);
};