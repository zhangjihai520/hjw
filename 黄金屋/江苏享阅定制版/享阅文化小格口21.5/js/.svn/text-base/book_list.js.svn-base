function book_list_displayTypes() {
	//	var switchElement = document.getElementById("liSwitch"),
	//		ulBookType = document.getElementById("ulBookType");	
	//	if(switchElement.classList.contains("open-book-type")){
	//		ulBookType.style.display = "block";
	//	}else{
	//		ulBookType.style.display = "none";
	//	}	
}

/*
 * 获取图书列表
 */
function book_list_getBookList() {
	var url = ApiUrl + global_ajaxObjectLL.ListMain;
	var data = {
		bookshelfId: public_getBookShelfId(),
		typeId: book_list_getSelectedTypeId(),
		pagesize: glo_pageControllerBookList.countPerPage,
		page: glo_pageControllerBookList.currentPage
	};
	//   console.log(JSON.stringify(data))
	util.encrypt.MD5Data(data);
	var success = function(response) {
		//		console.log(JSON.stringify(response));		
		glo_pageControllerBookList.totalPage = response.totalPage;
		book_list_setPageIndex(glo_pageControllerBookList);
		var listElement = doc.getElementById("ulBooks"),
			listData = response.list,
			item,
			newElement;
		listElement.innerHTML = "";

		for(var i = 0, len = listData.length; i < len; i++) {
			item = listData[i];
			newElement = doc.createElement("li");
			newElement.className = "tappable-scroll";
			newElement.dataset.action = "bookDetail";
			newElement.dataset.id = item.bookId;
			newElement.innerHTML = '<div><a><img src="images/book_cover.png" data-src="' + item.bookPic + '" onload="load(this)"   width="160" height="200" /></a></div><p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' + item.bookName + '</p>';
			listElement.appendChild(newElement);
		}
		$('.tappable-scroll').off('tap');
		$('.tappable-scroll').on('tap', function() {
			tapHandler($(this), null);
		});
	};
	util.ajax.getJSON(url, data, success);

}

function book_list_getBookTypeList() {
	glo_pageControllerBookList = new PageController(glo_countPerPageBookList);
	var url = ApiUrl + global_ajaxObjectLL.ListMenu;
	var data = {
		bookShelfId: localStorage.getItem(global_localStorage.shelfId)
	}
	var success = function(response) {
		var listElement = doc.getElementById("ulBookType"),
			listData = response.list,
			item,
			objlen = 0,
			newElement;
		for(var i = 0; i < listData.length; i++) {
			item = listData[i];
			newElement = doc.createElement("dd");
			newElement.className = "tappable-scroll";
			newElement.dataset.action = "switchType";
			newElement.dataset.id = item.typeId;
			newElement.innerHTML = '<a>' + item.typeName + '</a>';
			listElement.appendChild(newElement);
			objlen += newElement.offsetWidth;
		}
		var scrollWidth = 420 + 72 * (listData.length) + objlen;
		document.getElementById("ulBookType").style.width = scrollWidth + "px"
		$('.tappable-scroll').off('tap');
		$('.tappable-scroll').on('tap', function(event) {
			tapHandler($(this), event);
		});

		book_list_getBookList();
	};
	util.ajax.getJSON(url, data, success);
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

function book_list_clear() {
	glo_pageControllerBookList = null;
	$("#inputCodeGetBookIdByCell").empty();
	//	document.getElementById("ulBookType").innerHTML = "";
	document.getElementById("ulBooks").innerHTML = "";
	/*
	 * 清除监听
	 */
	var rm_Listener_Obj = doc.getElementById("ulBooks");
	rm_Listener_Obj.removeEventListener("touchstart", touchMethod, false);
	rm_Listener_Obj.removeEventListener("touchend", touchMethod, false);

}

function book_list_setPageIndex(pageController) {
	document.getElementById("pageIndexBookList").innerHTML = pageController.currentPage + "/" + pageController.totalPage;
}