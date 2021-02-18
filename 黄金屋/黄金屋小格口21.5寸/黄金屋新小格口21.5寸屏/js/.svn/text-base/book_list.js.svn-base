/**
 * 获取书籍类型接口
 */
function book_list_getBookTypeList() {
	var url = createAjaxURL(interface_name.method_book_type_list);
	var data = {
		bookShelfId: public_getBookShelfId()
	}
	var success = function(response) {
		var listData = response.list;
		var listElement = doc.getElementById("ulBookType"),
			item,
			objlen = 0,
			newElement;
			listData.unshift({"typeName":"全部","typeId":""});
		listElement.innerHTML = '';
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
		bookshelfId: public_getBookShelfId(),
		typeId: BookType,
		pagesize: PageSize,
		page: PageIndex
	}
	
	var success = function(response) {
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
			var MainImg = (Item.bookPic == "" ? "images/defaultList.jpg" : Item.bookPic);
			var MenuHtml = '<li class="book_item tappable" data-action="book_item" data-value="' + Item.bookId + '">';
			MenuHtml += '<img class="bookimg" src="' + MainImg + '"/>';
			MenuHtml += '<P class="cplb_text">' + Item.bookName + '</P>';
			MenuHtml += '</li>';
			$('.ListMain').append(MenuHtml);
		}
	}
	util.ajax.getJSON(url, data, success);
}



function ItemBookInfo() { //单个图书信息
	var url = createAjaxURL(interface_name.method_book_detail);
	var data = {
		bookShelfId: public_getBookShelfId(),
		bookId: localStorage.getItem(localcacheName.bookItemId),
		cell: (localStorage.getItem(localcacheName.geziNumber) == null ? '' : localStorage.getItem(localcacheName.geziNumber))
	}
	util.encrypt.MD5Data(data);
	var success = function(response) {
		if(response.result == 0){//当返回为无此书籍信息时，返回上一页
			mui.toast(response.msg);
		}else{
			PageChange('div_book_item');
			document.getElementById('bookimg').src = response.bookPic;
			document.getElementById('bookname').textContent = response.bookName;
			ItembookCode = response.bookCode;
//			localStorage.setItem(localcacheName.bookCode,response.bookCode);
			document.getElementById('author').textContent = "作者:" + (response.bookAuthor == undefined ? "-" : response.bookAuthor);
			document.getElementById('time').textContent = "出版时间:" +  (response.bookDate == undefined ? "-" : response.bookDate);
			document.getElementById('abstract').textContent = "简介:" + (response.bookContent == undefined ? "-" : response.bookContent.substring(0,100));
			$("#bookshelf_QR").empty();
			qrcodeMethod("bookshelf_QR", 242, 242, response.QRCode);
		}
	}
	util.ajax.getJSON(url, data, success);
}

document.addEventListener('swipeleft',function(event){//左滑
	ListMain('right');
});

document.addEventListener('swiperight',function(event){//右滑
	ListMain('left');
});

function KeywordSumbit() {
	var cell = document.getElementById('inputCodeGetBookIdByCell').textContent;
	if(!isNumber(cell)){
		mui.toast('请输入正确的格口号');
		return;
	}
	switch(cell.length){
		case 3:
			cell = '0' + cell;
			break;
		case 2:
			cell = '00' + cell;
			break;
		case 1:
			cell = '000' + cell;
			break;
		case 0:
			mui.toast('请输入正确的格口号');
			return;
			break;
	}
	var success = function(response) {
		var RMessage = response.msg;
		if(response.result == '1') {
			var BookId = response.bookId;
			localStorage.setItem(localcacheName.bookItemId, BookId)
			localStorage.setItem(localcacheName.geziNumber, cell);
			document.getElementById("keyboardArea").style.display = "none";
			ItemBookInfo();
		} else {
			mui.toast(RMessage);
		}
	}
	var url = createAjaxURL(interface_name.method_get_book_id_by_cell);
	var data = {
		bookshelfId: public_getBookShelfId(),
		cell: cell
	}
	util.ajax.getJSON(url, data, success);
}

/**
 * 提交输入的数据判断
 */
function input_code_isSubmitOk(){
	inputUserNameLogin = document.getElementById('inputUserNameLogin').textContent;
	inputPassWordLogin = document.getElementById('inputPassWordLogin').textContent;
	if(inputUserNameLogin.length == 0){
		mui.toast("请输入账号");
		return false;
	}
	if(inputPassWordLogin.length == 0){
		mui.toast("请输入密码");
		return false;
	}
	return true;
}

/**
 * 借书操作
 */
function borrowBookByName() {
	var url = createAjaxURL(interface_name.method_borrow_book_star);
	var data = {
		bookShelfId:public_getBookShelfId(),
		bookCode: ItembookCode,
		userName: inputUserNameLogin,
		pwd:inputPassWordLogin
	};
	util.encrypt.MD5Data(data);
	var success = function(response) {
		mui.toast(response.msg);
		console.info(JSON.stringify(response));
	};
	util.ajax.getJSON(url, data, success);
}