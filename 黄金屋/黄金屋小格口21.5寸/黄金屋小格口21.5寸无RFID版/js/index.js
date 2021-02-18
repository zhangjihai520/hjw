/**
 * 页面切换
 * @param {Object} type
 */
function PageChange(type){
	if(type.action == 'return_book'){
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
		left_text.style.color = '#FDD017';
		right_text.style.color = '#333';
		booklist.hidden = false;
		serchbyid.hidden = true;
	}else if(type == 'get_book_id_by_cell'){
		booklistHeader.className = 'booklistHeader yellow_r';
		left_text.style.color = '#333';
		right_text.style.color = '#FDD017';
		serchbyid.hidden = false;
		booklist.hidden = true;
	}
}