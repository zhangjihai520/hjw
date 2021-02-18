function help_list_getHelpList(){
	var ao = global_ajaxObject.setting;
	var url = util.str.createAjaxURL(ao, ao.method_notice_list);
	var data = {
		type: 19
	};
	var success = function(response){
		var _document = document,
			listElement = _document.getElementById("listHelp"),
			listData = response.list,
			item,
			newElement;			
		listElement.innerHTML = "";		
		for(var i=0, len=listData.length; i<len; i++){
			item = listData[i];
			newElement = _document.createElement("li");
			newElement.className = "tappable";
			newElement.dataset.id = item.id;
			newElement.dataset.action = "detailHelp";
			newElement.innerHTML = item.title;
			listElement.appendChild(newElement);
		}
		var cpw=_document.createElement("li");
		    cpw.className = "tappable";
		    cpw.dataset.action = "openWebview";
		    cpw.dataset.webview = "changePassword";
		    cpw.innerText="修改密码";
		    listElement.appendChild(cpw);			
		$('.tappable').off('touchstart');
		$('.tappable').on('touchstart', function(event){
			tapHandler($(this),event);
		});
	};	
	util.ajax.getJSON(url, data, success);
}

function help_list_init(){
	document.getElementById("listHelp").innerHTML = "";
}
