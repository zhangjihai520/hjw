


function rmgb() {

	$("img.gb").remove();
}

function addgb(dom) {
	dom.innerHTML += '<img  class="gb"  src="img/guangbiao.gif" alt=""/>'
}


function gb_beat(dom){
	rmgb();
	addgb(dom);
	
}
function changeCss(o) {
	key_basket.push(o)
	o.style.backgroundColor = "red";
}

function hiddenKeyboard() {
	rmgb();
	clearLastKeyCss()
	doc.getElementById("div-keyboardArea").style.display = "none";
	index.listenOff("keyboardArea");
}

function showKeyboard(){	     
		doc.getElementById("div-keyboardArea").style.display = "block";
		index.listenOff("keyboardArea")
		index.listenOn("keyboardArea");
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

	if(keyboardValue == "backspace") {
		rmgb();
		if(writeInput.classList.contains("compw")) {
			var childs = writeInput.childNodes;
			if(childs.length > 0) {
				writeInput.removeChild(childs[childs.length - 1])
			};
			writeInput.innerHTML += '<img  class="gb"  src="img/guangbiao.gif" alt="" />';
		} else {
			writeInput.innerHTML = (writeInput.innerHTML).substring(0, (writeInput.innerHTML).length - 1) + '<img  class="gb"  src="img/guangbiao.gif" alt="" />';
		}
	} else if(keyboardValue == "packUp") {
		hiddenKeyboard();
	} else {
		rmgb();
		switch(inputType) {
			case false:			
				writeInput.innerHTML += keyboardValue + '<img  class="gb"  src="img/guangbiao.gif" alt="" />'
				break;
			case true:
				writeInput.innerHTML += '<span class="fakepw">' + keyboardValue + '</span>' + '<img  class="gb"  src="img/guangbiao.gif" alt="" />';
				break;
		}

  
	}
}

/*
 * keyboard
 */
function keyboardOperation1(writeInput, keyboardValue) {
	if(keyboardValue == "backspace") {
		rmgb();
		if(writeInput.classList.contains("compw")) {
			var childs = writeInput.childNodes;
			if(childs.length > 0) {
				writeInput.removeChild(childs[childs.length - 1])
			};
			writeInput.innerHTML += '<img  class="gb"  src="img/guangbiao.gif" alt="" />';
		} else {
			writeInput.innerHTML = (writeInput.innerHTML).substring(0, (writeInput.innerHTML).length - 1) + '<img  class="gb"  src="img/guangbiao.gif" alt="" />';
		}
	} else if(keyboardValue == "packUp") {
		hiddenKeyboard();
	} else {
		rmgb();
		writeInput.innerHTML += keyboardValue + '<img  class="gb"  src="img/guangbiao.gif" alt="" />';
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