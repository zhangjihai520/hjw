function getSellCellList() {
	var url = MAIN_PATH_INT + globalAjax.cellList;
	var curPage = getValue("cellList_cur");
	var data = {
		bookShelfId: public_getBookShelfId(),
		pagesize: CELL_PAGE_SIZE,
		page: curPage
	}
	ajax(url, data, function(res) {
		var cellList = res.list;
		var totalPages = res.totalPage;
		doc.getElementById("cellList_total").innerText = totalPages;
		console.log(JSON.stringify(cellList))
		$("#cellList").empty()
		for(var i = 0, len = cellList.length; i < len; i++) {
			var item = cellList[i];
			var book_name = (item.bookName == undefined ? "" : item.bookName);
			var WarehouseNumber = item.number;
			console.log("格子ID：W" + WarehouseNumber)
			var classStr = (item.isEmpty == 0 ? 'tappable"' : 'tappable on"');
			var sonEle = '<li class="' + classStr + '"  id="W' + WarehouseNumber + '"  data-bookNumber="' + WarehouseNumber + '" data-bookName="' + book_name + '" data-action="removeBook">' +
				book_name + '' + WarehouseNumber + '</li>';
			$("#cellList").append(sonEle);
		}
	})
}

function hander_inputListen() {
	var cellNumber = $('#inputBookCode').attr('data-bookNumber');

	if(cellNumber != "" && ($('#inputBookCode').val().length == 13 || $('#inputBookCode').val().length == 10)) {
		WarehousePut(cellNumber);
	}
}

/**
 * 等待放书
 */
function waitSetBook(CellNumber){
	var Apisuccess = function(response) {
		console.log('清书：' + JSON.stringify(response));
		var RMessage = response.msg;
		if(response.result == '1') {
			if(key_basket[0] && !$(key_basket[0]).hasClass("on")) {
				$(key_basket[0]).removeClass('waitPut on');
				$(key_basket[0]).empty();
			}
			key_basket = [];
			var ele = doc.getElementById("W" + CellNumber);
			$(ele).removeClass('on').addClass("waitPut");
			key_basket.push(ele);
			$(ele).html(CellNumber);
			$('#inputBookCode').attr('data-bookNumber', CellNumber);

		}
		M.toast(RMessage);
	}

	var data = {
		bookShelfId: public_getBookShelfId(),
		cellNo: CellNumber
	}

	ajax(MAIN_PATH_INT + globalAjax.removeBook, data, Apisuccess);
}

function removeBook(CellNumber) {
	//清书
	if(CellNumber == '') {
		showMessage('书格编号有误,请联系管理员');
		return false;
	}
	var url = 'http://127.0.0.1:18001/open';
	var data = {
		boxid: CellNumber
	};
	var success = function(response) {
		console.log("open: " + JSON.stringify(response));
		if(response.success) {

		} else {
			showMessage(response.data);
		}
	};

	mui.ajaxSettings.beforeSend = function(xhr, setting) {
		//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
		console.log('beforeSend:::' + JSON.stringify(setting));
	};

	mui.ajax(url, {
		data: data,
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 120000, //超时时间设置为10秒；
		success: function(response) {
			success(response);

		},
		error: function(xhr, type, errorThrown) {
			mui.toast("连接超时，打开柜门失败");
		}
	});
}

function WarehousePut(CellNumber) { //放书	
	if(CellNumber == '') {
		showMessage('书格编号有误,请联系管理员');
		return false;
	}

	var success = function(response) {
			console.log('放书返回结果:' + JSON.stringify(response));	
		$('#inputBookCode').val('');
		var RMessage = response.msg;

		if(response.result == '1') {
			console.log("赋值的格子ID：W" + CellNumber)
			doc.getElementById('W' + CellNumber).innerHTML = response.bookName + "</br>" + CellNumber;

			$('#W' + CellNumber).addClass("on").removeClass("waitPut")
			M.later(function() {
				doc.getElementById("inputBookCode").blur();
				M.toast(RMessage);
			}, 300);
			$('#inputBookCode').attr('data-bookNumber', '');
			removeBook(CellNumber);
		}else{
			M.toast(RMessage);
		}
	}
	var data = {
		bookShelfId: public_getBookShelfId(),
		cellNo: CellNumber,
		isbn: $('#inputBookCode').val().trim()
	}
	ajaxNoWait(MAIN_PATH_INT + globalAjax.putBook, data, success);

}