/**
 * 获取书籍类型接口
 */
function book_list_getBookTypeList() {
	var url = createAjaxURL(interface_name.method_book_type_list);
	var data = {

	}
	var success = function(response) {
		var listData = response.list;
		var listElement = doc.getElementById("ulBookType"),
			item,
			objlen = 0,
			newElement;
			listData.unshift({"typeName":"全部","typeId":""});
		for(var i = 0; i < listData.length; i++) {
			item = listData[i];
			newElement = doc.createElement("a");
			if(i == 0){
				newElement.className = "on-book-type tappable-scroll tappable";
			}else{
				newElement.className = "off-book-type tappable-scroll tappable";
			}
			newElement.dataset.action = "switchType";
			newElement.dataset.id = item.typeId;
			newElement.innerHTML = item.typeName;
			listElement.appendChild(newElement);
			objlen += newElement.offsetWidth;
		}
		var scrollWidth = 420 + 72 * (listData.length) + objlen;
		document.getElementById("ulBookType").style.width = scrollWidth + "px";
		ListMain('center');
	};
	util.ajax.getJSON(url, data, success);
}

/**
 * 获取书籍列表
 * @param {Object} direction
 */
function ListMain(direction) { //图书主体
	var url = createAjaxURL(interface_name.method_book_list);
	if(direction == "left" && PageIndex > 1) {
		PageIndex = PageIndex - 1;
	} else if(direction == "right" && PageIndex < PageTotal) {
		PageIndex = PageIndex + 1;
	} else {
		PageIndex = 1;
		PageTotal = 0;
	}
	if(PageIndex > PageTotal && PageTotal != 0 && direction == 'right') {
		return false;
	}
	var data = {
		macId: public_getBookShelfId(),
		typeId: BookType,
		pagesize: PageSize,
		page: PageIndex,
		keyword:keyWord
	}
	
	var success = function(response) {
		console.info(JSON.stringify(response));
		PageTotal = response.totalPage;
		if(PageTotal == 0) {
			$('.PageHTML').html('0/' + PageTotal);
		} else {
			$('.PageHTML').html(PageIndex + '/' + PageTotal);
		}
		$('.ListMain').empty();
		var DataMain = response.list;
		for(var i = 0; i < DataMain.length; i++) {
			var Item = DataMain[i];
			var MainImg = (Item.bookPic == "" ? "img/hjw_book_bg.jpg" : Item.bookPic);
			var MenuHtml = '<li class="book_item tappable" data-action="book_item" data-booklocation="' + Item.booklocation + '" data-bookpic="' + Item.bookPic + '" data-bookauthor="' + Item.bookAuthor + '" data-bookname="' + Item.bookName + '" data-bookcontent="' + Item.bookContent + '">';
			MenuHtml += '<img class="bookimg" src="' + MainImg + '"/>';
			MenuHtml += '</li>';
			$('.ListMain').append(MenuHtml);
		}
	}
	util.ajax.getJSON(url, data, success);
}

/**
 * 页面切换
 * @param {Object} type
 */
function PageChange(type){
	if(type == 'div_book_list_page'){
		div_book_list_page.hidden =false;
		div_book_item.hidden =true;
		div_search_book.hidden =true;
//		back.hidden =true;
		search_btn.hidden = false;
	}else if(type == 'search_book'){
		div_book_list_page.hidden =true;
		div_book_item.hidden =true;
		div_search_book.hidden =false;
//		back.hidden =false;
		search_btn.hidden =true;
	}
}

function ItemBookInfo(booklocation,bookpic,bookName,bookAuthor,bookContent) { //单个图书信息
	bookimg.src = bookpic;
	bookname.textContent = bookName;
	author.textContent = "作者:" + bookAuthor;
	booksite.textContent = booklocation;
	bookcontent.textContent = "内容简介:" + bookContent.substring(0,150);
	
}

function clear_input(){
	search_input.value ='';
}
