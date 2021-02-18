function cell_list_getCellList(){
	var ao = global_ajaxObject.setting;
	var url = util.str.createAjaxURL(ao, ao.method_multi_cell_list);
	var data = {
		bookShelfId: public_getBookShelfId(),
		pagesize: glo_pageControllerCellList.countPerPage,
		page: glo_pageControllerCellList.currentPage
	};
	util.encrypt.MD5Data(data);	
	var success = function(response){
		glo_pageControllerCellList.totalPage = response.totalPage;
		cell_list_setPageIndex(glo_pageControllerCellList);		
		var _document = document,
			listElement = _document.getElementById("listCells"),
			listData = response.list,
			item,
			newElement;			
		    listElement.innerHTML = "";		
		for(var i=0, len=listData.length; i<len; i++){
			item = listData[i];
			newElement = _document.createElement("li");
			newElement.className = "tappable cell" + item.number;
			newElement.dataset.action = "open";
			newElement.dataset.id = item.number;
			newElement.innerHTML = '<a></a>';
			cell_list_setCellState(newElement, item.bookList.length > 0 ? global_doorState.OCCUPIED : global_doorState.EMPTY, "");
			listElement.appendChild(newElement);			
		}
		$('.tappable').off('touchstart');
		$('.tappable').on('touchstart', function(event){		
			tapHandler($(this),event);
		});
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
	glo_pageControllerCellList = null;
	document.getElementById("listCells").innerHTML = "";
}
function cell_list_isRemoveBookOk(){
	if(cell_list_getOpenCell()){
		    mui.toast("书柜已打开", {duration:'long', type:'div'});		    
		    return false;
	}
	        return true;
}

function cell_list_managerCloseDoor(cellNo, bookCodes){	
	var ao = global_ajaxObject.setting;
	var url = util.str.createAjaxURL(ao, ao.method_manager_close_door);
	var data = {
		bookShelfId: public_getBookShelfId(),
		cellNo: cellNo,
		bookCodes: bookCodes.join(",")
	};
	util.encrypt.MD5Data(data);	
	var success = function(response){
		mui.toast(response.msg, { duration:'long', type:'div' });
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
function cell_list_setCellState(cell, state, bookName){
	var a = cell.querySelector("a");
	switch(state){
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

function cell_list_setPageIndex(pageController){	
	document.getElementById("pageIndexCellList").innerHTML = '<em>' + pageController.currentPage + '</em>  /  ' + pageController.totalPage;
	
}

