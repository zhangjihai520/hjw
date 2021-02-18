//ajax请求，后端的类/对象
var global_ajaxObjectLL = {
	HelpArticle: "/help",
	IndexScrollImg: "/index",
	ListMenu: "/book_type_list",
	ListMain: "/book_list",
	TakeSumbit: "/get_book",
	ItemInfo: "/bookXq",
	Book_Details:"/book_details",
	ItemBorrowSta: "/borrow_book_status_official",
	RepairProblem: "/problem_list",
	RepairSumbit: "/report_problem",
	LoginSumbit: "/shelf_manager_log_in",
	ListKeyboardGetId: "/get_book_id_by_cell"
};
//var ApiUrl = "http://192.168.1.27:89/appInterface";
//var ApiUrl = "http://192.168.1.35:89/appInterface";
//var ApiUrl = "http://192.168.1.32:85/appInterface";
var g_domain= "http://b.huangjw.com/appInterface";//正式
var  WSURL="118.31.34.120:85";
//http://abxx6y.natappfree.cc
//var g_domain = "http://192.168.2.85:8080/appInterface";

var ApiUrl = g_domain;
var global_localStorageLL = {
	//设备号
	deviceId: "loc_deviceId",
	//设备编号
	deviceSysId: "Sys_deviceId",
	//图书编号
	bookItemId: "loc_bookItemId",
	//语言类型
	languageType: "loc_languageId",
	//格子编号
	geziNumber: "loc_geziNumber"

};

//字符串
var global_stringObjectLL = {
	servicePhone: "4008637377",
	serviceTelephone: "4008637377"
};

//ajax请求，后端的类/对象
var global_ajaxObject = {
	boxctrl: {
		name: "boxctrl",
		method_open: "open",
		method_reader: "reader",
		method_state: "status",
		method_reboot: "reboot",
		method_light:"light"
	},
	config: {
		name: "config",
		method_about_detail: "about_detail",
		method_about_list: "about_list",
		method_get_sliding_pictures: "get_sliding_pictures",
		method_guide_detail: "guide_detail",
		method_guide_list: "guide_list",
		method_platform_detail: "platform_detail",
		method_profit_rule: "profit_rule",
	},
	message: {
		name: "message",

	},
	news: {
		name: "news",
		method_get_sliding_pictures: "get_sliding_pictures",
		method_platform_news_detail: "platform_news_detail",
		method_platform_news_list: "platform_news_list"
	},

	order: {
		name: "order",
		method_business_detail: 'business_detail',
		method_business_list: 'business_list',
		method_cancel_application: 'cancel_application',
	},
	product: {
		name: "product",
		method_book_detail: 'bookXq',
		method_book_list: 'book_list',
		method_book_type_list: 'book_type_list',
		method_borrow_book: 'borrow_book',
		method_borrow_book_status_official: 'borrow_book_status_official',
		method_get_book: 'get_book',
		method_get_book_id_by_cell: 'get_book_id_by_cell',
		method_report_problem: 'report_problem',
		method_return_book: 'return_book',
		method_borrow_book_official: 'borrow_book_official',
		method_book_list_search_for_shelf: 'book_list_search_for_shelf'	,
		method_borrow_book_userName: 'borrow_book_by_userName',
		method_borrow_book_star:'borrow_book_star', //借书开始方法
		method_borrow_book_end:'borrow_book_end', //借书结束方法
		method_take_book_code:'take_book_code', //预约取书开始方法
		method_return_book_star:'return_book_star',
		method_return_book: 'return_book', //还书
		method_return_book_end:'return_book_end',//
	},
	setting: {
		name: "setting",
		//首页
		method_cell_list: 'cell_list',
		method_change_book: 'change_book',
		method_check_update_shelf: 'check_update_shelf',
		method_help: 'help',
		method_index: 'index',
		method_news_detail: 'news_detail',
		method_notice_list: 'notice_list',
		method_problem_list: 'problem_list',
		method_put_book: 'put_book',
		method_remove_book: 'remove_book',
		method_set_shelf_id: 'set_shelf_id',
		method_set_shelf_no: 'set_shelf_no',
		method_shelf_QR: 'shelf_QR',
		method_shelf_Name:'shelf_Name',
		method_start_Light:'start_light',
		method_end_Light:'end_light'

	},
	user: {
		name: "user",
		method_book_list: "book_list",
		method_change_password: "change_password_tel",
		method_edit_user_detail: "edit_user_detail",
		method_forget_password: "forget_password",
		method_letter_count: "letter_count",
		method_letter_list: "message_list",
		method_letter_detail: "message_detail",
		method_login: "log_in",
		method_register: "register",
		method_shelf_log_in: "shelf_log_in",
		method_tel_login :"tel_login",
		method_shelf_manager_log_in: "shelf_manager_log_in",
		method_upload_avatar: "upload_avatar",
		method_user_detail: "user_detail",
		method_verification_code: "text_code",
	}
};



//var l_waiwang = "114.215.47.37:85";
//var l_waiwang = "b.huangjw.com";//正式
var l_waiwang = "118.31.34.120:95";//测试
//var l_waiwang = "192.168.1.35:85";
//var waiwang = "192.168.1.47:85";
var global_test_ajaxURL = l_waiwang;
var global_official_ajaxURL = "b.huangjw.com";
//var global_official_ajaxURL = "abxx6y.natappfree.cc";
//var global_official_ajaxURL = "eshdp8.natappfree.cc";//公司服务器
//var global_official_ajaxURL = "t25hkm.natappfree.cc";

var global_absoluteRoot = 'http://' + global_official_ajaxURL;
//ajax请求公网域名
var global_ajaxURL = global_absoluteRoot + '/appInterface/';
var global_boxctrlService = "http://127.0.0.1:18001/";
//var global_imgURL = global_absoluteRoot + 'pxcms-java/src/main/resources/static';
var global_imgURL = 'http://b.huangjw.com/';
//新闻列表暂无图片
var global_noPicURL = 'images/no_pic.jpg';

var global_ajaxResult = {
	SUCCESS: 1,
	FAILED: 0,
	SIGN_ERROR: -1
};

var global_ajaxTimeout = 10000;

var global_doorState = {
	EMPTY: 0,
	OCCUPIED: 1,
	OPEN: 2
};

var global_dialogOptions = {
	NO: "否",
	YES: "是",

};

var global_localStorage = {
	bookCode: "book_code",
	//关于id
	bookId: "bookId",
	//取书验证码
	code: "code",
	helpId: "help_id",
	shelfId: "shelfId",
	shelfNo: "shelfNo", //设备号
	userId: "user_id",
	method_readId:"readId",
	ShopUserID: "loc_ShopUserID",
	method_borrow_user_id:"borrow_user_id",
	bookName:"bookName",
	json: {
		/*
		 * bookName 	string 				书名
		 * shelfNo 	string 					柜门号
		 */
		getBook: "getBook"
	}
};

//正则表达式对象
var global_regexp = {
	cellPhone: /^1[3|4|5|7|8]\d{9}$/,
	email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	idCard: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
};

var global_share = {
	WEIXIN: "weixin"
};
//字符串
var global_stringObject = {
	backSpace: "退格",
	project: "微型图书馆",
	protocol: "《微型图书馆条款》",
	serviceDial: "4000671973",
	serviceDisplay: "400-067-1973",
	wangluoyichang: "加载失败"
};

var global_wxScene = {
	FAVORITE: "WXSceneFavorite",
	SESSION: "WXSceneSession",
	TIMELINE: "WXSceneTimeline"
};

var now_time,doc=document,bigImgCount=0,countDown, isOperate,inter,writeInput;

/*
* 各个页面定时器的时间设置
*/
var returnBook_countTime=120,inputCode_countDown=60,bookDetail_countTime=12,managerLogin_countTime=120,changePassword_countTime=120,openDoor_countTime=30;
var key_basket=[];//记录上次keyboard按键对象
var inputType = '';