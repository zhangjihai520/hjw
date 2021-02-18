function rmgb() {
	$("img.gb").remove();
}

function addgb(dom) {
	dom.innerHTML += '<img  class="gb"  src="images/guangbiao.gif" alt=""/>'
}
function hiddenKeyboard() {
	rmgb();
	clearLastKeyCss()
	document.getElementById("keyboardArea").style.display = "none"
}

/*
 * click到的输入框,对其class进行添加
 */
function selectInput(wrapper, comClass, flowClass) {
	var inputs = document.querySelectorAll("." + comClass);
	for(var i = 0; i < inputs.length; i++) {
		inputs[i].classList.remove(flowClass)
	}
	wrapper.classList.add(flowClass);
}

/*
 * keyboard
 */
function keyboardOperation(writeInput, keyboardValue) {
	rmgb();
	if(keyboardValue == "backspace") {
		if(writeInput.classList.contains("compw")) {
			var childs = writeInput.childNodes;
			if(childs.length > 0) {
				writeInput.removeChild(childs[childs.length - 1])
			};
			writeInput.innerHTML += '<img class="gb" src="images/guangbiao.gif" alt="" />';
		} else {
			writeInput.innerHTML = (writeInput.innerHTML).substring(0, (writeInput.innerHTML).length - 1) + '<img  class="gb"  src="images/guangbiao.gif" alt="" />';
		}
	} else if(keyboardValue == "packUp") {
		hiddenKeyboard();
	} else {
		switch(inputType) {
			case "0":
				writeInput.innerHTML += keyboardValue + '<img  class="gb"  src="images/guangbiao.gif" alt="" />'
				break;
			case "1":
				writeInput.innerHTML += '<span class="fakepw">' + keyboardValue + '</span>' + '<img  class="gb"  src="images/guangbiao.gif" alt="" />';
				break;
		}
	}
}

function clearLastKeyCss(){
	if(key_basket.length!=0){						
		key_basket[0].style.backgroundColor="#4C5B78"
		key_basket=[];
	}
}

function changeCss(o) {
	key_basket.push(o)
	o.style.backgroundColor = "red";
}