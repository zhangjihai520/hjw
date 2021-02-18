var img_translate = "images/translate.png",
	taskArr = [],
	isStartTask = !1,
	ZipQuality = 10;

function load(a) {
	if(!a.getAttribute("data-loaded")) {
		var b = a.getAttribute("data-src");
		if(b) {
			var c = "_downloads/image/" + MD5(b) + "." + b.split(".")[b.split(".").length - 1],
				d = plus.io.convertLocalFileSystemURL(c),
				e = new Image;
			e.src = d;
			e.onload = function() {
				setLoaded(a, d)
			};
			e.onerror = function() {
				var e = new Image;
				e.onload = function() {
					setLoaded(a, b)
				};
				e.src = b;
				a.setAttribute("hb_path", c);
				a.setAttribute("sd_path", d);
				taskArr.push(a);
				isStartTask || (isStartTask = !0, startTask())
			}
		}
	}
}
var QDom;

function startTask() {
	if(0 == taskArr.length) isStartTask = !1;
	else {
		var a = taskArr.shift();
		QDom = a;
		var b = a.getAttribute("data-src"),
			c = a.getAttribute("hb_path"),
			a = a.getAttribute("sd_path"),
			d = new Image;
		d.src = a;
		d.onload = function() {
			console.log("\u5df2\u4e0b\u8f7d\u5219\u8df3\u8fc7==" + c);
			startTask()
		};
		d.onerror = function() {
			console.log("\u4e0b\u8f7d\u5730\u5740:" + b);
			console.log("\u4fdd\u5b58\u5730\u5740:" + c);
			var a = plus.downloader.createDownload(b, {
				filename: c,
				timeout: 10,
				retry: 2
			}, function(a, b) {
				200 == b ? 0 > c.toLowerCase().indexOf("gif") &&
					compressImage(c) : (delFile(c), a.abort());
				startTask()
			});
			a.addEventListener("statechanged", onStateChanged, !1);
			a.start()
		}
	}
}

function onStateChanged(a, b) {}

function compressImage(a) {
	plus.zip.compressImage({
		src: a,
		dst: a,
		quality: ZipQuality,
		overwrite: !0
	}, function() {
		console.log("\u538b\u7f29\u6210\u529f,\u8d28\u91cf:" + ZipQuality)
	}, function(a) {
		console.log("\u538b\u7f29\u5931\u8d25")
	})
}

function setLoaded(a, b) {
	a.getAttribute("data-loaded") || (a.classList.add("anim_opacity"), a.setAttribute("data-loaded", !0), a.setAttribute("src", img_translate), a.src = b)
}

function delFile(a) {
	a && plus.io.resolveLocalFileSystemURL(a, function(a) {
		a.remove(function(a) {}, function(a) {})
	})
};