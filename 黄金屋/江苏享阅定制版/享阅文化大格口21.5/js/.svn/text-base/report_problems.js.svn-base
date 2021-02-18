function report_problems_getProblems(){
	var ao = global_ajaxObject.setting;
	var url = util.str.createAjaxURL(ao, ao.method_problem_list);
	var data = {};
	var success = function(resposne){
		var _document = document,
			listElement = _document.getElementById("listReportProblems"),
			listData = resposne.list,
			i,
			len,
			item,
			newElement;
			
		listElement.innerHTML = "";
			
		for(i=0, len=listData.length; i<len; i++){
			item = listData[i];
			newElement = _document.createElement("li");
			newElement.className = "tappable";
			
			newElement.dataset.action = "selectProblem";
			newElement.dataset.id = item.problemId;
			
			newElement.innerHTML = item.description;
			
			listElement.appendChild(newElement);
			
		}
		
		$('.tappable').off('touchstart');
		$('.tappable').on('touchstart', function(){
			tapHandler($(this));
		});
		
	};
	util.ajax.getJSON(url, data, success);
}

function report_problems_init(data){
	data.userId = "";
	data.bookId = "";
	data.readId = "";
	data.problemIds = "";
	document.getElementById("listReportProblems").innerHTML = "";
}

function report_problems_isSubmitOk(data){
	if(data.problemIds.length == 0){
		mui.toast("请选择问题", { duration:'long', type:'div' });
		return false;
	}
	return true;
}

function report_problems_selectProblem(selectedProblem){
	
	var allProblems = document.getElementById("listReportProblems").children,
		item;
	
	for(var i=0, len=allProblems.length; i<len; i++){
		item = allProblems[i];
		if(item == selectedProblem){
			item.className = "index-problem-selected tappable";
		}else{
			item.className = "tappable";
		}
	}
}

function report_problems_setData(data){
	var allProblemElements = document.getElementById("listReportProblems").children,
		selectedProblemIds = [],
		i,
		len,
		item;
		
	for(i=0, len=allProblemElements.length; i<len; i++){
		item = allProblemElements[i];
		if(item.classList.contains("index-problem-selected")){
			selectedProblemIds.push(item.dataset.id);
		}
	}
	
	data.problemIds = selectedProblemIds.join(",");
}

function report_problems_submit(data){
	var ao = global_ajaxObject.product;
	var url = util.str.createAjaxURL(ao, ao.method_report_problem);
	util.encrypt.MD5Data(data);
	var success = function(resposne){
		console.log("report problem: " + JSON.stringify(resposne));
		mui.toast(resposne.msg, { duration:'long', type:'div' });
		if(resposne.result == global_ajaxResult.SUCCESS){
			mui.trigger(document.getElementById("aHome"), 'tap');
		}
	};
	util.ajax.getJSONWaiting(url, data, success);
}