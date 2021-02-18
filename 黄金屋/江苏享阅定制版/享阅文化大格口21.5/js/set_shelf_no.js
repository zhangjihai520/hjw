function set_shelf_no_init(data){
	data.value = "";
//	document.getElementById("inputCodeSetShelfNo").value = "";
  $("#inputCodeSetShelfNo").empty();
}

function set_shelf_no_isSubmitOk(submitData){
	if(submitData.value.length == 0) {
		mui.toast("请输入设备号", { duration:'long', type:'div' });
		return false;
	}
	return true;
}

function set_shelf_no_setData(submitData){	
	submitData.value = document.getElementById("inputCodeSetShelfNo").innerText.trim();
}



function set_shelf_no_submit(submitData){
	var ao = global_ajaxObject.setting;
	var url = util.str.createAjaxURL(ao, ao.method_set_shelf_id);
	var data = {
		id: public_getBookShelfId(),
		no: submitData.value,
		userId: localStorage.getItem(global_localStorage.managerId)
	};
	util.encrypt.MD5Data(data);

	var success = function(response) {
		mui.toast(response.msg, { duration:'long', type:'div' });
		switch(response.result) {
			case global_ajaxResult.SUCCESS:				
				localStorage.setItem(global_localStorage.shelfNo, submitData.value);
				localStorage.setItem(global_localStorage.shelfId, response.id);					
				public_setShelfNo();				
				mui.toast("设备即将重启，请稍后……");
							setTimeout(function(){
								mui.plusReady(function(){
									plus.runtime.restart();
								})						      
							},2000)																			
				break;
			case global_ajaxResult.FAILED:  break;
			case global_ajaxResult.SIGN_ERROR:

				break;
		}
	};
	util.ajax.getJSONWaiting(url, data, success);
}