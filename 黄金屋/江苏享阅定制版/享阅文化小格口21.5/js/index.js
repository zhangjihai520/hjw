var index = {
	back: function() {
		var a = this.pageStack.pop();
		document.getElementById("div-" + a) && ($("#div-" + a).addClass("hidden-page"), this.clearPage(a));
		a = this.getActivePageId(), this.initPage(a);
		$("#div-" + a).removeClass("hidden-page");
	},
	clearPage: function(a) {
		switch(a) {
			case "home":
				console.log("leaveHome");
				if(isOperate) {
					clearTimeout(isOperate);
				}
				break;
			case "book_detail":
				hiddenKeyboard();
				book_detail_init(submit_data_bookDetail);
				break;
			case "book_list":
				book_list_clear();
				break;
			case "cell_list":
				var rm_Listener_Obj = doc.getElementById("inputBookCode");
				rm_Listener_Obj.removeEventListener("input", cell_list_handleInputBookCode(), false);
				rm_Listener_Obj.value = "";
				break;
			case "get_book_id_by_cell":
				hiddenKeyboard();
				get_book_id_by_cell_clear();
				break;
			case "get_book_success":
				//				glo_cellStateIntervalGetBookSuccess && clearInterval(glo_cellStateIntervalGetBookSuccess);
				//				get_book_success_init();
				break;
			case "help_detail":
				//				help_detail_init();
				break;
			case "help_list":
				help_list_init();
				break;
			case "input_code":

				hiddenKeyboard();
				input_code_clear();
				break;
			case "login":
				hiddenKeyboard();
				InputDataClear("login-value-", submit_data)
				break;
			case "login_student":

				//			    $(".app-input-login-student").empty();
				//				document.getElementById("divQrCode").innerHTML = "";
				//	            glo_randomCodeIntervalBookDetail && clearInterval(glo_randomCodeIntervalBookDetail)
				break;
			case "report_problems":
				//				report_problems_init(submit_data_report_problems);/
				break;
			case "return_book":
				return_book_clear();
				break;
			case "search":
				hiddenKeyboard();
				search_list_init();
				break;
			case "set_shelf_no":
				hiddenKeyboard();
				$("#inputCodeSetShelfNo").empty();
				break;
			case "changePassword":
				hiddenKeyboard();
				$(".cp").empty();
				break;
			case "slider":
			        videoPause();
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
		for(var a = 0, b = this.pageStack.length; a < b; a++) "home" != this.pageStack[a] && this.clearPage(this.pageStack[a]);
		a = this.getActivePageId();
		$("#div-" + a).addClass("hidden-page");
		this.pageStack.length = 0;
		this.openPage("home");
	},
	initPage: function(a) {
		var b, doc = document;
		switch(a) {
			case "home":
				delayOperate();
				/*
				 * 清除定时器
				 */
				clearTimerTask();
				break;
			case "login":
//				timerTask(managerLogin_countTime, "gl_time_cw");
				break
			case "book_detail":
				timerTask(bookDetail_countTime, "bookDetail_time");
				book_detail_getBookDetail(bookDetailId);
				break;
			case "book_list":
				book_list_getBookTypeList();
				/*
				 * 图书列表的手势翻页
				 */
				swipe("ulBooks");
				break;
			case "cell_list":
				cellListPageController = new PageController(glo_countPerPage)
				cell_list_getCellList();
				doc.getElementById("inputBookCode").addEventListener("input", cell_list_handleInputBookCode, !1);
				break;
			case "get_book_id_by_cell":
				break;
			case "get_book_success":
				timerTask(openDoor_countTime, "openDoor_countDown");
				break;
			case "help_detail":
				help_detail_getHelp();
				break;
			case "help_list":
				help_list_getHelpList();
				break;
			case "changePassword":
				timerTask(changePassword_countTime, "changePassword_countDown");
				break;
			case "input_code":
				timerTask(inputCode_countDown, "inputCode_countDown");
				break;
			case "login_student":
				//				login_student_setSelectInput(doc.getElementById("inputUserNameLoginStudent"));
				//				login_student_displayQr();
				break;
			case "manager_home":
				break;
			case "report_problems":
				//				report_problems_getProblems();
				break;
			case "return_book":
				timerTask(returnBook_countTime, "returnBook_countDown");
				setTimeout(function() {
					return_book_init();
				}, 300);
				initNativeObjects();
				showSoftInput();
				break;
			case "search":
				search_getBookList();
				mui.later(function() {
					doc.getElementById("inputBookSearch").focus()
				}, 300);
				break;
			case "inputGridScope":
				showKeyBoard();
				break;
			case "slider":
				videoSource.src = "video/" + localStorage.getItem('movieName' + version);
				video.load();
				videoplay();
				break;
		}
	},
	openPage: function(a) {
		$("#div-" + this.getActivePageId()).addClass("hidden-page"), this.clearPage(this.getActivePageId());
		doc.getElementById("div-" + a) && (this.pageStack.push(a), $("#div-" + a).removeClass("hidden-page"), this.initPage(a))
	},
	pageStack: []
};