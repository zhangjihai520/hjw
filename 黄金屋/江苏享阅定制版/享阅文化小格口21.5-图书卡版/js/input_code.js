function input_code_clear(){
	submit_code_input_code = "";
	glo_bookIdInputCode = "";
	glo_cellNoInputCode = "";
	glo_bookNameInputCode = "";
	$("#inputCodeInputCode").empty();
}
function input_code_isSubmitOk(){
	if(submit_code_input_code.length == 0){
		mui.toast("请输入验证码");
		return false;
	}
	return true;
}
function input_code_submit(){
	var data = {
		bookShelfId: public_getBookShelfId(),
		code: submit_code_input_code
	};
	util.encrypt.MD5Data(data);
	var success = function(response){		
		switch(response.result){
			case global_ajaxResult.SUCCESS:
				glo_bookIdInputCode = response.bookId;
				glo_cellNoInputCode = response.shelfNo;
				glo_bookNameInputCode = response.bookName;
				localStorage.setItem(global_localStorage.userId, response.userId);		
				break;
			case global_ajaxResult.FAILED:
			case global_ajaxResult.SIGN_ERROR:
				mui.toast(response.msg);
				break;
		}
	};
util.ajax.getJSONWaiting(ApiUrl + global_ajaxObjectLL.TakeSumbit, data, success);
}
			