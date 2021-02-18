/**
 * 获取上书列表
 */
function cell_list_getCellList() {
	var url = createAjaxURL(interface_name.method_cell_list);
	var data = {
		bookShelfId: public_getBookShelfId(),
		pagesize: countPerPage,
		page: currentPage
	};
	util.encrypt.MD5Data(data);
	var success = function(response) {
		console.info(JSON.stringify(response));
		totalPage = response.totalPage;
		celllistSetPage(cellListPageController)
		var listElement = doc.getElementById("cellList"),
			listData = response.list,
			item,
			newElement;
		listElement.innerHTML = "";
		for(var i = 0, len = listData.length; i < len; i++) {
			item = listData[i];
			newElement = doc.createElement("li");
			newElement.className = "tappable cell" + item.number;
			newElement.dataset.action = "removeBook";

			newElement.dataset.id = item.number;
			newElement.innerHTML = '<a></a>';
			setCellState(newElement, item.isEmpty, item.bookName);
			listElement.appendChild(newElement);
		}
		document.getElementById("inputBookCode").focus();
	};
	util.ajax.getJSON(url, data, success);
}

function cell_list_handleInputBookCode() {
	var openCell = getOpenCell();
	var inputBookCode = document.getElementById("inputBookCode"),
		bookCode = inputBookCode.value.trim();
	if(openCell != null && bookCode.length >= global_BOOK_CODE_LENGTH) {
		var str = bookCode;
		var bookEncoding = str.substring(0, global_BOOK_CODE_LENGTH);
		mui.toast("读取成功");
		putBook(bookEncoding, openCell);
	}
}

function putBook(bookCode, openCell) {
	var url = createAjaxURL(interface_name.method_put_book);
	var data = {
		bookShelfId: public_getBookShelfId(),
		cellNo: openCell.dataset.id,
		bookCode: bookCode
	};
	util.encrypt.MD5Data(data);
	var success = function(response) {
		switch(response.result) {
			case global_ajaxResult.SUCCESS:
				setCellState(openCell, global_doorState.OCCUPIED, response.bookName);
				break;
			case global_ajaxResult.FAILED:
			case global_ajaxResult.SIGN_ERROR:
				break;
		}
	};
	util.ajax.getJSONWaiting(url, data, success);
	$('#inputBookCode').val('');
}

/*
 * (li element)cell
 */
function removeBook(cell) {
	var url = createAjaxURL(interface_name.method_remove_book);
	var data = {
		bookShelfId: public_getBookShelfId(),
		cellNo: cell.dataset.id
	};
	util.encrypt.MD5Data(data);
	var success = function(response) {
		console.log("remove book:" + JSON.stringify(response));
		switch(response.result) {
			case global_ajaxResult.SUCCESS:
				document.getElementById("inputBookCode").focus();
				//清书成功，开门
				public_open(cell.dataset.id, function(openResult) {
					console.info("111===" + JSON.stringify(openResult))
					if(openResult.success) {
						mui.toast(openResult.data);
						setCellState(cell, global_doorState.OPEN);
					}
				});
				break;
			case global_ajaxResult.FAILED:
			case global_ajaxResult.SIGN_ERROR:
				break;
		}
	};
	util.ajax.getJSONWaiting(url, data, success);
}
/*
 * 根据格的状态来设置样式
 * (li element)cell
 * (number)state
 */
function setCellState(cell, state, bookName) {
	var a = cell.querySelector("a");
	switch(state) {
		case global_doorState.EMPTY:
			if(bookName != null){
				a.className = "no_return";
				a.innerHTML = cell.dataset.id + '<br>' + bookName + '<br>' + '(未归还)';
			}else{
				a.className = "";
				a.innerHTML = cell.dataset.id;
			}
			break;
		case global_doorState.OCCUPIED:
			a.className = "on";
			a.innerHTML = cell.dataset.id + '<br>' + bookName;
			break;
		case global_doorState.OPEN:
			a.className = "open";
			a.innerHTML = cell.dataset.id;
			break;
	}
}

function celllistSetPage(pageController) {
	document.getElementById("cellListSetPage").innerHTML = currentPage + "/" + totalPage;
}

function getOpenCell() {
	var openCell = document.getElementById("cellList").querySelector("a.open");
	if(openCell) {
		return openCell.parentNode;
	} else {
		return null;
	}
}

function isRemoveBookOk() {
	if(getOpenCell()) {
		mui.toast("书柜已打开");
		return false;
	}
	return true;
}

function cell_list_getOpenCell() {
	var openCell = document.getElementById("listCells").querySelector("a.open");
	if(openCell) {
		return openCell.parentNode;
	} else {
		return null;
	}
}

function cell_list_init() {
	glo_pageControllerCellList = null;
	document.getElementById("listCells").innerHTML = "";
}

function cell_list_isRemoveBookOk() {
	if(cell_list_getOpenCell()) {
		mui.toast("书柜已打开");
		return false;
	}
	return true;
}

/*
 * 根据格的状态来设置样式
 * (li element)cell
 * (number)state
 */
function cell_list_setCellState(cell, state, bookName) {
	var a = cell.querySelector("a");
	switch(state) {
		case global_doorState.EMPTY:
			a.className = "";
			a.innerHTML = cell.dataset.id;
			break;
		case global_doorState.OCCUPIED:
			a.className = "on";
			//a.innerHTML = cell.dataset.id + '<br>' + bookName;
			a.innerHTML = cell.dataset.id;
			break;
		case global_doorState.OPEN:
			a.className = "open";
			a.innerHTML = cell.dataset.id;
			break;
	}
}

function cell_list_setPageIndex(pageController) {
	document.getElementById("pageIndexCellList").innerHTML = '<em>' + pageController.currentPage + '</em>  /  ' + pageController.totalPage;
}