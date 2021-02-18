function public_backspace(input){
	var text = input.value;
	var newText = text.substring(0, text.length-1);
	input.value = newText;
}
function public_borrowBookStatusOfficial(bookCode){
	var ajaxObject = global_ajaxObject.product;
	var url = util.str.createAjaxURL(ajaxObject, ajaxObject.method_borrow_book_status_official);
	var data = {
		bookShelfId: public_getBookShelfId(),
		bookCode: bookCode 
	};
	util.encrypt.MD5Data(data);
	var success = function(response){
		if(response.result == global_ajaxResult.SUCCESS){
			clearInterval(glo_borrowBookStatusOfficialInterval);	
			audioPlay('audio/borrow_book.mp3');
			localStorage.setItem(global_localStorage.json.getBook, JSON.stringify({
				bookName: response.bookName,
				shelfNo: response.shelfNo
			}));
			localStorage.setItem(global_localStorage.userId, response.userId);
			localStorage.setItem(global_localStorage.readId, response.readId);
			ShowBookSuccess();
			windowOpenbyUrl("getBookSuccess");
		}
	};
	util.ajax.getJSON(url, data, success);
}

function public_getBookIdByCell(cell, ajaxMethod, toDo){
	var ajaxObject = global_ajaxObject.product;
	var url = util.str.createAjaxURL(ajaxObject, ajaxObject.method_get_book_id_by_cell);
	var data = {
		bookshelfId: public_getBookShelfId(),
		cell: cell 
	};
	
	var success = function(response){
		if(typeof toDo === "function"){
			toDo(response);
		}
	};
	ajaxMethod(url, data, success);
}
function book_list_getSelectedTypeId() {
	var typeId = "",
		types = document.getElementById("ulBookType").children,
		item;
	for(var i = 0, len = types.length; i < len; i++) {
		item = types[i];
		if(item.querySelector("a").classList.contains("on-book-type")) {
			typeId = item.dataset.id;
		}
	}

	return typeId;
}
function public_getBookShelfId(){
	return localStorage.getItem(global_localStorage.shelfId) || "";
}

function public_getBookShelfNo(){
	return localStorage.getItem(global_localStorage.shelfNo) || "";
}
function public_getBookShelfName(){
	return localStorage.getItem(global_localStorage.shelfName) || "";
}
function public_getUserDetail(toDo){
	var userID = localStorage.getItem(global_localStorage.userId);
	
	if(userID){
		var ajaxObject = global_ajaxObject.user;
		var url = util.str.createAjaxURL(ajaxObject, ajaxObject.method_user_detail);
		var data = {
			id: userID
		};
		util.encrypt.MD5Data(data);
		var success = function(response){
			var _document = document;
			if(typeof toDo === "function"){
				toDo();
			}
		};
		util.ajax.getJSON(url, data, success);
	}
}
/*
 * 开柜门
 * id:柜门号
 */
function public_open(id, toDo){
	var ao = global_ajaxObject.boxctrl;
	var url = util.str.createBoxctrlServiceURL(ao, ao.method_open);
	var data = {
		boxid: id
	};	
	var success = function(response){	
		if(typeof toDo == "function"){
//			mui.toast("柜门已打开");
			toDo(response);
		}
	};
	
		
	mui.ajaxSettings.beforeSend = function(xhr, setting) {
		//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
		console.log('beforeSend:::' + JSON.stringify(setting));
	};	
	mui.ajax(url, {
		data: data,
		dataType:'json',//服务器返回json格式数据
		type:'get',//HTTP请求类型
		timeout:120000,//超时时间设置为10秒；
		success: function(response){			
			success(response);			
		},
		error:function(xhr,type,errorThrown){						
			mui.toast("连接超时，打开柜门失败", { duration:'long', type:'div' });
		}
	});
}


function public_read(toDo){
	var ao = global_ajaxObject.boxctrl;
	var url = util.str.createBoxctrlServiceURL(ao, ao.method_reader);
	var data = {
		
	};
	var success = function(response){
		console.log("read: " + JSON.stringify(response));
		if(typeof toDo == "function"){
			toDo(response);
		}

		
	};
	util.ajax.getJSON(url, data, success);
}

/*
 * shelfNo： 格子id
 */
function public_status(shelfNo, toDo){
	var ao = global_ajaxObject.boxctrl;
	var url = util.str.createBoxctrlServiceURL(ao, ao.method_state);
	var data = {
		boxid: shelfNo
	};
	var success = function(response) {
		console.log("state: " + JSON.stringify(response));

		if(typeof toDo === "function"){
			toDo(response);
		}

		
	};
	util.ajax.getJSON(url, data, success);
}



