var MAIN_PATH="http://s.huangjw.com";
var MAIN_PATH_INT=MAIN_PATH+"/appInterface";
var DEVICE_CTR="http://127.0.0.1:18001";
var CELL_PAGE_SIZE=72;
var BOOK_LIST_PAGE_SIZE=12;
var DOOR_STATE=false;//设置门开关状态
var COUNT_DOWN,WX_COUNT_DOWN,ZFB_COUNT_DOWN;//公共定时器,微信轮询，支付宝轮询

var LS={
	adminId:"adminId",
	deviceNum:"deviceNum",
	deviceId:"deviceId",
	deviceName:"deviceName",
	cellNum:"cellNum",
	payType:"payType"
}
var globalAjax={
	setDeviceNum:"/set_shelf_id",
	cellList: "/cell_list",
	removeBook:"/remove_book",
	putBook:"/put_book",
	bookType:"/book_type_list",
	bookList:"/book_list",
	bookInfo: "/bookXq",
	weiXinEWM: "/weixin_pay",
	zfbEWM: "/zfbdmf",
	byCell:"/get_book_id_by_cell",
	ItemBuyCallBack: "/zf_status",
	ItemBuyZFBCallBack: "/checkQuery",
	ItemBuy: "/sell_book",
	lampPeriod: "/light_on_period",
	Ccb_Pay:"/ccb_pay",
	ItemBuyLZFCallBack:"/ccb_status"
},
boxctrl={
		method_open: "/open",
		method_reader: "/reader",
		method_state: "/status",
		method_reboot: "/reboot",
		method_lightOnOff:"/lightOnOff"
	}
var doc=document,
    key_basket = [];//记录上次对象,存储当前对象，作为一个数据篮子;




