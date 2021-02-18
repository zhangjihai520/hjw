/*
 * webSocket
 */
function buildWebSocket(userId) {
	if("WebSocket" in window) {
		console.log("ws://" + WSURL + "/ws");
		ws = new ReconnectingWebSocket("ws://" + WSURL + "/ws", null, {
			debug: true,
			reconnectInterval: 5000
		})
	} else {
		ws = new SockJS("http://" + WSURL + "/sockjs/ws")
	}

	ws.onopen = onOpen;
	ws.onmessage = onMessage;
	ws.onerror = onError;
	ws.onclose = onClose;

	function onOpen() {
		if(userId != "") {
			var msg = {
				"modeCode": "bigData_login",
				"userId":userId
			};
			ws.send(JSON.stringify(msg))
		}
	}

	function onMessage(e) {
		var msgData = JSON.parse(e.data);
		switch(msgData.modeCode) {
			case "machine_login":
				login_data(msgData);
				break;
			case "push_bigData":
				load_data(msgData);
				break;
		default:
			console.log(JSON.stringify(msgData));
			break;
		}
	}

	function onError() {

	}

	function onClose() {

	}
}