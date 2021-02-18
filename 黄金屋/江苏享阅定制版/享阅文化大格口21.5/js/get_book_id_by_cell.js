function get_book_id_by_cell_init(){
	submit_code_get_book_id_by_cell = "";
    $("#inputCodeGetBookIdByCell").empty();
	glo_randomCodeBookDetail = "";
	glo_cellNoBookDetail = "";
	glo_bookNameBookDetail = "";
	localStorage.removeItem(global_localStorage.userId);
}

function get_book_id_by_cell_isSubmitOk(){
	if(submit_code_get_book_id_by_cell.length == 0){
		mui.toast("请输入书格编号");
		return false;
	}
	return true;
}

function get_book_id_by_cell_submit(cellnum){		

OPEN_CELLNUM=cellnum;
index.openPage("login_student");

}