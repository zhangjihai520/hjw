var ajax ={
	getJson:function(url,data,success){
		var _$ =$;
		_$.ajaxSettings.beforeSend = function(xhr, setting) {
				//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
				console.log('beforeSend:::' + JSON.stringify(setting));
			};
			_$.ajax(url, {
				data: data,
				dataType:'json',//服务器返回json格式数据
				type:'get',//HTTP请求类型
				success: function(response){
					success(response);
				},
				error:function(xhr,type,errorThrown){
					alert("网络异常！")
				}
			});		
	},
	imgUpload:function (url,data,success){
		var _$ =$;
		_$.ajaxSettings.beforeSend = function(xhr, setting) {
				//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
				console.log('beforeSend:::' + JSON.stringify(setting));
			};
			_$.ajax(url,{
				data:data,
				type: 'POST',
				cache: false,
				processData: false,
				contentType: false,
				success: function(response) {
					success(response);
				},
				error:function(xhr,type,errorThrown){
					alert("网络异常！")
				}
			})
	}
}

//api 接口名
var url ="http://192.168.1.177:8082/website/";
function creat_url(method_name){
	return (url+method_name)
}

var method_name ={
	login:"login",//登入
	changePass:"passWord",//修改密码
	imgUpload:"uploadPictures",//图片上传
	addHost_list:"addData",//热门产品数据添加
	changHost:"changeData",//热门产品数据修改
	deleteHost:"deleteData",//热门产品数据
}
