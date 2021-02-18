function get_book_id_by_cell_clear() {
	$("#inputCodeGetBookIdByCell").empty();
}

function get_book_id_by_cell_isSubmitOk() {
	if(submit_code_get_book_id_by_cell.length == 0) {
		mui.toast("请输入书格编号");
		return false;
	}
	return true;
}

function get_book_id_by_cell_submit(shelfNum) {
	var success = function(response) {
		var RMessage = response.msg;
		if(response.result == '1') {
			bookDetailId = response.bookId;
			index.openPage("book_detail");
		} else {
			mui.toast(RMessage);
		}
	}
	var data = {
		bookshelfId: public_getBookShelfId(),
		cell: '0' + shelfNum
	}
	localStorage.setItem('cellNum','0' + shelfNum);
	util.ajax.getJSONWaiting(ApiUrl + global_ajaxObjectLL.ListKeyboardGetId, data, success)
}