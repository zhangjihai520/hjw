/**
 * 获取上书列表
 */
function cell_list_getCellList() {
	var url = createAjaxURL(interface_name.method_multi_cell_list);
	var data = {
		bookShelfId: public_getBookShelfId(),
		pagesize: countPerPage,
		page: currentPage
	};
	util.encrypt.MD5Data(data);	
	var success = function(response){
		totalPage = response.totalPage;	
		var _document = document,
			listElement = _document.getElementById("listCells"),
			listData = response.list,
			item,
			newElement;
		    listElement.innerHTML = "";
		    console.info(JSON.stringify(response));
		for(var i=0, len=listData.length; i<len; i++){
			item = listData[i];
			newElement = _document.createElement("li");
			newElement.className = "tappable cell" + item.number;
			newElement.dataset.action = "open";
			newElement.dataset.id = item.number;
			newElement.innerHTML = '<a></a>';
			cell_list_setCellState(newElement, item.bookList.length > 0 ? global_doorState.OCCUPIED : global_doorState.EMPTY, item.bookList.length);
			listElement.appendChild(newElement);			
		}
	};
	util.ajax.getJSON(url, data, success);
}

function cell_list_getOpenCell(){
	var openCell = document.getElementById("listCells").querySelector("a.open");
	if(openCell){
		return openCell.parentNode;
	}else{
		return null;
	}
}

function cell_list_init(){
	document.getElementById("listCells").innerHTML = "";
}
function cell_list_isRemoveBookOk(){
	if(cell_list_getOpenCell()){
		mui.toast("书柜已打开");		    
		return false;
	}
	return true;
}

function cell_list_managerCloseDoor(cellNo, bookCodes){
	var url = createAjaxURL(interface_name.method_manager_close_door);
	if(bookCodes == ''){
		var data = {
			bookShelfId: public_getBookShelfId(),
			cellNo: cellNo,
			bookCodes: ''
		};
	}else{
		var data = {
			bookShelfId: public_getBookShelfId(),
			cellNo: cellNo,
			bookCodes: bookCodes.join(",")
		};
	}

	util.encrypt.MD5Data(data);	
	var success = function(response){
		cell_list_getCellList();
		switch(response.result){
			case global_ajaxResult.SUCCESS:									
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
function cell_list_setCellState(cell, state, bookListSize){
	var a = cell.querySelector("a");
	switch(state){
		case global_doorState.EMPTY:
			a.className = "";
			a.innerHTML = cell.dataset.id;
			break;
		case global_doorState.OCCUPIED:
			a.className = "on";
			a.innerHTML = cell.dataset.id + '<br>' + '(' + bookListSize + ')本';
			break;
		case global_doorState.OPEN:
			a.className = "open";
			a.innerHTML = cell.dataset.id;
			break;
	}
}

function cell_list_setPageIndex(){	
	document.getElementById("pageIndexCellList").innerHTML = '<em>' + currentPage + '</em>  /  ' + totalPage;
}