//api接口
//var ajax_url = 'http://b.huangjw.com/appInterface/'; //正式环境请求地址
//var WSURL="192.168.2.188:85"; //websocket地址
var WSURL ="ws.bncenter.huangjw.com"//websocket地址
var local_url = 'http://127.0.0.1:18001/'; //本地地址
var global_absoluteRoot = 'http://b.huangjw.com';

//var ajax_url = 'http://192.168.2.188:8081/appInterface/'; //测试环境请求地址
var ajax_url = 'http://app.bncenter.huangjw.com/hjwappinterface/appInterface/'; //测试环境请求地址
//var ajax_url_test = 'http://192.168.2.188:85/appInterface/'; //支付测试地址
var ajax_url_test = 'http://ws.bncenter.huangjw.com/appInterface/';//支付测试地址

var ajax_url_for_read = 'http://ws.bncenter.huangjw.com/appInterface/'; //测试环境请求地址

var big_screen_url ='http://ws.bncenter.huangjw.com/';//大屏展示地址
//var big_screen_url ='http://192.168.2.188:8081/appInterface/';//大屏测试
//var global_official_ajaxURL = "118.31.34.120:85/appInterface/";//公司服务器
//var global_official_ajaxURL = "192.168.1.103:8080";

/*
 * 拼接ajax URL
 */
function createAjaxURL(method) {
	return(ajax_url + method);
}

function createBoxctrlServiceURL(method) {
	return(local_url + method);
}

function createAjaxURL_test(method) {
	return(ajax_url_test + method);
}

function createBigScreenService(menthod){
	return(big_screen_url + menthod);
}

function createAjaxURLForRead(method) {
	return(ajax_url_for_read + method);
}

//接口名
var interface_name = {
	method_book_type_list: "book_type_list", //获取书籍类型列表
	method_book_list: "lbr_book_list", //获取书籍列表
	
	method_lbr_brbookList:"lbr_findbookList", //当前所读取的待借书籍列表
	method_lbr_borrow_book:"lbr_borrow_book", //确定借出
	method_lbr_borrowingList:"lbr_borrowingList", //在借 书籍列表
	method_lbr_renew_borrow:"lbr_renew_borrow", //续借
	method_lbr_return_book:"lbr_return_book", //还书
	
	method_lbr_getDepositFee:"lbr_getDepositFee", //获取押金、制卡费
	method_handCard:"lbr_handCard", //办卡
	method_replace_handCard:"replace_handCard", //补卡
	method_ZBFnotify:"ZBFnotify", //支付回调测试
	
	method_shelf_manager_log_in: "shelf_manager_log_in", //管理员登录
	method_bind_machine: 'bind_machine', //设置设备号
	
	method_lbr_ebooks_list:"lbr_ebooks_list", //电子阅读器书籍列表
	
	method_lbr_under_bookRack:'lbr_under_bookRack',//书籍下架
	method_lbr_on_bookRack:'lbr_on_bookRack',//书籍上架
	method_getRackInfoByLevelCode:'getRackInfoByLevelCode',//获取书架信息
	method_drop_bookrack:"drop_bookrack",//获取书架
	method_drop_Racklevel:"drop_Racklevel",//获取书架层位
	method_drop_area:"drop_area",//获取区
	method_lbr_bookrack_check:"lbr_bookrack_check",//对书架上书籍盘点，信息比对列表
	method_login:'admin/login/userLogin',//大屏登入
}

//本地缓存名
var localcacheName = {
	name: "setting",
	//首页
	method_cell_list: 'cell_list',
	method_shelf_QR: 'shelf_QR',
	method_orgQrCodeUrl:'orgQrCodeUrl',
	method_macName:'macName',
	method_manager_user_id:"manager_user_id",
	method_borrow_user_id:"borrow_user_id",
	method_shelfId: "shelfId",
	method_shelfNo: "shelfNo", //设备号
	method_macTypeId:"macTypeId",
	method_macNumber:"macNumber",
	method_netWorkType:"netWorkType", //网络状态
	
	method_make_card_type:"make_card_type", //办卡，补卡状态
	method_deposit:"deposit", //押金
	method_cardFee:"cardFee", //制卡费
	method_out_trade_no:"out_trade_no",//订单流水号
	method_wx_qr_code:"wx_qr_code", //微信二维码
	method_zfb_qr_code:"zfb_qr_code", //支付宝二维码
	method_identitynumber:"identitynumber", //身份证号
	method_user_name:"user_name", //姓名
	method_user_sex:"user_sex", //性别
	method_phone_num:"phone_num", //手机号
	
	method_out_trade_no:"out_trade_no", //办卡支付交易流水号
	method_book_code:"book_code",//书籍编号
	method_book_codes:"book_codes", //书籍编号列表
	method_book_url:"book_url",
	method_book_libraryId:"libraryId",//图书馆id
	method_book_bookrackId:"bookrackId",//书架id
	method_book_racklevelId:"racklevelId"//层位id
}

//常量
var now_time,doc=document,bigImgCount=0,countDown,inter,writeInput;
	
var cellListPageController,
    SKIP_TIME=35000,//主页跳转到睡眠轮播图延迟时间
	PageSize = 16,	//图书列表设置显示条目
	glo_countPerPage = 20,			//书格列表设置显示条目
    glo_audioPlayer = null,         //音频
    key_basket=[],//记录上次keyboard按键对象
    card_length=10,
    version = '1.0.0';


//正则表达式对象
var global_regexp = {
	cellPhone: /^1[3|4|5|7|8]\d{9}$/,
	email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	idCard: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
};

var borrow_type = {
	BORROW:0,
	BORROW_CONTINUE:1,
	BORROW_SCAN:2
}

var global_ajaxResult = {
	SUCCESS: 1,
	FAILED: 0,
	SIGN_ERROR: -1
};
var global_ajaxTimeout = 1 * 10 * 1000;
var global_doorState = {
	EMPTY: 0,
	OCCUPIED: 1,
	OPEN: 2
};

var make_card_type = {
	make_card:1,
	supplement_card:2
}

var is_need_login = {
	yes:1,
	no:0
}

//字符串
var global_stringObject = {
	backSpace: "退格",
	project: "微型图书馆",
	protocol: "《微型图书馆条款》",
	serviceDial: "4000671973",
	serviceDisplay: "400-067-1973",
	wangluoyichang: "网络异常"
};