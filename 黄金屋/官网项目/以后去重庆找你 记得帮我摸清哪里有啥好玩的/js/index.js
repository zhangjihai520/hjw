
function getHost(arr,value) {
	var arr1 =[];
	for(i in arr){
		if(arr[i].product_host==value){
			arr1.push(arr[i])
		}
	}
	return arr1;
}

function getSerise(arr,value){
	var arr1 =[];
	for(i in arr){
		if(arr[i].product_set==1){
			arr1.push(arr[i])
		}
	}
	return arr1;
}

function getBookCase(arr,value){
	var arr1 =[];
	for(i in arr){
		if(arr[i].product_set==0){
			arr1.push(arr[i])
		}
	}
	return arr1;
}

function getHtml(data) {
	var html = '<div class="row product_shadow">' +
		'<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
		'<img src="' + data.product_img + '" alt="" class="img-responsive"/>' +
		'<p class="visible-xs-block">' + data.product_name + '</p>' +
		'</div>' +
		'<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 hidden-xs">' +
		'<div class="product_set2">' +
		'<div class="info_set">' +
		'<p>' +
		'<img src="img/hjw_index_biao.png"/>' +
		'<span class="product_text">' + data.product_name + '</span>' +
		'</p>' +
		'<p class="prodcut_info">' + data.product_impact + '</p>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'<div class="host_cover product_cover">' +
		'<div class="cover_box">' +
		'<p>' + data.product_address + '</p>' +
		'<a href="####" data-value="' + data.product_value + '" class="gkip">' + "了解跟更多" + '</a>' +
		'</div>' +
		'</div>'
	return html;
}

function book_info() {
	var gkip = document.getElementsByClassName("gkip");
	for(var i = 0; i < gkip.length; i++) {
		gkip[i].onclick = function() {
			var info_id = $(this).attr('data-value');
			localStorage.setItem('info_id', info_id);
			location.href = "product_center_detail.html"
		}
	}
}
function getStorage(obj) {
			var title = $(obj).attr('data-page');
			localStorage.setItem("title", title);
			location.href = "about_suExample_detail.html"
		}
