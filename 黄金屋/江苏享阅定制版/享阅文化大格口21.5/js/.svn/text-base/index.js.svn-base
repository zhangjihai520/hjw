var index = {
	back: function() {	

	var a = this.pageStack.pop();
		document.getElementById("div-" + a) && ($("#div-" + a).addClass("hidden-page"), this.clearPage(a));
		a = this.getActivePageId(),	this.initPage(a);	
		$("#div-" + a).removeClass("hidden-page");
	},
	clearPage: function(a) {
		hiddenKeyboard();
		clearTimerTask();
		switch(a) {
			case"home":
			     if(isOperate){clearTimeout(isOperate)};
			     break;
			case "book_detail":			
				book_detail_init(submit_data_bookDetail);
				break;
			case "book_list":			
			    /*
				 * 清除监听
				 */
				var rm_Listener_Obj=doc.getElementById("ulBooks");				
				rm_Listener_Obj.removeEventListener("touchstart",touchMethod,false);
				rm_Listener_Obj.removeEventListener("touchend",touchMethod,false);
				book_list_init();
				break;
			case "cell_list":				
				cell_list_init();
				break;
			case "get_book_id_by_cell":
				get_book_id_by_cell_init();
				break;
			case "get_book_success":			
				get_book_success_init();
				break;
			case "help_detail":
				help_detail_init();
				break;
			case "help_list":
				help_list_init();
				break;
			case "input_code":
				input_code_init();
				break;
			case "login":		
				login_init(submit_data_login);		
				break;
			case "login_student":
			    $(".app-input-login-student").empty();
				document.getElementById("divQrCode").innerHTML = "";					
				break;
			case "report_problems":
				report_problems_init(submit_data_report_problems);
				break;
			case "return_book":	
			var inputObj=document.getElementById("inputBookCodeReturnBook");
			    return_book_init(inputObj);
				inputObj.removeEventListener("input", return_book_handleInputBookCode, !1);				
				break;
			case "search":
				search_list_init();
				break;
			case "set_shelf_no":
				set_shelf_no_init(submit_data_shelfNo);
				break;
		    case "inputGridScope":		      
		        $(".app-input-detection").empty();
		        break;
		    case "changePassword":
	             $(".changePassword-value-userName").empty() ;
	             $(".changePassword-value-password").empty(); 
	             $(".changePassword-value-newPassword").empty() ;
	             $(".changePassword-value-confirmPassword").empty() ;
		      break;
		    case "slider":
		      	videoPause();
			    break;
		}
	},
	closePage: function(a) {
		this.pageStack.splice(this.pageStack.lastIndexOf(a),1);
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
		var b,doc=document;
		switch(a) {
			case"home":
			     delayOperate();
			     pageBox=[];
			     break;
			case "book_detail":
			    timerTask(bookDetail_countTime, "bookDetail_time")
				book_detail_getBookDetail();
				break;
			case "book_list":
				glo_pageControllerBookList = new PageController(glo_countPerPageBookList);
				book_list_getBookTypeList();				
			/*
			 * 图书列表的手势翻页
			 */
			swipe("ulBooks");	
				break;
			case "cell_list":						
				glo_pageControllerCellList = new PageController(glo_countPerPageCellList);
				cell_list_getCellList();			   
				break;
			case "get_book_id_by_cell":
//				changeStyle(".cx");					
				break;
			case "get_book_success":
				get_book_success_refresh();
				break;
			case "help_detail":
				help_detail_getHelp();
				break; 
			case "help_list":
				help_list_getHelpList();
				break;
			case "input_code":			
				timerTask(inputCode_countDown, "inputCode_countDown");				
				break;
			case "login":			
				login_setSelectInput(doc.getElementById("inputUserNameLogin"));				
				timerTask(managerLogin_countTime, "gl_time_cw")
				break;
			case "login_student":
				login_student_setSelectInput(doc.getElementById("inputUserNameLoginStudent"));            
                var t="http://b.huangjw.com/organization/codeurl?pkgname=brbookbycellbig&shelfId=" + public_getBookShelfId() + "&cellNo=" +OPEN_CELLNUM;                
                    qrcodeMethod("divQrCode",250,250,t)
				 break;
			case "manager_home":
				break;
			case "report_problems":
				report_problems_getProblems();
				break;
			case "return_book":					
				timerTask(returnBook_countTime, "returnBook_countDown");
				localStorage.setItem(global_localStorage.reserveCode, "");				
				var inputObj=doc.getElementById("inputBookCodeReturnBook");
				    inputObj.value="";
				    mui.later(function(){
				     inputObj.focus();
				     audioPlay("audio/scan.mp3");
				    },300)
				
				    inputObj.addEventListener("input", return_book_handleInputBookCode, !1);
				break;
			case "search":
			search_getBookList();
				mui.later(function() {
					doc.getElementById("inputBookSearch").focus()
				}, 300);
				break;
			case "set_shelf_no":			
		     	break;
			case "shelf_detection":			
				doc.getElementById("firstGird").value="";
			    doc.getElementById("lastGrid").value="";
				doc.getElementById("detectionScrollArea").innerHTML="";                   
				doc.getElementById("detectionTotal").innerHTML="";
				break;
			case "inputGridScope":
			        inputType=0;
					showKeyBoard();						
					break;					
			case "changePassword":	
			   timerTask(changePassword_countTime,"cpw_time_cw");				          
		          break;
		    case "slider":
				videoSource.src = "video/" + localStorage.getItem('movieName' + version);
				video.load();
				videoplay();
				break;
		}		  
	},
	openPage: function(a) {		 
		$("#div-" + this.getActivePageId()).addClass("hidden-page"),this.clearPage(this.getActivePageId());
		doc.getElementById("div-" + a) && (this.pageStack.push(a), $("#div-" + a).removeClass("hidden-page"), this.initPage(a))
	},
	pageStack: []
};