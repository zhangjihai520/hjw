//点击事件
function click_on(obj){
	switch ($(obj).attr("data-action")){
		case "host_add":
			addHost_list();
			break;
		case "host_change":
			var new_method =method_name.changHost
			changData(new_method);
			break;
		case "host_delete":
			var new_method =method_name.deleteHost;
			changData(new_method);
			break;
	}
}


//导航动画
function onMyLoad() {
	var arr = document.getElementsByClassName("bind_click");
	var arr2 = document.getElementsByClassName("tapple");
	for(var i = 0; i < arr.length; i++) {
		arr[i].index = i;
		arr[i].onclick = function() {
			$('.list_dd .list_li').removeClass('active');
			$(this).addClass('active');
			for(var i = 0; i < arr.length; i++) {
				var j = this.index;
				for(var z = 0; z < arr2.length; z++) {
					arr2[z].hidden = true
				}
				arr2[j].hidden = false
			}
		}
	}
}

/*热门产品*/

var host_name = document.getElementById("host_name");
var host_impact = document.getElementById("host_impact");
var host_address = document.getElementById("host_address");
var host_value = document.getElementById("host_value");
var select_value = document.getElementById("select_value");
var img_new =document.getElementById("img_new");
function changeImg() {
	$('#img').click();
}

function sendChange() {
	img_new.value =document.getElementById("img").value;
	fileUpload();
}

//图片上传
function fileUpload() {
	var formData = new FormData();
	formData.append('img', $('#img')[0].files[0]);

	if(!validate_img($('#img'))) {
		return;
	}
	var url =creat_url(method_name.imgUpload);
	var data =formData;
	var success =function(response){
		img_new.value =response.img_path;
		alert("图片上传成功！！！");
	}
	ajax.imgUpload(url,data,success);
}
//限制上传文件的类型和大小
function validate_img(ele) {
	// 返回 KB，保留小数点后两位
	//alert((ele.files[0].size/(1024*1024)).toFixed(2));
	var file = ele.val();
	if(!/.(gif|jpg|jpeg|png|GIF|JPG|bmp)$/.test(file)) {

		alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
		return false;
	} else {
		//alert((ele.files[0].size).toFixed(2));
		//返回Byte(B),保留小数点后两位
		if(((ele[0].files[0].size).toFixed(2)) >= (20 * 1024 * 1024)) {

			alert("请上传小于20M的图片");
			return false;
		} else return true;
	}
	return false;

}

//热门产品数据添加
function addHost_list() {
	var url = creat_url(method_name.addHost_list);
	if(img_new.value == "" || host_name.value == "" || host_impact.value == "" || host_address.value == "" || host_value.value == "") {
		alert("请填写完信息！！");;
	}
	var data = {
		host_img: img_new.value,
		host_name: host_name.value,
		host_impact: host_impact.value,
		host_address: host_address.value,
		host_value: host_value.value
	}
	var success = function(response) {
		alert("添加数据成功");
		rewrite();
	}
	ajax.getJson(url,data,success);
}

//产品修改和删除
function changData(method) {
	var dataId =parseInt(select_value.value);
	if(typeof(dataId)!="number"){
		alert("填写的数据格式有误！")
	}
	var url = creat_url(method);
	if(img_new.value == "" || host_name.value == "" || host_impact.value == "" || host_address.value == "" || host_value.value == ""||select_value.value=="") {
		alert("请填写完信息！！");
	}
	var data = {
		dataId:dataId,
		host_img: img_new.value,
		host_name: host_name.value,
		host_impact: host_impact.value,
		host_address: host_address.value,
		host_value: host_value.value,
	}
	var success = function(response) {
		alert("添加数据成功");
		rewrite();
	}
	console.log(data);
	ajax.getJson(url,data,success);
}

/*修改密码*/
var userName = document.getElementById('userName');
var oldPassword = document.getElementById('oldPassword');
var newPassword = document.getElementById('newPassword');
var rePassword = document.getElementById("rePasssword");

function changePass() {
	var url = creat_url(method_name.changePass);
	var data = {
		oldPassword: oldPassword.value,
		newPassword: newPassword.value,
		rePassword: rePassword.value
	}
	var success = function(response) {
		alert(response.msg);
		rewrite();
	}
	ajax.getJson(url, data, success);
}

//清空input输入框
function rewrite() {
	var inputs = document.querySelectorAll('input');
	for(var i = 0; i < inputs.length; i++) {
		inputs[i].value = '';
	}
}

//清空texterea输入框
function clear_textarea(){
	var clear_textarea =document.querySelectorAll('textarea');
	for(var i=0;i<clear_textarea.length;i++){
		clear_textarea[i].value ='';
	}
}
