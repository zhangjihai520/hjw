function help_detail_getHelp(){
	var ao = global_ajaxObject.setting;
	var url = util.str.createAjaxURL(ao, ao.method_news_detail);
	var data = {
		id: localStorage.getItem(global_localStorage.helpId)
	};
	var success = function(response){
		var _document = document,
			element;
		for(var prop in response){
			element = _document.querySelector(".help-detail-data-" + prop);
			if(element && response[prop]){
				element.innerHTML = response[prop]; 
			}
		}
	};
	
	util.ajax.getJSON(url, data, success);
}

function help_detail_init(){
	document.querySelector(".help-detail-data-newTitle").innerHTML = "";
	document.querySelector(".help-detail-data-newContent").innerHTML = "";
}
