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
				console.log('beforeSend:::' + JSON.stringify(setting));
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
//				console.log('beforeSend:::' + JSON.stringify(setting));
			};

			_mui.ajax(url, {
				data: data,
				dataType: 'json', //服务器返回json格式数据
				type: 'get', //HTTP请求类型
				timeout: global_ajaxTimeout, //超时时间设置为10秒；
				success: function(response) {

					success(response);

					//util_endLoading();
					util.helper.endLoading();
				},
				error: function(xhr, type, errorThrown) {
					mui("body").progressbar().hide();
					//异常处理；
					mui.toast(global_stringObject.wangluoyichang, {
						duration: 'long',
						type: 'div'
					});
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
				timeout: global_ajaxTimeout, //超时时间设置为10秒；
				success: function(response) {
					_mui(button).button('reset');

					success(response);

				},
				error: function(xhr, type, errorThrown) {
					_mui(button).button('reset');
					//异常处理；			
					mui.toast(global_stringObject.wangluoyichang, {
						duration: 'long',
						type: 'div'
					});
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
				timeout: global_ajaxTimeout, //超时时间设置为10秒；
				success: function(response) {
					mui("body").progressbar().hide();
					success(response);
				},
				error: function(xhr, type, errorThrown) {
					mui("body").progressbar().hide();
					//异常处理；			
					mui.toast(global_stringObject.wangluoyichang, {
						duration: 'long',
						type: 'div'
					});
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

			_mui.ajaxSettings.beforeSend = function(xhr, setting) {	};
			
			_mui.ajax(url, {
				data: data,
				dataType: 'json', //服务器返回json格式数据
				type: 'get', //HTTP请求类型
				timeout: global_ajaxTimeout, //超时时间设置为10秒；
				success: function(response) {
					plusNativeUI.closeWaiting();
					success(response);
				},
				error: function(xhr, type, errorThrown) {
					//请求失败，首先关闭等待框
					plusNativeUI.closeWaiting();
					//异常处理；			
					mui.toast(global_stringObject.wangluoyichang, {
						duration: 'long',
						type: 'div'
					});
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
			button.innerHTML = timeController.max;
			//if the max has been reached, cancel all pending executions
			if(timeController.max == timeController.min) {
				clearInterval(timeController.intervalId);
				button.dataset.status = "ready";
				button.innerHTML = "获取验证码";
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
			console.log("message: " + message);
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
		checkUpdate: function() {
			var ao = global_ajaxObject.setting;
			var url = util.str.createAjaxURL(ao, ao.method_check_update_shelf);
			var data = {
				version: plus.runtime.version

			};
			var success = function(response) {
				/*
				if(response.needUpdate){
					if(response.forceUpdate){
						mui.alert('发现新版本，请更新', global_stringObject.project, function() {
							plus.runtime.openURL(response.url);
						});
					}else{										
						mui.confirm('发现新版本，请更新', global_stringObject.project, ['以后再说', '立即更新'], function(e) {
							if (e.index == 1) {
								plus.runtime.openURL(response.url);
							} 
						});
					}
					
					
				}
				*/

			};
			util.ajax.getJSON(url, data, success);
		},
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
		downloadNewVersion: function(url) {
			var downLoader = plus.downloader.createDownload(url, {
				method: 'GET',
				filename: "_doc/update/new_version.apk"
			}, function(download, status) {
				if(status == 200) {
					console.log("200： ");
					//mui.back();

					var path = download.filename;
					plus.runtime.install(path, {
						force: false
					}, function() {

						console.log("install success");
					}, function() {
						console.log("install failed");

					});

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
		 * 为轮播图片的topDiv添加innerHTML
		 * topDiv:轮播图片的topDiv
		 * bottomDiv: 轮播图片的bottomDiv
		 * srcs:正常的图片地址(不包括额外添加的第一张和最后一张)
		 */
		createSlidingImgHTML: function(topDiv, bottomDiv, srcs) {
			if(srcs instanceof Array) {
				var _document = document;

				for(var i = 0, len = srcs.length; i < len; i++) {
					//添加正常图片
					var imgDiv = _document.createElement("div");
					imgDiv.className = "mui-slider-item";
					imgDiv.innerHTML = '<a><img src="' + srcs[i].src + '" data-preview-src="" data-preview-group="10"></a>';
					topDiv.appendChild(imgDiv);

					//添加指示点
					var indicatorDiv = _document.createElement("div");
					if(i == 0) {
						indicatorDiv.className = "mui-indicator mui-active";
					} else {
						indicatorDiv.className = "mui-indicator";
					}
					bottomDiv.appendChild(indicatorDiv);

				}

				//补充第一张图片和最后一张图片
				//额外增加的一个节点(循环轮播：第一个节点是最后一张轮播)
				var imgDivAsFirst = _document.createElement("div");
				imgDivAsFirst.className = "mui-slider-item mui-slider-item-duplicate";
				imgDivAsFirst.innerHTML = '<a><img src="' + srcs[srcs.length - 1].src + '"></a>';
				topDiv.insertBefore(imgDivAsFirst, topDiv.firstChild);

				//额外增加的一个节点(循环轮播：最后一个节点是第一张轮播)
				var imgDivAsLast = _document.createElement("div");
				imgDivAsLast.className = "mui-slider-item mui-slider-item-duplicate";
				imgDivAsLast.innerHTML = '<a><img src="' + srcs[0].src + '"></a>';
				topDiv.appendChild(imgDivAsLast);
			}
		},
		/*
		 * 制作轮播图
		 * slider:打算做成轮播的div(<div id="slider" class="mui-slider" >)
		 * srcs:图片地址数组
		 * 返回HTML,上半部分为图片,下半部分为指示点
		 */
		displaySlider: function(slider, srcs) {
			//slider.innerHTML = "";
			var _document = document;
			var html = '';
			//topDiv存放图片
			var topDiv = _document.createElement("div");
			topDiv.className = "mui-slider-group mui-slider-loop";

			//bottomDiv存放指示点
			var bottomDiv = _document.createElement("div");
			bottomDiv.className = "mui-slider-indicator";

			util.helper.createSlidingImgHTML(topDiv, bottomDiv, srcs);

			slider.appendChild(topDiv);
			slider.appendChild(bottomDiv);
		},
		/*
		 * 元素dataset上保存有startdate和enddate，需要用其生成一个Date对象，加上1秒，再保存回dataset中，接着调用util_freshTime
		 * elementData: 数据保存的元素
		 * elementDisplay： 展示时间的元素
		 * 有时候elementData==elementDisplay
		 */
		elementCountdown: function() {
			var dataset = elementData.dataset;
			var startDate = new Date(dataset.startdate);

			startDate.setSeconds(startDate.getSeconds() + 1);
			dataset.startdate = startDate.toUTCString();
			util_freshTime(new Date(dataset.startdate), new Date(dataset.enddate), elementDisplay);
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

			_localStorage.setItem(global_localStorage.userId, "");

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
		openWindow: function(url){
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
		/*
		 * 用代码来切换选项卡
		 * (element)tab: 要切换到的tab
		 */
		switchTab: function(tab) {
			mui.trigger(tab, 'tap');
			//切换选项卡高亮
			var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
			if(tab !== current) {
				current.classList.remove('mui-active');
				tab.classList.add('mui-active');
			}
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
		createBoxctrlServiceURL: function(ajaxObject, method) {
			return(global_boxctrlService + method);
		},

		Trim: function(str, is_global) {
			var result;
			result = str.replace(/(^\s+)|(\s+$)/g, "");
			if(is_global.toLowerCase() == "g") {
				result = result.replace(/\s/g, "");
			}
			return result;
		}
	},
};