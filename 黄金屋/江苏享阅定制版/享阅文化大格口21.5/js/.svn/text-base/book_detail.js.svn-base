function book_detail_borrowBookStatusOfficial(){				
	var bookCode = glo_randomCodeBookDetail;
	if(bookCode){
		var ao = global_ajaxObject.product;
		var url = util.str.createAjaxURL(ao, ao.method_random_code_status_official);
		var data = {
			randomCode: bookCode
		};
		util.encrypt.MD5Data(data);
		
		var success = function(response){
			switch(response.result){
				case global_ajaxResult.SUCCESS:			
					localStorage.setItem(global_localStorage.userId, response.userId);
					mui.toast(response.msg);
					break;
				case global_ajaxResult.FAILED:
				case global_ajaxResult.SIGN_ERROR:
					mui.toast(response.msg);
					break;
			}
		};
		util.ajax.getJSON(url, data, success);	
	}	
}
/*
 * 获取到图书详情
 */
function book_detail_getBookDetail(){
	var ao = global_ajaxObject.product;
	var url = util.str.createAjaxURL(ao, ao.method_book_detail);
	var data = {
		bookShelfId: public_getBookShelfId(),
		bookId: localStorage.getItem(global_localStorage.bookId),
		cell: ""
	};
	util.encrypt.MD5Data(data);	
	var success = function(response){	
		if(response.result == global_ajaxResult.SUCCESS){
			glo_bookCodeBookDetail = response.bookCode;
			glo_bookNameBookDetail = response.bookName;
			glo_randomCodeBookDetail = response.randomCode;	
			
			$("#bookdetail_QR").empty();
			qrcodeMethod("bookdetail_QR", 242, 242, response.QRCode);
			OPEN_CELLNUM=response.number;		
			var _document = document,
				element;
			for(var prop in response){
				element = _document.querySelector(".book-detail-data-" + prop);
				if(element){
					element.innerHTML = response[prop];
				}
				element = doc.querySelector(".book-detail-img-" + prop);
				if(element) {
					element.src = response[prop];
				}
			}	
		}else{
			mui.toast(response.msg);
		}	
	};
	util.ajax.getJSON(url, data, success);
}

function book_detail_init(data){
	glo_bookCodeBookDetail = "";
	glo_cellNoBookDetail = "";
	glo_bookNameBookDetail = "";
	glo_randomCodeBookDetail = "";
	glo_randomCodeIntervalBookDetail = "";
	
	
	for(var prop in data){
		data[prop].value= "";
	}
	$(".app-input-book-detail").empty()

	document.querySelector(".book-detail-data-bookName").innerHTML = "";
	document.querySelector(".book-detail-data-bookContent").innerHTML = "";
	document.querySelector(".book-detail-img-bookPic").src = "";
	document.querySelector(".book-detail-data-bookDate").innerHTML = "";
}

function book_detail_isSubmitOk(submitData){
	var item;
	for(var prop in submitData){
		item = submitData[prop];
		if(item.value.length == 0){
			mui.toast("请输入" + item.text);
			return false;
		}
	}

	return true;
}

function book_detail_setData(submit_data){
	
	for(var prop in submit_data){
		element = document.querySelector(".book-detail-value-" + prop);
		if(element){
			submit_data[prop].value = element.innerText.trim();
		}
	}
}

function book_detail_setSelectInput(input){
	var loginInputs = document.querySelectorAll(".app-input-book-detail"),
		item;
	for(var i=0, len=loginInputs.length; i<len; i++){
		item = loginInputs[i];
		if(item == input){
			if(!item.classList.contains("public-focused-input-book-detail")){
				item.classList.add("public-focused-input-book-detail");
			}
		}else{
			item.classList.remove("public-focused-input-book-detail");
		}
	}
}

function shelfSymbol_setSelectInput(input){	
	var shelfSymbolInputs=document.querySelectorAll(".app-input-detection"),item;
		for(var i=0, len=shelfSymbolInputs.length; i<len; i++){
		item = shelfSymbolInputs[i];
		if(item == input){
			if(!item.classList.contains("public-focused-input-detection")){
				item.classList.add("public-focused-input-detection");
			}
		}else{
			item.classList.remove("public-focused-input-detection");
		}
	}
}
/*
 * 山西测试
 */
function book_detail_submit(submitData){
	var ao = global_ajaxObject.user;
	var url = util.str.createAjaxURL(ao, ao.method_shelf_log_in);	
	var data = {
		 bookShelfId:public_getBookShelfId(),
		 bookCode:glo_bookCodeBookDetail,
	     userName:submitData.userName.value,
	     pwd:submitData.password.value,					
	};
	
	util.encrypt.MD5Data(data);
	var success = function(response){
				mui.toast(response.msg)
	};
	
	util.ajax.getJSONWaiting(url, data, success);
}
