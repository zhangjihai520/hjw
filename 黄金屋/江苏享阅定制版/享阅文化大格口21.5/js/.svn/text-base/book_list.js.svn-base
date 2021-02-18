function book_list_displayTypes(){
//	var switchElement = document.getElementById("liSwitch"),
//		ulBookType = document.getElementById("ulBookType");	
//	if(switchElement.classList.contains("open-book-type")){
//		ulBookType.style.display = "block";
//	}else{
//		ulBookType.style.display = "none";
//	}	
}

function book_list_getBookList() {
	var ao = global_ajaxObject.product;
	var url = util.str.createAjaxURL(ao, ao.method_book_list);
	var data = {
		bookshelfId: public_getBookShelfId(),
		typeId: book_list_getSelectedTypeId(),
//		typeId: "",
		pagesize: 12,
		page: glo_pageControllerBookList.currentPage
	};
	util.encrypt.MD5Data(data);
	var success = function(response) {
		if(glo_pageControllerBookList){		
			glo_pageControllerBookList.totalPage = response.totalPage||1;
		}		
		book_list_setPageIndex(glo_pageControllerBookList);
		var _document = document,
			listElement = _document.getElementById("ulBooks"),
			listData = response.list,
			item,
			newElement;
		    listElement.innerHTML = "";
		for(var i = 0, len = listData.length; i < len; i++) {
			item = listData[i];
			newElement = _document.createElement("li");
			newElement.className = "tappable-scroll";
			newElement.dataset.action = "bookDetail";
			newElement.dataset.id = item.bookId;
			newElement.innerHTML = '<div><a><img src="images/book_cover.png" data-src="' + global_imgURL + item.bookPic + '" onload="load(this)"   width="160" height="200" /></a></div><p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' + item.bookName + '</p>';			  
			listElement.appendChild(newElement);
		}
		
		$('.tappable-scroll').off('tap');
		$('.tappable-scroll').on('tap', function(){
			tapHandler($(this),null);
		});
	};
	util.ajax.getJSON(url, data, success);
}
function book_list_getBookTypeList() {
	var ao = global_ajaxObject.product;
	var url = util.str.createAjaxURL(ao, ao.method_book_type_list);
	var data = {
		bookShelfId: localStorage.getItem(global_localStorage.shelfId)
	};
	var success = function(response) {
//		console.log(JSON.stringify(response));
			var _document = document,
			listElement = _document.getElementById("ulBookType"),
			listData = response.list,
			item,			
			objlen=0,
			newElement;
		for(var i = 0, len = listData.length; i < len; i++) {
			item = listData[i];
			newElement = _document.createElement("dd");
			newElement.className = "tappable-scroll";
			newElement.dataset.action = "switchType";
			newElement.dataset.id = item.typeId;
			newElement.innerHTML = '<a>'+item.typeName+'</a>';
			listElement.appendChild(newElement);
			objlen+=newElement.offsetWidth;
		}						
		var scrollWidth=120+72*(listData.length)+objlen;
		     document.getElementById("ulBookType").style.width=scrollWidth+"px"
//		     console.log(scrollWidth)			
				$('.tappable-scroll').off('tap');
		$('.tappable-scroll').on('tap', function(event){
			tapHandler($(this),event);
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

function book_list_init(){
	glo_pageControllerBookList = null;
//	document.getElementById("ulBookType").innerHTML = "";
	document.getElementById("ulBooks").innerHTML = "";
}
function book_list_setPageIndex(pageController) {
	if(pageController){
			document.getElementById("pageIndexBookList").innerHTML = pageController.currentPage + "/" + pageController.totalPage;
	}

}