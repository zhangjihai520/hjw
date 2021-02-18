var index = {
	back: function() {
		var a = this.pageStack.pop();
		document.getElementById("div-" + a) && ($("#div-" + a).addClass("hidden-page"), this.clearPage(a));
		a = this.getActivePageId(), this.initPage(a);
		$("#div-" + a).removeClass("hidden-page");
	},
	clearPage: function(a) {
		this.listenOff(a);
		hiddenKeyboard();
		switch(a) {
			case "index":

				break;
			case "admin":
				$("#adminName").empty();
				$("#adminPw").empty();
				break;
			case "admin_home":

				break;
			case "cell_list":
				M.later(function() {
					doc.getElementById("inputBookCode").blur();
					var lis = doc.getElementById("inputBookCode");
					lis.removeEventListener("input", hander_inputListen, !1);
				}, 300);

				break;
			case "set_shelf_no":
				$("#deviceNum").empty();
				break;
			case "sellbookList":
				$("#sellbooks").empty();
				key_basket = [];
				break;
			case "as_sell":
				$("#inputCodeBookIdByCell").empty();
				break;
			case "scan_sellbook":
				clearTimerTask();
				clearInterval(WX_COUNT_DOWN);
				clearInterval(ZFB_COUNT_DOWN);
				$(".pop").css("display", "none");
				break;
			case "help":

				break;
		}
	},
	closePage: function(a) {
		this.pageStack.splice(this.pageStack.lastIndexOf(a), 1);
		this.clearPage(a)
	},
	getActivePageId: function() {
		return this.pageStack[this.pageStack.length - 1]
	},
	goHome: function() {
		hiddenKeyboard();
		for(var a = 0, b = this.pageStack.length; a < b; a++) "home" != this.pageStack[a] && this.clearPage(this.pageStack[a]);
		a = this.getActivePageId();
		$("#div-" + a).addClass("hidden-page");
		this.pageStack.length = 0;
		this.openPage("home");
	},
	initPage: function(a) {
		this.listenOn(a);
		switch(a) {
			case "index":

				break;
			case "admin":

				break;
			case "admin_home":

				break;
			case "cell_list":
				doc.getElementById("bookList_cur").innerText = 1;
				getSellCellList();
				var lis = doc.getElementById("inputBookCode");

				lis.addEventListener("input", hander_inputListen, !1);
				break;
			case "set_shelf_no":

				break;
			case "sellbookList":
				doc.getElementById("bookList_cur").innerText = 1;
				getBookType();

				break;
			case "as_sell":

				break;
			case "scan_sellbook":
				timerTask(120, "scan_sellbook_time");
				break;
			case "help":

				break;
		}
	},
	openPage: function(a) {
		$("#div-" + this.getActivePageId()).addClass("hidden-page"), this.clearPage(this.getActivePageId());
		doc.getElementById("div-" + a) && (this.pageStack.push(a), $("#div-" + a).removeClass("hidden-page"), this.initPage(a))
	},
	pageStack: [],
	listenOn: function(o) {
		M("#div-" + o).on('tap', '.tappable', function(e) {
			tapHandler(this, e);
		})
	},
	listenOff: function(o) {
		M("#div-" + o).off();
	}
};