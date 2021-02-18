


function login_student_isSubmitOk(b) {
	var a, c;
	for(c in b)
		if(a = b[c], 0 == a.value.length) return mui.toast("\u8bf7\u8f93\u5165" + a.text), !1;
	    return !0
}

function login_student_setData(b) {
	for(var a in b)
		if(element = document.querySelector(".login-student-value-" + a)) b[a].value = element.innerText.trim()
}

function login_student_setSelectInput(b) {
	var a=document.querySelectorAll(".app-input-login-student");
	for(var i=0;i<a.length;i++){a[i].classList.remove("public-focused-input-login-student");}
		b.classList.add("public-focused-input-login-student");
	
}

function login_student_submit(b) {
	var a = global_ajaxObject.user,
		a = util.str.createAjaxURL(a, a.method_get_book_id_by_cellNo);
	b = {
		bookShelfId:public_getBookShelfId(),
	    cellNo:OPEN_CELLNUM,					//书格号
	    userName:b.userName.value,				//用户名	
	    pwd:b.password.value					//密码	
	};	
	util.encrypt.MD5Data(b);
	util.ajax.getJSONWaiting(a, b, function(a) {
		switch(a.result) {			
			case global_ajaxResult.SUCCESS:
			   mui.toast(a.msg)
				break;
			case global_ajaxResult.FAILED:
			case global_ajaxResult.SIGN_ERROR:
				mui.toast(a.msg)
		}
	})
};