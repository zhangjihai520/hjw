function input_code_init(){
	submit_code_input_code = "";
	glo_bookIdInputCode = "";
	glo_cellNoInputCode = "";
	glo_bookNameInputCode = "";
	$(document.getElementById("inputCodeInputCode")).empty();
}

function input_code_isSubmitOk(){
	if(submit_code_input_code.length == 0){
		mui.toast("请输入验证码");
		return false;
	}
	return true;
}

function input_code_setData(){
//	localStorage.removeItem(global_localStorage.reserveCode);
	submit_code_input_code=document.getElementById("inputCodeInputCode").innerText;
//	localStorage.setItem(global_localStorage.reserveCode, submit_code_input_code);
}
function input_code_submit(){
	var ao = global_ajaxObject.product;
	var url = util.str.createAjaxURL(ao, ao.method_get_book_vertical);
	var data = {
		bookShelfId: public_getBookShelfId(),
		code: submit_code_input_code
	};
	util.encrypt.MD5Data(data);
	var success = function(response){
	
		switch(response.result){
			case global_ajaxResult.SUCCESS:
			//				localStorage.setItem(global_localStorage.reserveCode, submit_code_input_code);		    
//				OPEN_PERSON=response.userId;			
//              OPEN_CELLNUM=response.shelfNo;	             
//				index.openPage("get_book_success");
			
//				glo_bookIdInputCode = response.bookId;
//				glo_cellNoInputCode = response.shelfNo;//柜门格口号
//				glo_bookNameInputCode = response.bookName;
//              alert(JSON.stringify(response));

//				public_getBooksInCell(glo_cellNoInputCode, function(getBooksResponse){					
//					if(getBooksResponse.success == true){					
//						public_compare(glo_cellNoInputCode, glo_bookIdInputCode, getBooksResponse.data, util.ajax.getJSONWaiting, function(compareResult){
//							if(compareResult.result == global_ajaxResult.SUCCESS){
//								localStorage.setItem(global_localStorage.json.getBook, JSON.stringify({
//									bookName: glo_bookNameInputCode,
//									shelfNo: glo_cellNoInputCode
//								}));
//									index.openPage("get_book_success");
//							}else{
//								mui.toast(compareResult.msg);
//							}
//						});
//					}else{
//						mui.toast("读取格口失败");
//					}
//				});				
				break;
			case global_ajaxResult.FAILED:
			case global_ajaxResult.SIGN_ERROR:
				mui.toast(response.msg);
				break;
		}
	};
	util.ajax.getJSONWaiting(url, data, success);
}
