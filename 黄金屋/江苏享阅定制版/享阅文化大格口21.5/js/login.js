function login_init(data){
	for(var prop in data){
		data[prop].value = "";
	}
	$(".app-input-login").empty()
}

function login_isSubmitOk(submitData){
	var item;
	for(var prop in submitData){
		item = submitData[prop];
		if(item.value.length == 0){
			mui.toast("请输入" + item.text);
			return false;
		}
	}
	return true;
}
function login_setData(submitData){
	var element;
	for(var prop in submitData){
		element = document.querySelector(".login-value-" + prop);
		if(element){
			submitData[prop].value = element.innerText.trim();
		}
	}
}

function login_setSelectInput(input){	
	var loginInputs = document.querySelectorAll(".app-input-login"),
		item;
	for(var i=0, len=loginInputs.length; i<len; i++){
		item = loginInputs[i];
		if(item == input){
			if(!item.classList.contains("public-focused-input-login")){
				item.classList.add("public-focused-input-login");
			}
		}else{
			item.classList.remove("public-focused-input-login");
		}
	}
}

function login_submit(submitData){
	var ao = global_ajaxObject.user;
	var url = util.str.createAjaxURL(ao, ao.method_shelf_manager_log_in);
	var data = {
		userName: submitData.userName.value,
		password: submitData.password.value
	};
	util.encrypt.MD5Data(data);	
	var success = function(response){
		switch(response.result){
			case global_ajaxResult.SUCCESS:
				localStorage.setItem(global_localStorage.managerId, response.userId);
				if(glo_TimeCountDownInterval){clearInterval(glo_TimeCountDownInterval);};  
				index.openPage("manager_home");
				break;
			case global_ajaxResult.FAILED:
			case global_ajaxResult.SIGN_ERROR:
				mui.toast(response.msg);
				break;
		}
		
	};
	util.ajax.getJSONWaiting(url, data, success);
}