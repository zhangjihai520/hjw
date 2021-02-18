var LDeviceNumber = ['设备号', '設備號', 'DeviceNumber'];
var LBookshelf = ['书架', '書架', 'Bookshelf'];
var LBorrowBook = ['借书', '借書', 'BorrowBook'];
var LBook = ['还书', '還書', 'Book'];
var LHelp = ['帮助', '幫助', 'Help'];
var LDownload = ['下载客户端', '下載客戶端', 'Download'];

var languageData = [
	['设备号', '設備號', 'DeviceNumber'],
	['书架', '書架', 'Shelf'],
	['借书', '借書', 'Borrow'],
	['还书', '還書', 'Return'],
	['帮助', '幫助', 'Help'],
	['下载客户端', '下載客戶端', 'Download'],
	['取书', '取書', 'Take'],
	['主页', '主頁', 'Home'],
	['扫一扫借书', '掃壹掃借書', 'Scan'],
	['图书编号', '圖書編號', 'BookNumber'],
	['作者', '作者', 'Author'],
	['出版时间', '出版時間', 'PublicationTime'],
	['简介', '簡介', 'Introduction'],
	['请输入验证码', '請輸入驗證碼', 'please enter verification code'],
	['清空', '清空', 'Empty'],
	['确定', '確定', 'OK'],
	['柜门已打开', '櫃門已打開', 'The door is opened'],
	['报修', '報修', 'Report'],
	['购书', '購書', 'Buy'],
	['返回', '返回', 'Back'],
	['请输入箱柜编号', '請輸入箱櫃編號', 'Please enter the number'],
];

function languageHTML(LType) { //0简体  1繁体  2英文

	$('.language').each(function() {
		var Lname = $(this).attr('data-name');
		switch(Lname) {
			case 'LDeviceNumber':
				Lname = LDeviceNumber[LType];
				break;
			case 'LBookshelf':
				Lname = LBookshelf[LType];
				break;
			case 'LBook':
				Lname = LBook[LType];
				break;
			case 'LHelp':
				Lname = LHelp[LType];
				break;
			case 'LDownload':
				Lname = LDownload[LType];
				break;
		}

		var SelHtml = $(this).html();
		var LChinese = SelHtml.replace(/[^\u4e00-\u9fa5]/gi, "");

		//$('#DemoCESHI').html(asddwq.replace("" + LChinese + "", Lname));
		$(this).html(SelHtml.replace("" + LChinese + "", Lname));
		//$(this).html('123');
		//alert($(this).html());
	})

}

function LoadHtmlLanguage(Lytpe) {

	//alert(languageData[0]);
	$('*').each(function() {
		var SelHtml = $(this).html();
		var rep = "";

		var LChinese = SelHtml.replace(/[^\u4e00-\u9fa5]/gi, "");
		if(LChinese == "") {
			rep = SelHtml.replace(/<[^>]+>/g, "");
		} else {
			rep = LChinese;
		}

		//console.log(LChinese);

		if($(this).find('a').length < 1) {
			for(var i = 0; i < languageData.length; i++) {
				if(languageData[i].indexOf(rep) > -1) {

					$(this).html(SelHtml.replace("" + rep + "", languageData[i][Lytpe]));
					//console.log($(this).html());
				}
			}
		}

		var ssp = $('.Hdevice').html().split(':');
		var dNumber = (localStorage.getItem(global_localStorage.shelfNo) == null ? "-" : localStorage.getItem(global_localStorage.shelfNo));
		$('.Hdevice').html(languageData[0][Lytpe] + ":" + dNumber);
		//$('.Hdevice').html($('.Hdevice').html().replace("" + rep + "", languageData[0][Lytpe]));
		//alert(LChinese);
	})

	//	var asdaa = $('body').html();
	//	var LChinese = asdaa.replace(/[^\u4e00-\u9fa5]/gi, "");
	//	alert(LChinese);
}

function GetNameByType(Ltype, Lname) {
	var Result = '';
	switch(Lname) {
		case 'DeviceNumber':
			Result = LDeviceNumber[Ltype];
			break;
	}

	return Result;
}