/**
 * 获取上书列表
 * cell_list_type:0 表示正常上书界面列表，1 表示一键录书界面列表
 */
function cell_list_getCellList(cell_list_type) {
	var url = createAjaxURL(interface_name.method_cell_list);
	var data = {
		bookShelfId: public_getBookShelfId(),
		pagesize: countPerPage,
		page: currentPage
	};
	util.encrypt.MD5Data(data);
	var success = function(response) {
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
	};
	util.ajax.getJSON(url, data, success);
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

