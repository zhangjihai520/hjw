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
			
			//util.helper.openWindow("get_book_success.html");
			ShowBookSuccess();
			windowOpenbyUrl("getBookSuccess");
		}
	};
	util.ajax.getJSON(url, data, success);
}
function public_gridTesting(gridnum,bookCodes,callback){	
		    var ajaxObject = global_ajaxObject.setting;
	        var url = util.str.createAjaxURL(ajaxObject, ajaxObject.method_detect_compare);
	                    var data={
								  bookShelfId: public_getBookShelfId(),   				//设备Id	
	                              cellNo:gridnum,	
	                              bookCodes: bookCodes	
								     }	
	        var success=function(response){	        	
	            if(response.result==1){
	            	  	callback(response);
	            }
	      
	        }
	       util.ajax.getJSONWaiting(url, data, success);
}
	                               



function public_compare(cellNo, bookId, bookCodes, ajaxMethod, toDo){
	var ajaxObject = global_ajaxObject.setting;
	var url = util.str.createAjaxURL(ajaxObject, ajaxObject.method_compare);
	var data = {
		bookShelfId: public_getBookShelfId(),
		cellNo: cellNo,
		bookId: bookId,
		bookCodes: bookCodes.join(",")
	};
	var success = function(response){
		if(typeof toDo === "function"){
			toDo(response);
		}
	};
	ajaxMethod(url, data, success);
}

function public_compareCellNo(cellNo, bookCodes, ajaxMethod, toDo){
	var ajaxObject = global_ajaxObject.setting;
	var url = util.str.createAjaxURL(ajaxObject, ajaxObject.method_compare_cell_no);
	var data = {
		bookShelfId: public_getBookShelfId(),
		cellNo: cellNo,
		bookCodes: bookCodes.join(",")
	};
	var success = function(response){
		console.log("compare: " + JSON.stringify(response));
		if(typeof toDo === "function"){
			toDo(response);
		}
	};
	ajaxMethod(url, data, success);
}

function public_compareReturn(cellNo, bookCode, bookCodes, ajaxMethod, toDo){
	var ajaxObject = global_ajaxObject.setting;
	var url = util.str.createAjaxURL(ajaxObject, ajaxObject.method_compare_return);
	var data = {
		bookShelfId: public_getBookShelfId(),
		cellNo: cellNo,
		bookCode: bookCode,
		bookCodes: bookCodes.join(",")
	};
	var success = function(response){
		console.log("compareReturn: " + JSON.stringify(response));
		if(typeof toDo === "function"){
			toDo(response);
		}
	};
	ajaxMethod(url, data, success);
}

function public_controlLight(){
	var now = new Date();
	var hour = now.getHours().toString();
	var minutes = now.getMinutes().toString();
	
	if(minutes.length == 1){
		minutes = "0" + minutes;
	}
	
	var current = parseInt(hour + minutes);
	
	
	var lightsOnPeriod = JSON.parse(localStorage.getItem(global_localStorage.json.lightsOnPeriod));
	
	var start = parseInt(lightsOnPeriod.start.replace(":", ""));
	var end = parseInt(lightsOnPeriod.end.replace(":", ""));
	
	console.log("end: " + end);
	
	if(current >= start && current <= end){
		public_light(global_lightState.ON);
	}else{
		public_light(global_lightState.OFF);
	}
	
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

function public_getBookShelfId(){
	return localStorage.getItem(global_localStorage.shelfId) || "";
}

function public_getBookShelfNo(){
	return localStorage.getItem(global_localStorage.shelfNo) || "";
}

/*
 * shelfNo： 格子id
 */
function public_getBooksInCell(shelfNo, toDo){
//	alert("格子号："+shelfNo)
	var ao = global_ajaxObject.boxctrl;
	var url = util.str.createBoxctrlServiceURL(ao, ao.method_get_books_in_cell);	
	var data = {
		boxid: shelfNo
	};
	var success = function(response) {		
		if(typeof toDo === "function"){
			toDo(response);
		}	
	};
	util.ajax.getJSONWaiting(url, data, success);
}
/*
 * 将格口号也返回，防止异步导致错乱
 */
function public_getBooksInCell2(shelfNo, toDo){
	var ao = global_ajaxObject.boxctrl;
	var url = util.str.createBoxctrlServiceURL(ao, ao.method_get_books_in_cell);	
	var data = {
		boxid: shelfNo
	};
	var success = function(response) {		
		if(typeof toDo === "function"){			  
			toDo(response);
		}
	};
	util.ajax.getJSONWaiting(url, data, success);
}

function public_getLightOnPeriod(ajaxMethod, toDo){
	var ajaxObject = global_ajaxObject.setting;
	var url = util.str.createAjaxURL(ajaxObject, ajaxObject.method_light_on_period);
	var data = {
		bookShelfId: public_getBookShelfId()
       //boxId:
	};

	var success = function(response){		
		if(typeof toDo === "function"){
			toDo(response);
		}
	};
	ajaxMethod(url, data, success);
}

function public_getPlatformInfo(ajaxMethod, toDo){
	var ajaxObject = global_ajaxObject.setting;
	var url = util.str.createAjaxURL(ajaxObject, ajaxObject.method_platform_info);
	var data = {
		
	};
	
	var success = function(response){
		
		if(typeof toDo === "function"){
			toDo(response);
		}
	};
	ajaxMethod(url, data, success);
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
	
			
			for(var prop in response){
				var element = _document.querySelector(".app-data-" + prop);
				if(element){
					element.innerHTML = response[prop];	
				}				
			}			
			if(typeof toDo === "function"){
				toDo();
			}
		};
		util.ajax.getJSON(url, data, success);
	}
}

function public_light(state){
	var ao = global_ajaxObject.boxctrl;
	var url = util.str.createBoxctrlServiceURL(ao, ao.method_light);
	var data = {
		state: state
	};
	var success = function(response){
		console.log("light: " + JSON.stringify(response));
	};
	util.ajax.getJSON(url, data, success);
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
//		console.log("open: " + JSON.stringify(response));
		if(typeof toDo == "function"){
			toDo(response);
		}
	};	
	mui.ajaxSettings.beforeSend = function(xhr, setting) {
		//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
//		console.log('beforeSend:::' + JSON.stringify(setting));		
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
			mui.alert("连接超时，打开柜门失败", global_stringObject.project, null);
			//mui.toast("连接超时，打开柜门失败", { duration:'long', type:'div' });
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

function public_reboot(){
	var ao = global_ajaxObject.boxctrl;
	var url = util.str.createBoxctrlServiceURL(ao, ao.method_reboot);
	var data = {		
	};
	var success = function(response){
		console.log("reboot: " + JSON.stringify(response));	
	};
	util.ajax.getJSONWaiting(url, data, success);
}

function public_setShelfNo() {
	var spanShelfNos = document.querySelectorAll(".shelf-no");
	for(var i=0, len=spanShelfNos.length; i<len; i++){
		spanShelfNos[i].innerHTML = localStorage.getItem(global_localStorage.shelfNo) || "-";
	}	
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
//		console.log("state: " + JSON.stringify(response));
		if(typeof toDo === "function"){
			toDo(response);
		}
	};
	util.ajax.getJSON(url, data, success);
}

function createDetectionScrollHtml(item){
	 var html='';
   for(var i=0;i<item.length;i++){
   	  html+='<dd>'+item[i].bookName+'</dd>'
   }  
   if(item.length>0){html+='<dd class="itemCount">'+item.length+'本</dd>'}
   return html;
}

