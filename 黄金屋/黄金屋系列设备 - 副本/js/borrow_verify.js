function read_card_state(){
	document.getElementById("inputBookCodeReturnBook").focus();
	document.getElementById("inputBookCodeReturnBook").value = "";
	document.getElementById("inputBookCodeReturnBook").addEventListener("input", read_card_handleInputBookCode, false);
}
function read_card_clear(){
	document.getElementById("inputBookCodeReturnBook").value = "";
	document.getElementById("inputBookCodeReturnBook").removeEventListener("input", read_card_handleInputBookCode, false);
}
function read_card_handleInputBookCode() {
	var inputBookCode = document.getElementById("inputBookCodeReturnBook");
	readCardCode(inputBookCode);
}

function readCardCode(obj) {
	if($(obj).val().length >= card_length) {
		var str = $(obj).val();
		var bookEncoding = str.substring(0, card_length);
		read_card_clear();
		console.info(bookEncoding);
		if(borrow_type == 0){
			borrow_all(bookEncoding);
		}else if(borrow_type == 1){
			BorrowingList(bookEncoding);
		}else if(borrow_type == 2){
			BorrowingList_scan(bookEncoding);
		}
	}
}