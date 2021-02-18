function borrowBookofficial(code, userId) {
	var ao = global_ajaxObject.product;
	var url = util.str.createAjaxURL(ao, ao.method_borrow_book_official);
	var data = {
		bookCode: code,
		userId: userId
	};
	util.encrypt.MD5Data(data);
	var success = function(response) {
		//						alert(JSON.stringify(response))
		switch(response.result) {
			case global_ajaxResult.SUCCESS:
				var cellNum = response.cellNo;
				var bookName = response.bookName;

				break;
			case global_ajaxResult.FAILED:
			case global_ajaxResult.SIGN_ERROR:
				mui.toast(response.msg);
				break;
		}
	};
	util.ajax.getJSONWaiting(url, data, success);
}
/*
 * 获取到图书详情
 */

function book_detail_getBookDetail(bookId) {
	var data = {
		bookShelfId: public_getBookShelfId(),
		bookId: bookId,
		cell: localStorage.getItem('cellNum')||""
	}
	util.encrypt.MD5Data(data);
	var success = function(response) {
		localStorage.setItem('cellNum',"");
		if(response.result == global_ajaxResult.SUCCESS) {
			glo_bookCodeBookDetail = response.bookCode;
			glo_cellNoBookDetail = response.number;
			glo_randomCodeBookDetail = response.randomCode;
			glo_bookNameBookDetail = response.bookName;
			$("#bookdetail_QR").empty();
			qrcodeMethod("bookdetail_QR", 242, 242, response.QRCode);
			var element;
			for(var prop in response) {
				element = doc.querySelector(".book-detail-data-" + prop);
				if(element) {
					element.innerHTML = response[prop];
				}
				element = doc.querySelector(".book-detail-img-" + prop);
				if(element) {
					element.src = response[prop];
				}
			}
		} else {
			index.openPage("book_list");
			mui.toast(response.msg);
		}
	};
	util.ajax.getJSON(ApiUrl + global_ajaxObjectLL.ItemInfo, data, success);
}

function book_detail_init(data) {
	glo_bookCodeBookDetail = "";
	glo_cellNoBookDetail = "";
	glo_bookNameBookDetail = "";
	glo_randomCodeBookDetail = "";
	glo_randomCodeIntervalBookDetail = "";

	for(var prop in data) {
		data[prop].value = "";
	}
	$(".app-input-book-detail").empty();

	doc.querySelector(".book-detail-img-bookPic").src = "images/book_cover.png";
	doc.querySelector(".book-detail-data-bookName").innerHTML = "";
	//	document.querySelector(".../images").innerHTML = "";
	doc.querySelector(".book-detail-data-bookContent").innerHTML = "";
	doc.querySelector(".book-detail-img-url").src = "";

	doc.querySelector(".book-detail-data-bookDate").innerHTML = "";
}

function book_detail_isSubmitOk(submitData) {
	var item;
	for(var prop in submitData) {
		item = submitData[prop];
		if(item.value.length == 0) {
			mui.toast("请输入" + item.text);
			return false;
		}
	}

	return true;
}

function book_detail_setData(submit_data) {

	for(var prop in submit_data) {
		console.log(prop)
		element = document.querySelector(".book-detail-value-" + prop);
		if(element) {
			submit_data[prop].value = element.innerText.trim();
		}
	}
}

function book_detail_setSelectInput(input) {
	console.log(input);
	var loginInputs = document.querySelectorAll(".app-input-book-detail"),
		item;
	for(var i = 0, len = loginInputs.length; i < len; i++) {
		item = loginInputs[i];
		if(item == input) {
			if(!item.classList.contains("public-focused-input-book-detail")) {
				item.classList.add("public-focused-input-book-detail");
			}
		} else {
			item.classList.remove("public-focused-input-book-detail");
		}
	}
}

function shelfSymbol_setSelectInput(input) {
	var shelfSymbolInputs = document.querySelectorAll(".app-input-detection"),
		item;
	for(var i = 0, len = shelfSymbolInputs.length; i < len; i++) {
		item = shelfSymbolInputs[i];
		if(item == input) {
			if(!item.classList.contains("public-focused-input-detection")) {
				item.classList.add("public-focused-input-detection");
			}
		} else {
			item.classList.remove("public-focused-input-detection");
		}
	}
}

function book_detail_submit(submitData) {
	//	console.log(glo_cellNoBookDetail);//该书所属格子号
	var ao = global_ajaxObject.user;
	var url = global_ajaxURL + ao.method_shelf_log_in;
	var data = {
		userName: submitData.userName.value,
		password: submitData.password.value,
		bookshelfId: public_getBookShelfId()
	};
	util.encrypt.MD5Data(data);

	var success = function(response) {
		switch(response.result) {
			case global_ajaxResult.SUCCESS:

				borrowBookofficial(glo_bookCodeBookDetail, response.userId);

				break;
			case global_ajaxResult.FAILED:
			case global_ajaxResult.SIGN_ERROR:
				mui.toast(response.msg);
				break;
		}
	};
	util.ajax.getJSONWaiting(url, data, success);

}