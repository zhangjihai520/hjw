var allUrl ="http://192.168.1.177:8080";
function createAjaxURL(method) {
	return(allUrl + method);
}
var allMthod={
	getJson:"/admin/other2/partybcList",
	getList:"/admin/other2/partyappList",
	getInfo:"/admin/other2/partyatList2"
}



function nav_animate() {
	var nav = $('nav');
	var line = $('<div />').addClass('line');
	line.appendTo(nav);

	var active = nav.find('.active1');
	var pos = 0;
	var wid = 0;

	if(active.length) {
		pos = active.position().left;
		wid = active.width();
		line.css({
			left: pos,
			width: wid
		});

	}

	nav.find('ul li').click(function(e) {
		if(!$(this).hasClass('active1')) {
			e.preventDefault();
			var _this = $(this);

			nav.find('ul li').removeClass('active1');

			var position = _this.position();
			var width = _this.width();

			if(position.left >= pos) {
				line.animate({
					width: ((position.left - pos) + width)
				}, 150, function() {
					line.animate({
						width: width,
						left: position.left
					}, 300);
					_this.addClass('active1');
				});
			} else {
				line.animate({
					left: position.left,
					width: ((pos - position.left) + wid)
				}, 150, function() {
					line.animate({
						width: width
					}, 300);
					_this.addClass('active1');
				});
			}

			pos = position.left;
			wid = width;
		}
	});
}

