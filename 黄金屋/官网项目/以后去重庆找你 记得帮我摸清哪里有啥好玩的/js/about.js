var body = document.getElementById('body')

function load() {
	$("#header").load("about_header.html");
	$("#footer").load("footer.html");
}

function hiddenPage() {
	if(body.hidden == true) {
		body.hidden = false;
	}
}
$(function() {
	setTimeout(hiddenPage, 150)
})

function changePage(obj) {
	switch($(obj).attr("data-action")) {
		case "about_introduce":
			location.href = "about_introduce.html";
			break;
		case "about_dynamic":
			location.href = "about_dynamic.html";
			break;
		case "about_info":
			location.href = "about_news.html";
			break;
		case "about_example":
			location.href = "about_suExample.html";
			break;
	}
}

function getMore() {
	contanier.style.overflow = 'visible';
	console.info(contanier.style.overflow)
}

function getList(data) {
	var html = '<div class="col-lg-2 col-md-2 col-sm-2 col-xs-3">' +
		'<img src="' + data.img + '" alt="" class="img-responsive" />' +
		'</div>' +
		'<div class="col-lg-8 col-md-8 col-sm-8 col-xs-9">' +
		'<p class="headline">' + data.title + '</p>' +
		'<p class="hidden-xs">' + data.info + '</p>' +
		'<p style="text-align: right;color: #999999;">' + data.time + '</p>' +
		'</div>' +
		'<div class="col-lg-2 col-md-2 col-sm-2 new_date hidden-xs">' +
		'<div class="date_detail">' +
		'<p class="date">' + data.date + '</p>' +
		'<p class="mon">' + data.mon + '</p>' +
		'</div>' +
		'</div>'
	return html;
}

function getdatas(data) {
	var html = '<div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">' +
		'<p>' + data.text_01 + '</p>' +
		+'<p align="center">' +
		'<img src="' + data.img_01 + '" alt="" class="img-responsive" />' +
		'</p>' +
		'<p>' + data.text_02 + '</p>' +
		'<p>' + data.text_03 + '</p>' +
		'<p>' + data.text_04 + '</p>' +
		'<p align="center">' +
		'<img src="' + data.img_02 + '" alt="" class="img-responsive" />' +
		'</p>' +
		'<p>' + data.text_05 + '</p>' +
		'</div>' +
		'<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">' +
		'<div class="right_img" align="center">' +
		'<img src="' + data.img_right01 + '" class="img-responsive" />' +
		'</div>' +
		'<div class="right_img" align="center">' +
		'<img src="' + data.img_right02 + '" class="img-responsive" />' +
		'</div>' +
		'</div>'
	return html;
}