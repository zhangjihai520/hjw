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

			};
			_mui.ajax(url, {
				data: data,
				dataType: 'json', //服务器返回json格式数据
				type: 'get', //HTTP请求类型
				timeout: global_ajaxTimeout, //超时时间设置为10秒；
				success: function(response) {
					mui.toast(response.msg);
					localStorage.setItem(localcacheName.method_netWorkType, 'true');
					success(response);
				},
				error: function(xhr, type, errorThrown) {
					//请求失败，首先关闭等待框
					localStorage.setItem(localcacheName.method_netWorkType, 'false');
					//异常处理；		
					//					mui.toast(global_stringObject.wangluoyichang);
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
				timeout: global_ajaxTimeout, //超时时间设置为10秒；
				success: function(response) {
					mui.toast(response.msg);
					plusNativeUI.closeWaiting();
					localStorage.setItem(localcacheName.method_netWorkType, 'true');
					success(response);
				},
				error: function(xhr, type, errorThrown) {
					//请求失败，首先关闭等待框
					plusNativeUI.closeWaiting();
					localStorage.setItem(localcacheName.method_netWorkType, 'false');
					//异常处理；		
					//					mui.toast(global_stringObject.wangluoyichang);
				}
			});
		},

		/*
		 * 阻止用户操作的ajax方法，获取JSON
		 * url：接口地址
		 * data：输入参数
		 * success：访问成功后要执行的函数，注意要关闭等待框
		 */
		getJSONByControl: function ajax_getJSONWaiting(url, data, success) {
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
				timeout: read_time, //超时时间设置为10秒；
				success: function(response) {
					plusNativeUI.closeWaiting();
					success(response);
				},
				error: function(xhr, type, errorThrown) {
					//请求失败，首先关闭等待框
					plusNativeUI.closeWaiting();
					//异常处理；
					mui.toast('操作失败，请联系管理员');
					linkControl('', '微型图书馆', '打开柜门失败', '操作失败');
				}
			});
		},

		getJSONHeart: function(url, data, success) {
			var _mui = mui;
			_mui.ajaxSettings.beforeSend = function(xhr, setting) {

			};
			_mui.ajax(url, {
				data: data,
				dataType: 'json', //服务器返回json格式数据
				type: 'get', //HTTP请求类型
				timeout: global_ajaxTimeout, //超时时间设置为10秒；
				success: function(response) {
					localStorage.setItem(localcacheName.method_netWorkType, 'true');
					success(response);
				},
				error: function(xhr, type, errorThrown) {
					//请求失败，首先关闭等待框
					localStorage.setItem(localcacheName.method_netWorkType, 'false');
					//异常处理；		
					//					mui.toast(global_stringObject.wangluoyichang);
				}
			});
		},
	},
	dom: {
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
	},
	encrypt: {
		MD5Data: function(data) {
			var message = "";
			for(var prop in data) {
				message += (prop + data[prop]);
			}
			message += "qfsdfsdfasd";
			//			console.log("message: " + message);
			data.sign = MD5(message);
		},
	},
	helper: {
		/*
		 * 通过webview id来关闭多个webview
		 * (string array)ids: webview id 组成的数组
		 */
		closeWebviews: function(ids) {
			var plusWebview = plus.webview;
			for(var i = 0, len = ids.length; i < len; i++) {
				plusWebview.close(ids[i], "none");
			}
		},
		downloadNewVersion: function(url, callback) {
			console.log("下载地址：" + url);
			var downLoader = plus.downloader.createDownload(url, {
				method: 'GET'
			}, function(download, status) {
				if(status == 200) {
					console.log("200： ");
				} else {
					mui.toast("更新下载失败");
				}
			});

			downLoader.addEventListener("statechanged", function(task, status) {
				if(!downLoader) {
					return;
				}

				switch(task.state) {
					case 1: // 开始
						console.log("开始下载...");
						break;
					case 2: // 已连接到服务器
						console.log("链接到服务器...");
						break;
					case 3: // 已接收到数据		    	
						var pro = parseInt((task.downloadedSize / task.totalSize) * 100) + "%";
						document.getElementById("progressbarArea").style.width = pro;
						document.getElementById("progressbar").innerHTML = pro;
						break;
					case 4: // 下载完成
						document.querySelector(".progress-title").innerHTML = "开始安装,请稍后……"
						var path = task.filename;
						callback(path);
						break;
				}
			});

			downLoader.start();
		},

		downloadNewVedio: function(url, movieName) {
			var downLoader = plus.downloader.createDownload(url, {
				method: 'GET',
				filename: "_www/video/" + movieName
			}, function(download, status) {
				if(status == 200) {
					console.log("200： ");
				} else {
					mui.toast("更新下载失败");

				}
			});

			downLoader.addEventListener("statechanged", function(task, status) {
				if(!downLoader) {
					return;
				}
				switch(task.state) {
					case 1: // 开始
						console.log("开始下载...");
						break;
					case 2: // 已连接到服务器
						console.log("链接到服务器...");
						break;
					case 3: // 已接收到数据
						//console.log( "下载数据更新:" );
						break;
					case 4: // 下载完成
						console.log("statechanged 下载完成！");
						break;
				}
			});
			downLoader.start();
		},
		/*
		 * 关闭顶部进度条
		 */
		endLoading: function() {
			setTimeout(function() {
				mui("body").progressbar().setProgress(100);
				mui("body").progressbar().hide();
			}, 1000);
		},
		/*
		 * 根据nowtime和endtime把倒计时展示到displayElement
		 * nowtime:当前时间
		 * endtime:结束时间
		 * displayElement:展示元素
		 */
		freshTime: function(nowtime, endtime, displayElement) {
			if(nowtime == null) {
				nowtime = new Date();
			}

			//"2016/7/15,12:20:12"
			var lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
			if(lefttime <= 0) {
				displayElement.innerHTML = "已结束";
				//clearInterval(freshInternal);
			} else {

				var d = parseInt(lefttime / 3600 / 24),
					h = parseInt((lefttime / 3600) % 24),
					m = parseInt((lefttime / 60) % 60),
					s = parseInt(lefttime % 60);

				displayElement.innerHTML = '<span class="price">' + d + '</span>天<span class="price">' + h + '</span>时<span class="price">' + m + '</span>分<span class="price">' + s + '</span>秒';

			}
		},
		logOut: function() {
			var _localStorage = localStorage,
				_mui = mui;

			_localStorage.setItem(localcacheName.method_manager_user_id, "");

			_mui.openWindow({
				id: "login.html",
				url: "login.html",
				show: {
					aniShow: "slide-in-bottom"
				},
				waiting: {
					autoShow: false
				}
			});
		},
		openWindow: function(url, param) {
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
				extras: {
					param: param
				},
				waiting: {
					autoShow: false
				}
			});
		},
		/*
		 * 将imgs(集合)中的<img>都加上data-preview-src和data-preview-group
		 * group:第几组
		 */
		previewize: function(imgs, group) {
			for(var i = 0, len = imgs.length; i < len; i++) {
				var item = imgs[i];
				item.setAttribute("data-preview-src", "");
				item.setAttribute("data-preview-group", group);
			}
		},
		/*
		 * 启动顶部进度条
		 */
		startLoading: function() {
			var _mui = mui,
				progress = 0,
				maxProgress = 95;
			_mui('body').progressbar({
				progress: progress
			}).show();

			var simulateLoading = function(container, progress) {
				setTimeout(function() {
					progress += Math.random() * 20;
					if(progress > maxProgress) {
						progress = maxProgress;
					}
					mui(container).progressbar().setProgress(progress);
					if(progress < maxProgress) {
						simulateLoading(container, progress);
					}
				}, Math.random() * 200 + 10);
			};

			simulateLoading('body', progress);
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
	},
};