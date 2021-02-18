var util = {
	ajax: {
		/*
		 * 最常用的ajax方法，获取JSON
		 * url：接口地址
		 * data：输入参数
		 * success：访问成功后要执行的函数
		 */
		getJSON: function(url, data, success) {

			var _mui = mui;

			_mui.ajaxSettings.beforeSend = function(xhr, setting) {
				//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
//				console.log('beforeSend:::' + JSON.stringify(setting));
			};
			_mui.getJSON(url, data, success);
		},
		/*
		 * 获取JSON，显示顶部加载进度条
		 * url：接口地址
		 * data：输入参数
		 * success：访问成功后要执行的函数
		 */
		getJSONLoading: function(url, data, success) {
			var _mui = mui,
				progress = 0;
			//util_startLoading();
			util.helper.startLoading();
			_mui.ajaxSettings.beforeSend = function(xhr, setting) {
				//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
				console.log('beforeSend:::' + JSON.stringify(setting));
			};

			_mui.ajax(url, {
				data: data,
				dataType: 'json', //服务器返回json格式数据
				type: 'get', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；		
				success: function(response) {
					success(response);
					//util_endLoading();
					util.helper.endLoading();
				},
				error: function(xhr, type, errorThrown) {
					mui("body").progressbar().hide();
					//异常处理；			
					plus.nativeUI.toast(global_stringObject.wangluoyichang);
				}
			});
		},
		getJSONLoadingButton: function(url, data, success, button) {
			var _mui = mui;
			_mui(button).button('loading');
			_mui.ajaxSettings.beforeSend = function(xhr, setting) {
				//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
				console.log('beforeSend:::' + JSON.stringify(setting));
			};

			_mui.ajax(url, {
				data: data,
				dataType: 'json', //服务器返回json格式数据
				type: 'get', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(response) {
					_mui(button).button('reset');
					success(response);
				},
				error: function(xhr, type, errorThrown) {
					_mui(button).button('reset');
					//异常处理；			
					plus.nativeUI.toast(global_stringObject.wangluoyichang);
				}
			});
		},
		/*
		 * 阻止用户操作的ajax方法，获取JSON，显示顶部无限循环进度条
		 * url：接口地址
		 * data：输入参数
		 * success：访问成功后要执行的函数
		 */
		getJSONLoop: function(url, data, success) {
			var _mui = mui;

			_mui('body').progressbar({
				progress: undefined
			}).show();

			_mui.ajaxSettings.beforeSend = function(xhr, setting) {
				//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
				console.log('beforeSend:::' + JSON.stringify(setting));
			};

			_mui.ajax(url, {
				data: data,
				dataType: 'json', //服务器返回json格式数据
				type: 'get', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(response) {
					mui("body").progressbar().hide();
					success(response);
				},
				error: function(xhr, type, errorThrown) {
					mui("body").progressbar().hide();
					//异常处理；			
					plus.nativeUI.toast(global_stringObject.wangluoyichang);
				}
			});
		},
		/*
		 * 阻止用户操作的ajax方法，获取JSON
		 * url：接口地址
		 * data：输入参数
		 * success：访问成功后要执行的函数，注意要关闭等待框
		 */
		getJSONWaiting: function ajax_getJSONWaiting(url, data, success) {
			var _mui = mui,
				plusNativeUI = plus.nativeUI;

			plusNativeUI.showWaiting();

			_mui.ajaxSettings.beforeSend = function(xhr, setting) {
				//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
				console.log('beforeSend:::' + JSON.stringify(setting));
			};

			_mui.ajax(url, {
				data: data,
				dataType: 'json', //服务器返回json格式数据
				type: 'get', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(response) {
					plusNativeUI.closeWaiting();
					success(response);
				},
				error: function(xhr, type, errorThrown) {
					//请求失败，首先关闭等待框
					plusNativeUI.closeWaiting();
					//异常处理；			
//					plusNativeUI.toast(global_stringObject.wangluoyichang);
				}
			});
		},
	},
	dom: {
		/*
		 * 发送短信倒计时
		 * button: 按钮
		 * timeController: 时间控制器对象,包含三个属性
		 *                              intervalId: 定时器id
		 *                                 max: 最大时间
		 *                                 min: 最小时间
		 */
		decrementNumber: function(button, timeController) {
			timeController.max--;
			if(button.tagName.toLowerCase() === "button") {
				button.innerHTML = timeController.max;
			} else if(button.tagName.toLocaleLowerCase() === "input") {
				button.value = timeController.max;
			}

			//if the max has been reached, cancel all pending executions
			if(timeController.max == timeController.min) {
				clearInterval(timeController.intervalId);
				button.dataset.status = "ready";
				if(button.tagName.toLowerCase() === "button") {
					button.innerHTML = "获取验证码";
				} else if(button.tagName.toLocaleLowerCase() === "input") {
					button.value = "获取验证码";
				}
			}
		},
		/*
		 * 根据dataElement是否含有子元素来判断是否展示noInfo
		 */
		displayNoInfo: function(noInfo, dataElement) {
			var noInfoStyle = noInfo.style;
			if(dataElement.childElementCount > 0) {
				noInfoStyle.display = "none";
			} else {
				noInfoStyle.display = "block";
			}
		},
		dragDownToast: function(msg) {
			var menuWrapper = document.getElementById("menu-wrapper"),
				menu = document.getElementById("menu");

			menu.querySelector(".app-msg").innerHTML = msg;
			menuWrapper.className = 'menu-wrapper fade-in-down animated mui-active';
			menu.className = 'menu bounce-in-down animated';

			setTimeout(function() {

				menuWrapper.className = 'menu-wrapper fade-out-up animated';
				menu.className = 'menu bounce-out-up animated';
				setTimeout(function() {
					menuWrapper.classList.add('hidden');
				}, 500);
			}, 1000);

		},
		/*
		 * 通过检查父节点是否含有某个css class
		 * srcNode:被点的节点
		 * targetClass：父节点应包含的css class
		 * 如果找到了满足条件的父节点就返回该父节点，否则返回空
		 */
		getWrapperByClass: function(srcNode, targetClass) {

			var wrapper = srcNode;

			while(wrapper && wrapper.nodeType == Node.ELEMENT_NODE && !wrapper.classList.contains(targetClass) && wrapper.parentNode) {
				wrapper = wrapper.parentNode;
			}

			if(wrapper && wrapper.nodeType == Node.ELEMENT_NODE && wrapper.classList.contains(targetClass)) {
				return wrapper;
			} else {
				return null;
			}

		},
		/*
		 * 通过检查父节点nodeName
		 * srcNode:被点的节点
		 * targetNodeName：父节点nodeName
		 * 如果找到了满足条件的父节点就返回该父节点，否则返回空
		 */
		getWrapperByNodeName: function(srcNode, targetNodeName) {

			var wrapper = srcNode;

			while(wrapper && wrapper.nodeType == Node.ELEMENT_NODE && wrapper.nodeName.toLowerCase() !== targetNodeName && wrapper.parentNode) {
				wrapper = wrapper.parentNode;
			}

			if(wrapper && wrapper.nodeType == Node.ELEMENT_NODE && wrapper.nodeName.toLowerCase() === targetNodeName) {
				return wrapper;
			} else {
				return null;
			}

		},
		selectBox: {
			/*
			 * 通过data为selectbox添加项
			 * @param {element} selectbox: 下拉框
			 * @param {object array} data: 数据
			 */
			addOptions: function(selectbox, data, text, value) {
				for(var i = 0, len = data.length; i < len; i++) {
					var item = data[i];
					var newOption = new Option(item[text], item[value]);
					selectbox.add(newOption, undefined);
				}
			},
			clearOptions: function(selectbox) {
				for(var i = 0, len = selectbox.options.length; i < len; i++) {
					selectbox.remove(0);
				}
			}
		}
	},
	encrypt: {
		MD5Data: function(data) {
			var message = "";
			for(var prop in data) {
				message += (prop + data[prop]);
			}
			message += "qfsdfsdfasd";

			data.sign = MD5(message);
		},
		/*
		 * sha加密，为data加一个属性sign
		 * (obj)data: 要加密的内容
		 * (bool)appendKey: 是否加上key（登录时就不用加）
		 */
		shaObject: function(data, appendKey) {
			var appendKeyOrNot = true;

			if(typeof appendKey === "boolean") {
				appendKeyOrNot = appendKey
			}

			var values = [];

			for(var prop in data) {
				values.push(data[prop]);
			}

			if(appendKeyOrNot) {
				values.push(localStorage.getItem("loc_key") || "");
			}

			var stringToEncode = util_utf16to8(values.join("|"));
			//var stringToEncode = values.join("|");

			var hasher = new jsSHA('SHA-1', 'BYTES');

			console.log("before sha: " + stringToEncode);
			hasher.update(stringToEncode);
			console.log("after sha: " + hasher.getHash('HEX'));
			data.sign = hasher.getHash('HEX');
		},
		shaString: function(content) {
			var hasher = new jsSHA('SHA-1', 'BYTES');
			hasher.update(content);
			return hasher.getHash('HEX');
		}
	},
	helper: {
		openWebView: function(url) {
			mui.openWindow({
				id: url,
				url: url,
				styles: {
					popGesture: "close"
				},
				show: {
					aniShow: "pop-in",
					autoShow: true
				},
				waiting: {
					autoShow: false
				}
			});
		},
		openWebView2: function(url, data) {
			mui.openWindow({
				id: url,
				url: url,
				extras:data,
				styles: {
					popGesture: "close"
				},
				show: {
					aniShow: "fade-in",
					autoShow: true
				},
				waiting: {
					autoShow: false
				}
			});
		},

		/*
		 * (TabController)tabController:标签控制器
		 * (object)currentWebview:tab所在的那个Webview
		 */
		tabbize: function(tabController, currentWebview) {
			var subpages = tabController.subpages;
			var aniShow = tabController.aniShow;

			//创建子webview
			for(var i = 0, len = subpages.length; i < len; i++) {
				var item = subpages[i];
				var temp = {};
				var sub = plus.webview.create(item, item, tabController.subpage_style);
				if(i > 0) {
					sub.hide();
				} else {
					temp[subpages[i]] = "true";
					mui.extend(aniShow, temp);
				}
				currentWebview.append(sub);
			}
		},
	},
	str: {
		addURLParam: function(url, name, value) {
			url += (url.indexOf("?") == -1 ? "?" : "&");
			url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
			return url;
		},
		/*
		 * 去掉逗号分隔的数字中的逗号
		 * commaSeparatedNumber：逗号分隔的数字
		 */
		convertCommaSeparatedNumberToNumber: function(commaSeparatedNumber) {
			var copy = commaSeparatedNumber,
				before, //用于存逗号前的值
				after; //用于存逗号后面的值		       		    
			while(copy.indexOf(",") != -1) {
				var markIndex = copy.indexOf(",");
				before = copy.substring(0, markIndex);
				after = copy.substring(markIndex + 1);
				copy = before + after;
			}
			return copy;
		},
		/*
		 * 拼接ajax URL
		 */
		createAjaxURL: function(ajaxObject, method) {
			return(global_ajaxURL + method);
		},
		createAjaxURLBarcodePay: function(ajaxObject, method) {
			return(global_ajaxURLBarcodePay + method);
		},

	},
};