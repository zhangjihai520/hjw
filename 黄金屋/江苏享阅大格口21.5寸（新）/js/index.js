/**
 * 页面切换
 * @param {Object} type
 */
function PageChange(type){
	document.getElementById("keyboardArea").style.display = "none";
	if(type.action == 'borrow_book'){
		PageIndex = 1;
		PageTotal = 0;
		BookType = "";
		
		ItembookCode = '';
		inputUserNameLogin = '';
		inputPassWordLogin = '';
	
		div_home.hidden = true;
		div_book_list_page.hidden = false;
		back.hidden = false;
		timerTask(120,"gl_time_cw",'back_home');
//		document.getElementById('orgQr').src = localStorage.getItem(localcacheName.method_orgQrCodeUrl);
		book_list_getBookTypeList();
		document.querySelector(".cell_input").value = "";	
	}else if(type.action == 'return_book'){
		div_home.hidden = true;
		div_return_book.hidden = false;
		back.hidden = false;
		timerTask(60,"gl_time_cw_return",'back_home');
		setTimeout(function() {
			return_book_state(type)
		}, 300);
		initNativeObjects();
		showSoftInput();
	}else if(type == 'booklist'){
		booklistHeader.className = 'booklistHeader yellow_l';
		left_text.style.color = '#3290c1';
		right_text.style.color = '#FFF';
		booklist.hidden = false;
		serchbyid.hidden = true;
	}else if(type == 'get_book_id_by_cell'){
		document.getElementById('inputCodeGetBookIdByCell').textContent = '';
		booklistHeader.className = 'booklistHeader yellow_r';
		left_text.style.color = '#FFF';
		right_text.style.color = '#3290c1';
		serchbyid.hidden = false;
		booklist.hidden = true;
	}else if(type == 'div_book_list_page'){
		timerTask(120,"gl_time_cw",'back_home');
		div_book_list_page.hidden = false
		div_book_item.hidden = true;
	}else if(type == 'div_book_item'){
		timerTask(120,"gl_time_cw_item",'back_home');
		div_book_list_page.hidden = true;
		div_book_item.hidden = false;
	}
}