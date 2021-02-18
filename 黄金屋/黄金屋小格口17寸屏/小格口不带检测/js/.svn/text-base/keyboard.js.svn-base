/*
 * keyboard
 */
function keyboardOperation(writeInput, keyboardValue) {
	if(keyboardValue == "backspace") {
		rmgb();
		if(writeInput.classList.contains("compw")) {
			var childs = writeInput.childNodes;
			if(childs.length > 0) {
				writeInput.removeChild(childs[childs.length - 1])
			};
			writeInput.innerHTML += '';
		} else {
			writeInput.innerHTML = (writeInput.innerHTML).substring(0, (writeInput.innerHTML).length - 1) + '';
		}

	} else if(keyboardValue == "packUp") {
		keyboardArea.style.display = 'none';
	} else {
		rmgb();
		switch(inputType) {
			case "0":
				writeInput.innerHTML += keyboardValue;
				break;
			case "1":
				writeInput.innerHTML += '<span class="fakepw">' + keyboardValue + '</span>';
				break;
		}
	}
}

/*
 * keyboard
 */
function keyboardOperation1(writeInput, keyboardValue,inputType) {
	if(keyboardValue == "backspace") {
		rmgb();
		if(writeInput.classList.contains("compw")) {
			var childs = writeInput.childNodes;
			if(childs.length > 0) {
				writeInput.removeChild(childs[childs.length - 1])
			};
			writeInput.innerHTML += '';
		} else {
			writeInput.innerHTML = (writeInput.innerHTML).substring(0, (writeInput.innerHTML).length - 1) + '';
		}

	} else if(keyboardValue == "packUp") {
		keyboardArea.style.display = 'none';
	} else {
		rmgb();
		switch(inputType) {
			case "0":
				writeInput.innerHTML += keyboardValue + ''
				break;
			case "1":
				writeInput.innerHTML += '<span class="fakepw">' + keyboardValue + '</span>' + '';
				break;
		}
	}
}

function showKeyBoard() {
	doc.getElementById("keyboardArea").style.display = "block";
	switch(index.getActivePageId()) {
		case "login":
			writeInput = doc.querySelector(".public-focused-input-login");
			break;
		case "login_student":
			writeInput = doc.querySelector(".public-focused-input-login-student");
			break;
		case "get_book_id_by_cell":
			writeInput = doc.getElementById("inputCodeGetBookIdByCell");
			break;
		case "input_code":
			writeInput = doc.getElementById("inputCodeInputCode");
			break;
		case "search":
			writeInput = doc.getElementById("inputBookSearch");
			break;
		case "set_shelf_no":
			writeInput = doc.querySelector(".public-focused-setShief-input");
			break;
		case "book_detail":
			writeInput = doc.querySelector(".public-focused-input-book-detail");
			break;
		case "changePassword":
			writeInput = doc.querySelector(".modify");
			break;
		default:
			alert(writeInput);
	}
}

function changeCss(o) {
	key_basket.push(o)
	o.style.backgroundColor = "red";
}

function rmgb() {
	$("img.gb").remove();
}