function GetNetWorkState() {
	plus.networkinfo.getCurrentType()
}



function changeStyle(c) {
	c = document.querySelectorAll(c);
	for(var d = 0; d < c.length; d++) c[d].style.borderColor = "transparent"
}


var IsNetWorkCanUse = function() {
		return "\u672a\u77e5" == GetNetWorkState() || "\u672a\u8fde\u63a5\u7f51\u7edc" == GetNetWorkState() ? !1 : !0
	},
	ajax = function(c, d, b, a, h) {
		console.log("\u68c0\u6d4b\u7f51\u7edc\u73af\u5883:" + GetNetWorkState());
		0 != IsNetWorkCanUse() && (console.log("\u8fdb\u5165ajax\u65b9\u6cd5..."), console.log("url:" + c + "|type:" + d + "|dataType:" + b), mui.ajaxSettings.beforeSend = function(b, a) {
			console.log("beforeSend:::" + JSON.stringify(a))
		}, mui.ajaxSettings.complete = function(b, a) {
			console.log("complete:::" +
				a);
			console.log("ajax\u7ed3\u675f...")
		}, mui.ajax(c, {
			data: a,
			dataType: b,
			type: d,
			timeout: 1E4,
			success: function(b) {
				h(b)
			},
			error: function(b, a, c) {
				console.log("xhr:" + b + "|type:" + a + "|errorThrown:" + c)
			}
		}))
	},
	common = function(c) {
		c = {};
		var d = function(b, a) {
			a = a || [];
			var c = b.previousElementSibling,
				f = b.nextElementSibling;
			b && !a.Contains(b) && a.push(b);
			c && c.tagName == b.tagName && !a.Contains(c) && d(c, a);
			f && f.tagName == b.tagName && !a.Contains(f) && d(f, a);
			return a
		};
		c.getAllDomBrothers = d;
		c.myasync = function(b, a, c) {
			var f = function(a, e) {
				if(1 >
					a.length) return c && c();
				e(a.shift(), function() {
					f(b, e)
				})
			};
			f(b, a)
		};
		c.hashCode = function(b) {
			var a = 0;
			if(!b || 0 == b.length) return a.toString();
			for(i = 0; i < b.length; i++) char = b.charCodeAt(i), a = (a << 5) - a + char, a &= a;
			return a.toString()
		};
		c.getUid = function() {
			return Math.floor(1E8 * Math.random() + 1E7).toString()
		};
		c.GetDeviceInfo = function() {
			for(var b = {
					IMEI: plus.device.imei,
					IMSI: plus.device.imsi,
					Model: plus.device.model,
					Vendor: plus.device.vendor,
					UUID: plus.device.uuid,
					Screen: plus.screen.resolutionWidth * plus.screen.scale + "x" +
						plus.screen.resolutionHeight * plus.screen.scale + "",
					DPI: plus.screen.dpiX + "x" + plus.screen.dpiY,
					isWakelock: plus.device.isWakelock(),
					getVolume: plus.device.getVolume(),
					OS: {}
				}, a = 0; a < plus.device.imsi.length; a++) b.IMSI += plus.device.imsi[a];
			a = {};
			a[plus.networkinfo.CONNECTION_UNKNOW] = "\u672a\u77e5\u7f51\u7edc";
			a[plus.networkinfo.CONNECTION_NONE] = "\u672a\u8fde\u63a5\u7f51\u7edc";
			a[plus.networkinfo.CONNECTION_ETHERNET] = "\u6709\u7ebf\u7f51\u7edc";
			a[plus.networkinfo.CONNECTION_WIFI] = "WiFi\u7f51\u7edc";
			a[plus.networkinfo.CONNECTION_CELL2G] =
				"2G\u8702\u7a9d\u7f51\u7edc";
			a[plus.networkinfo.CONNECTION_CELL3G] = "3G\u8702\u7a9d\u7f51\u7edc";
			a[plus.networkinfo.CONNECTION_CELL4G] = "4G\u8702\u7a9d\u7f51\u7edc";
			b.NetworkInfo = a[plus.networkinfo.getCurrentType()];
			b.OS = {
				Language: plus.os.language,
				Version: plus.os.version,
				Name: plus.os.name,
				Vendor: plus.os.vendor
			};
			return b
		};
		c.createShortcut = function(b, a) {
			if(mui.os.android) {
				var c = plus.android.importClass("android.content.Intent"),
					f = plus.android.importClass("android.graphics.BitmapFactory"),
					d = plus.android.runtimeMainActivity(),
					e = new c("com.android.launcher.action.INSTALL_SHORTCUT");
				e.putExtra(c.EXTRA_SHORTCUT_NAME, b);
				e.putExtra("duplicate", !1);
				b = plus.io.convertLocalFileSystemURL(a);
				f = f.decodeFile(b);
				e.putExtra(c.EXTRA_SHORTCUT_ICON, f);
				f = new c(c.ACTION_MAIN);
				f.setComponent(d.getComponentName());
				e.putExtra(c.EXTRA_SHORTCUT_INTENT, f);
				d.sendBroadcast(e)
			}
		};
		c.bindQuit = function() {
			if(mui.os.android) {
				var b = 0;
				mui.back = function(a) {
					b++;
					1 < b ? plus.runtime.quit() : plus.nativeUI.toast("\u518d\u6309\u4e00\u6b21\u9000\u51fa\u5e94\u7528");
					setTimeout(function() {
						b = 0
					}, 1E3);
					return !1
				}
			}
		};
		c.androidMarket = function(b) {
			plus.runtime.openURL("market://details?id=" + b)
		};
		c.iosAppstore = function(b) {
			plus.runtime.openURL("itms-apps://" + b)
		};
		return c
	}(mui);