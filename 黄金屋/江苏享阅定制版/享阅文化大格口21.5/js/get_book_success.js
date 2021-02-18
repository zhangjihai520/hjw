function get_book_success_displayResultList(data) {
	var _document = document,
		borrowList = data.borrowList,
		returnList = data.returnList;
	_document.getElementById("divTop").style.display = "none";
	_document.getElementById("divResultList").style.display = "block";
	clearTimerTask();
	timerTask(30,"suc_gm_td");
	if(borrowList.length == 0 && returnList.length > 0) {	
		$("#divResultReturn").addClass("dynamicClass")
		$("#divResultBorrow").addClass("nothingness")
	}
	if(borrowList.length > 0 && returnList.length == 0) {		
		$("#divResultReturn").addClass("nothingness")
		$("#divResultBorrow").addClass("dynamicClass")
	}

	if(borrowList.length == 0 && returnList.length == 0) {
		$("#divResultReturn").addClass("nothingness");
		$("#divResultBorrow").addClass("nothingness");
		$("#divResultNone").removeClass("nothingness");
		return
	}

	_document.getElementById("spanBorrowCount").innerHTML = borrowList.length;
	if(borrowList.length > 0) {
		get_book_success_fillResultList(_document.getElementById("ulBorrowList"), borrowList);
	}
	_document.getElementById("spanReturnCount").innerHTML = returnList.length;

	if(returnList.length > 0) {
		get_book_success_fillResultList(_document.getElementById("ulReturnList"), returnList);
	}
}

function get_book_success_fillResultList(listElement, listData) {
	var _document = document,
		item,
		newElement;
	for(var i = 0, len = listData.length; i < len; i++) {
		item = listData[i];
		newElement = _document.createElement("li");
		newElement.innerHTML = (i + 1) + "." + "《" + item + "》";
		listElement.appendChild(newElement);
	}
}

function get_book_success_init() {
	document.getElementById("divTop").style.display = "block";
	document.getElementById("divResultList").style.display = "none";
	document.getElementById("ulBorrowList").innerHTML = "";
	document.getElementById("ulReturnList").innerHTML = "";
	$(".suc").removeClass("dynamicClass nothingness");
	$("#divResultNone").addClass("nothingness");
}

function get_book_success_refresh() {
	var doc = document;
	    doc.getElementById("suc_gm").innerHTML = OPEN_CELLNUM + "柜门";
	    if(localStorage.getItem('openType') == 'return'){
	    	document.getElementById('getbook').style.display = 'none';
	    	document.getElementById('returnbook').style.display = 'block';
	    }else{
	    	document.getElementById('getbook').style.display = 'block';
	    	document.getElementById('returnbook').style.display = 'none';
	    }
        openWhitchDoor(OPEN_CELLNUM,OPEN_PERSON);
}
function get_book_success_userCloseDoor(cellNo,userId, bookCodes) {
	var ao = global_ajaxObject.setting;
	var url = util.str.createAjaxURL(ao, ao.method_user_close_door);
	if(bookCodes == ''){
		var data = {	
			userId: userId,
			bookShelfId: public_getBookShelfId(),
			cellNo: cellNo,
			bookCodes: '',
			reserveCode: localStorage.getItem(global_localStorage.reserveCode)||""
		};
	}else{
		var data = {	
			userId: userId,
			bookShelfId: public_getBookShelfId(),
			cellNo: cellNo,
			bookCodes: bookCodes.join(","),
			reserveCode: localStorage.getItem(global_localStorage.reserveCode)||""
		};
	}
	var success = function(response) {
		   mui.toast(response.msg, {
			   duration: 'long',
			   type: 'div'
		      });
		      
		switch(response.result) {
			case global_ajaxResult.SUCCESS:				
				get_book_success_displayResultList(response);	
				break;
			case global_ajaxResult.FAILED:
				index.openPage("home");	
			case global_ajaxResult.SIGN_ERROR:		
			    index.openPage("home");		
				break;
		}
	};
	util.ajax.getJSONWaiting(url, data, success);
}