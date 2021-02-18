function getBookType() {
	var url = MAIN_PATH_INT + globalAjax.bookType;
	ajaxNoWait(url, {}, function(res) {

		var listElement = doc.getElementById("ulBookType"),
			listData = res.list,
			item,
			objlen = 0,
			newElement;
		$(listElement).empty();
		listData.unshift({
			"typeName": "全部",
			"typeId": ""
		})
		for(var i = 0, len = listData.length; i < len; i++) {
			item = listData[i];
			newElement = doc.createElement("dd");
			newElement.className = "tappable";
			newElement.dataset.action = "switchType";
			newElement.dataset.id = item.typeId;
			if(i == 0) {
				newElement.innerHTML = '<a class="on-book-type">' + item.typeName + '</a>';
				key_basket.push(newElement)
				key_basket[0].querySelector("a").className = "on-book-type";
			} else {
				newElement.innerHTML = '<a>' + item.typeName + '</a>';
			};

			listElement.appendChild(newElement);
			objlen += newElement.offsetWidth;
		}
		var scrollWidth = 120 + 72 * (listData.length) + objlen;
		document.getElementById("ulBookType").style.width = scrollWidth + "px";
		getSellBookList(key_basket[0].dataset.id);
	})
}

function getSellBookList(typeId) {
	var url = MAIN_PATH_INT + globalAjax.bookList;
	var curPage = getValue("bookList_cur");
	var data = {
		bookshelfId: public_getBookShelfId(),
		typeId: typeId,
		pagesize: BOOK_LIST_PAGE_SIZE,
		page: curPage
	}

	ajaxNoWait(url, data, function(res) {
		var listElement = doc.getElementById("sellbooks"),
			listData = res.list,
			totalPage = res.totalPage,
			item,
			newElement;
		listElement.innerHTML = "";
		doc.getElementById("bookList_total").innerText = totalPage;
		for(var i = 0, len = listData.length; i < len; i++) {
			item = listData[i];
			var imgsrc = item.bookPic,
				bookName = item.bookName,
				bookPrice = item.bookPrice;
			var newElement = doc.createElement("li");
			newElement.className = "sell_book_item  fl tappable";
			newElement.dataset.action = "bookDetail";
			newElement.dataset.id = item.bookId;
			newElement.innerHTML = '<a href="javascript:void(0)"><img class="bookimg" src="' + imgsrc + '" /> </a> <p class="sell_cplb_text">' + bookName + '<br><span class="b_price">&yen' + bookPrice + '<span></p>"'
			$(listElement).append(newElement);
		}
	})
}
/*
 * 个体图书信息详情
 */

function getBookInfo(bookId) {
	if(localStorage.getItem(LS.payType) == "ccb_pay"){
		document.getElementById('pay_page1').hidden = true;
		document.getElementById('pay_page2').hidden = false;
	}else{
		document.getElementById('pay_page1').hidden = false;
		document.getElementById('pay_page2').hidden = true;
	}
	var url = MAIN_PATH_INT + globalAjax.bookInfo;
	var data = {
		bookShelfId: public_getBookShelfId(),
		bookId: bookId
	}
	ajaxNoWait(url, data, function(res) {
		console.log(JSON.stringify(res));
		var cellNum = res.number;
		localStorage.setItem(LS.cellNum, cellNum);
		var book_cellId = res.bookCellId; //格子Id
		var bookCode = res.bookCode;
		var bookPrice = res.bookPrice;
		var bookContent = res.bookContent;
		var publishDate = res.bookDate; //出版时间
		var bookName = res.bookName;
		var book_author = res.bookAuthor;
		var bookPic = res.bookPic;
		var book_ewm = res.url; //图书二维码
		doc.getElementById("scan_bookAuthor").innerText = book_author;
		doc.getElementById("scan_bookContent").innerText = bookContent;
		doc.getElementById("scan_bookName").innerText = bookName;
		doc.getElementById("scan_publishDate").innerText = publishDate;
		doc.getElementById("scan_bookPrice").innerHTML = "&yen;" + bookPrice;
		$("#scan_bookPic").attr("src", bookPic);
		
		if(localStorage.getItem(LS.payType) == "ccb_pay"){
			lzfEwm(bookId, book_cellId);
		}else{
		  	wxEwm(bookId,book_cellId);
		  	zfbEwm(bookId,book_cellId);	
		}
		index.openPage("scan_sellbook");
	})
}

function wxEwm(bookId, cellId) {
	var url = MAIN_PATH_INT + globalAjax.weiXinEWM;
	var data = {
		bookId: bookId,
		bookCellId: cellId
	}
	ajax(url, data, function(res) {
		console.info(JSON.stringify(res));
		var text = res.urlCode;
		var liushui = res.liushui;
		$("#wxing_scan").empty();
		qrcodeMethod("wxing_scan", 242, 242, text);
		WX_COUNT_DOWN = setInterval(function() {
			WX_BuyCallback(bookId, liushui)
		}, 1000)

	})
}

function zfbEwm(bookId, cellId) {
	var url = MAIN_PATH_INT + globalAjax.zfbEWM;
	var data = {
		bookId: bookId,
		bookCellId: cellId
	}
	ajax(url, data, function(res) {
		var text = res.urlCode;
		var liushui = res.liushui;
		$("#zfbao_scan").empty();
		qrcodeMethod("zfbao_scan", 242, 242, text);
		ZFB_COUNT_DOWN = setInterval(function() {
			ZFB_BuyCallback(bookId, liushui);
		}, 1000)
	})
}

function lzfEwm(bookId, cellId) {
	var url = MAIN_PATH_INT + globalAjax.Ccb_Pay;
	var data = {
		bookId: bookId,
		bookCellId: cellId
	}
	ajax(url, data, function(res) {
		console.info(JSON.stringify(res));
		var text = res.urlCode;
		var liushui = res.liushui;
		$("#lzf_scan").empty();
		qrcodeMethod("lzf_scan", 300, 300, text);
		ZFB_COUNT_DOWN = setInterval(function() {
			LZF_BuyCallback(bookId, liushui);
		}, 1000)
	})
}

function qrcodeMethod(id, w, h, text) {
	var qrcode = new QRCode(id, {
		text: text,
		width: w,
		height: h,
		colorDark: '#000000',
		colorLight: '#ffffff',
		correctLevel: QRCode.CorrectLevel.H
	});
}

function WX_BuyCallback(bookId, liushui) {
	var url = MAIN_PATH_INT + globalAjax.ItemBuyCallBack;
	var data = {
		liushui: liushui
	};
	ajaxNoWait(url, data, function(res) {
		if(res.result == 1) {
			clearInterval(WX_COUNT_DOWN);
			ItemBuy("微信支付", bookId);
		}
	})
}

function ZFB_BuyCallback(bookId, liushui) {
	var url = MAIN_PATH_INT + globalAjax.ItemBuyZFBCallBack;
	var data = {
		out_trade_no: liushui
	};
	ajaxNoWait(url, data, function(res) {
		if(res.isSuccess == true) {
			clearInterval(ZFB_COUNT_DOWN);
			ItemBuy("支付宝支付", bookId)
		}
	})
}

function LZF_BuyCallback(bookId, liushui) {
	var url = MAIN_PATH_INT + globalAjax.ItemBuyLZFCallBack;
	var data = {
		liushui: liushui
	};
	ajaxNoWait(url, data, function(res) {
		console.info(JSON.stringify(res));
		if(res.result == 1) {
			clearInterval(ZFB_COUNT_DOWN);
			ItemBuy("龙支付支付", bookId)
		}
	})
}

function ItemBuy(stype, bookId) {
	var success = function(response) {
		var RMessage = response;
		if(response.result == '1') {
			var BookId = response.shelfNo;
			public_open(BookId, function(res) {
				$(".pop").css("display", "block");
			});
		}
	}
	var data = {
		bookShelfId: public_getBookShelfId(),
		bookId: bookId,
		number: localStorage.getItem(LS.cellNum),
		type: stype
	}
	ajaxNoWait(MAIN_PATH_INT + globalAjax.ItemBuy, data, success);
}