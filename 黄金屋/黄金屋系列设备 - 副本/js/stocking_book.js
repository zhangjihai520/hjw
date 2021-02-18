
function get_book_number() {//书本数量
				var book_number = document.getElementById('book_number');
				book_number.textContent = document.querySelectorAll('tr').length - 1
			}

/*删除指定项*/
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if(index > -1) {
		this.splice(index, 1)
	}
}

function change_css(wrapper) { //单选
	if(wrapper.children[0].children[0].checked == false) {
		console.info(wrapper.children[0].children[0].checked)
		wrapper.children[0].children[0].checked = true;
		book_code.push(wrapper.getAttribute('data-value'));
	} else if(wrapper.children[0].children[0].checked == true) {
		wrapper.children[0].children[0].checked = false;
		book_code.remove(wrapper.getAttribute('data-value'));
	}

	if(book_code.length == trs.length - 1) {
		all.checked = true
	} else {
		all.checked = false
	}
	console.log(book_code);
}

function choose_all(wrapper) { //全选
	var objs = document.querySelectorAll('.inpt');
	console.log(wrapper.checked);
	console.log(trs.length)
	book_code.splice(0, book_code.length);
	console.info(objs.length);
	for(var i = 0; i < objs.length; i++) {
		if(wrapper.checked == true) {
			objs[i].checked = true;
			book_code.push($('.tr').eq(i).attr('data-value'));
		} else if(wrapper.checked == false) {
			objs[i].checked = false;
			book_code.splice(0, book_code.length)
		}
	}
	console.log(book_code);
}

function get_bookList(bookCodes){//获取书籍编号
				var url = createAjaxURL(interface_name.method_lbr_brbookList);
				var data ={
					macId: public_getBookShelfId(),
					bookcodes:bookCodes.join(',')
				};
				util.encrypt.MD5Data(data);
				console.info(JSON.stringify(data));
				var success = function(response) {
					totalPage = response.totalPage;
					console.info(JSON.stringify(response));
					switch(response.result){
						case global_ajaxResult.SUCCESS:
							var tableList = response.list;
								$("tr").not(":first").remove();
								var trs = document.getElementsByTagName('tr');
								for(var i = 0; i < tableList.length; i++) {
									var item = tableList[i];
									if((item.racklevelName)===undefined){
												item.lbrAreaName='_ _';
												item.rackName ='_ _';
												item.racklevelName ='_ _'
											}
									var tableHtml ='<tr class="tappable tr" style="width: 900px;height: 80px;" data-action="go" data-value ="' + item.bookCode + '">';
											tableHtml+='<td>'+'<input type="checkbox" class="inpt" onclick="return false"/>'+item.bookCode+'</td>';
											tableHtml+='<td>'+item.bookName+'</td>';
											tableHtml+='<td>'+item.lbrAreaName+'</td>';
											tableHtml+='<td>'+item.rackName+'</td>';
											tableHtml+='<td>'+item.racklevelName+'</td>';
											tableHtml+='</tr>';
											$('.table_downself').append(tableHtml);
								};	
								console.log(tableHtml)
								get_book_number();
							 break;
						case global_ajaxResult.FAILED:
							break;
						case global_ajaxResult.SIGN_ERROR:
//						console.log('wocao1111')
							 break
					}
				}
				util.ajax.getJSONWaiting(url, data, success);
			}


function search_book(bookCodes) {//获取书籍列表
				var url = createAjaxURL(interface_name.method_lbr_brbookList);
				console.log('aa')
				var data ={
					macId: public_getBookShelfId(),
					bookcodes:bookCodes.join(',')
				};
				util.encrypt.MD5Data(data);
				console.info(JSON.stringify(data));
				var success = function(response) {
					console.log(JSON.stringify(response))
					totalPage = response.totalPage;
					switch(response.result) {
						case global_ajaxResult.SUCCESS:
							var tableList = response.list;
							console.log(JSON.stringify(tableList))
							$("tr").not(":first").remove();
							var trs = document.getElementsByTagName('tr');
							console.log(tableList.length);
							for(var i = 0; i < tableList.length; i++) {
								var item = tableList[i];
								if((item.racklevelName)===undefined){
												item.lbrAreaName='_ _';
												item.rackName ='_ _';
												item.racklevelName ='_ _';
											}
								var tableHtml = '<tr style="width: 900px;height: 80px;">';
								tableHtml += '<td>' + item.bookCode+ '</td>';
								tableHtml += '<td>' + item.bookName + '</td>';
								tableHtml += '<td>' + item.lbrAreaName+ '</td>';
								tableHtml += '<td>' + item.rackName + '</td>';
								tableHtml += '<td>' + item.racklevelName + '</td>';
								tableHtml += '</tr>';
								$('.table_stocking').append(tableHtml);
							};
							get_book_number();
							break;
						case global_ajaxResult.FAILED:
							break;
						case global_ajaxResult.SIGN_ERROR:
							break;
					}
					
				}
				util.ajax.getJSONWaiting(url, data, success);
		}