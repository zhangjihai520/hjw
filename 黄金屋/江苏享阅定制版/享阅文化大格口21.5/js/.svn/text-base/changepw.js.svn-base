function changePw_init(data){
	for(var prop in data){
		data[prop].value = "";
	}
	$(".app-input-login").empty()
}

function changePw_isSubmitOk(submitData){
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
function changePw_setData(submitData){
	var element;
	for(var prop in submitData){
		element = document.querySelector(".changePassword-value-" + prop);
		if(element){
			submitData[prop].value = element.innerText.trim();
		}
	}
	
	  
	
	
}
function changePw_setSelectInput(input){
	var changePwInputs=document.querySelectorAll(".cp"),item;
	for(var i=0,len=changePwInputs.length;i<len;i++){
		item=changePwInputs[i];
		if(item == input){
			if(!item.classList.contains("modify")){
				item.classList.add("modify");
			}
		}else{
				item.classList.remove("modify");
		}
	}
}

function changePw_submit(submitData){
	var ao = global_ajaxObject.user;
	var url = util.str.createAjaxURL(ao, ao.method_change_password);
	var data = {
		userName: submitData.userName.value,
		password: submitData.password.value
	};
	    var data={usertel:submitData.userName.value,oldpw:submitData.password.value, newpw:submitData.newPassword.value};			
	        util.encrypt.MD5Data(data);		
	var success = function(response){
		switch(response.result){
			case global_ajaxResult.SUCCESS:
				mui.toast("修改密码成功");
				setTimeout(function(){
					index.goHome();	
				},1500)			
				break;
			case global_ajaxResult.FAILED:
			case global_ajaxResult.SIGN_ERROR:
				mui.toast(response.msg);
				break;
		}
		
	};
	util.ajax.getJSONWaiting(url, data, success);
}