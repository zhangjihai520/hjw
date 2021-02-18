//ajax请求，后端的类/对象
var global_ajaxObject = {
	boxctrl: {
		name: "boxctrl",
		method_get_books_in_cell: "readEPC",
		method_light: "lightOnOff",
		method_open: "open",
		method_reader: "reader",
		method_reboot: "reboot",
		method_state: "getDoor",
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
//		method_book_detail: 'bookXq',
		method_book_detail:'book_details',
		method_book_list: 'book_list',
		method_book_list_search_for_shelf: 'book_list_search_for_shelf',
		method_book_type_list: 'book_type_list',
		method_borrow_book: 'borrow_book',
		method_borrow_book_status_official: 'borrow_book_status_official',
		method_get_book: 'get_book',
		
//		method_get_book_vertical: 'getBookVertical',
		method_get_book_vertical:'get_book',
		method_random_code_status_official: 'random_code_status_official',
		method_report_problem: 'report_problem',
		method_return_book: 'return_book',
		method_return_which_cell: 'returnWhichCell',
	},
	setting: {
		name: "setting",
		//首页
		method_cell_list: 'cell_list',
		method_change_book: 'change_book',
		method_check_update_shelf: 'check_update_shelf',
		method_compare: 'compare',
		method_compare_cell_no: 'compareCellNo',
		method_compare_return: 'compareReturn',
		method_detect_compare: 'detect_compare',
		method_help: 'help',
		method_index: 'index',
		method_light_on_period: 'light_on_period',
		method_manager_close_door: 'managerCloseDoor',
		method_multi_cell_list: 'multiCellList',
		method_news_detail: 'news_detail',
		method_notice_list: 'notice_list',
		method_platform_info: 'platform_info',
		method_problem_list: 'problem_list',
		method_put_book: 'put_book',
		method_remove_book: 'remove_book',
		method_set_shelf_id: 'set_shelf_id',
		method_set_shelf_no: 'set_shelf_no',
		method_user_close_door: 'userCloseDoor',
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
        method_get_book_id_by_cellNo: 'borrow_book_by_cellNo',
		method_shelf_log_in: "borrow_book_by_userName",
		method_shelf_manager_log_in: "shelf_manager_log_in",
		method_upload_avatar: "upload_avatar",
		method_user_detail: "user_detail",
		method_verification_code: "text_code",
	}
};

//var global_official_ajaxURL = "tnb3ed.natappfree.cc";//118.31.34.120:85
var global_official_ajaxURL = "b.huangjw.com"; //118.31.34.120:85

var global_absoluteRoot = 'http://' + global_official_ajaxURL;
//var WSURL = "192.168.1.103:8080";  
//var  WSURL="118.31.34.120:8080";
var WSURL = "118.31.34.120:85";
//var WSURL="5d4ibe.natappfree.cc";

//ajax请求公网域名
var global_ajaxURL = global_absoluteRoot + '/appInterface/';
var global_boxctrlService = "http://127.0.0.1:18001/";
//var global_imgURL = global_absoluteRoot + 'pxcms-java/src/main/resources/static';
var global_imgURL = '';
//新闻列表暂无图片
var global_noPicURL = 'images/no_pic.jpg';
var global_actionType = {
	BORROW: 1,
	RETURN: 2,
};
var global_ajaxResult = {
	SUCCESS: 1,
	FAILED: 0,
	SIGN_ERROR: -1,
	NO_CELL_AVAILABLE: 2
};
var global_ajaxTimeout = 1 * 60 * 1000;
var global_BOOK_CODE_LENGTH = 24;
var global_doorState = {
	EMPTY: 0,
	OCCUPIED: 1,
	OPEN: 2
};
var global_dialogOptions = {
	NO: "否",
	YES: "是",
};
var global_lightState = {
	ON: 1,
	OFF: 0
};
var global_localStorage = {
	actionType: "action_type",
	bookCode: "book_code",
	//关于id
	bookId: "bookId",
	//通过格子编号获取书id时的格子编号
	cellNo: "cell_no",
	//取书验证码
	code: "code",
	helpId: "help_id",
	managerId: "manager_id",
	readId: "read_id",
	reserveCode: "reserveCode",
	shelfId: "shelfId",
	shelfNo: "shelfNo", //设备号
	userId: "user_id",
	json: {
		/*
		 * bookName 	string 					书名
		 * shelfNo 	string 					柜门号
		 */
		getBook: "getBook",
		/*
		 * start    number    例如: "8:30"就返回 830 开灯时间点
		 * end    number    例如: "20:30"就返回 2030 关灯灯时间点
		 */
		lightsOnPeriod: "lightsOnPeriod"
	}
};

//正则表达式对象
var global_regexp = {
	cellPhone: /^1[3|4|5|7|8]\d{9}$/,
	email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	idCard: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
};

//字符串
var global_stringObject = {
	backSpace: "退格",
	noShelfNo: "-",
	project: "微型图书馆",
	protocol: "《微型图书馆条款》",
	serviceDial: "4000671973",
	serviceDisplay: "400-067-1973",
	wangluoyichang: "加载失败"
};

var global_timer = {
	MAX: 5,
	MIN: 0
};
var global_wxScene = {
	FAVORITE: "WXSceneFavorite",
	SESSION: "WXSceneSession",
	TIMELINE: "WXSceneTimeline"
};
//var bigList=document.getElementById("slideshow")

var sliderImgs = [],
	key_basket = [],
	pageBox=[],
	dataBox=[],
	now_time, doc = document,
	ws = null,
	inputType = "0",
	bigList = doc.getElementById("slideshow"),
	bigImgCount = 0,
	writeInput,
	countDown,
	isOperate,
	OPNE_PERSON,//借书人的ID
	OPEN_CELLNUM,//预打开的格口
	SKIP_TIME=35000,//主页跳转到睡眠轮播图延迟时间
    glo_countPerPageBookList = 12,	//图书列表设置显示条目
    glo_pageControllerBookList,
	glo_countPerPage = 20,			//书格列表设置显示条目
	glo_audioPlayer = null,         //音频
	global_BOOK_CODE_LENGTH=24//录入书本的编码长度	
	;
//doc.getElementById("serId").innerHTML = "服务器IP：" + global_official_ajaxURL + "(大格口大屏修改版)";

var submit_data_login = {
		userName: {
			value: "",
			text: "用户名"
		},
		password: {
			value: "",
			text: "密码"
		}
	},
	submit_data_changePw = {
		userName: {
			value: "",
			text: "用户名"
		},
		password: {
			value: "",
			text: "密码"
		},
		newPassword: {
			value: "",
			text: "新密码"
		},
		confirmPassword: {
			value: "",
			text: "确认密码"
		}
	},
	submit_data_shelfNo = {
		value: ""
	},
	submit_data_bookDetail = {
		userName: {
			value: "",
			text: "学号"
		},
		password: {
			value: "",
			text: "密码"
		}
	},
	flagCtrl=1,
	glo_bookCodeBookDetail = "",
	glo_cellNoBookDetail, glo_bookNameBookDetail, glo_randomCodeBookDetail, glo_randomCodeIntervalBookDetail;
var glo_countPerPageCellList = 77,
	glo_pageControllerCellList, glo_checkDoorStateIntervalCellList;
var glo_maxTimeGetBookSuccess = 60,
	glo_minTimeGetBookSuccess = 0;
var glo_cellStateIntervalGetBookSuccess;
var submit_code_get_book_id_by_cell;
var glo_platformInfoIntervalHome, glo_controlLightIntervalHome, glo_getSlidingImagesIntervalHome, glo_slideIntervalHome, glo_tappedElementHome, glo_tipsIntervalHome, glo_tipsHome = ["A", "B", "C", "D"],
	glo_TimeCountDownInterval, glo_tipIndexHome = 0;
var submit_code_input_code, glo_bookIdInputCode, glo_cellNoInputCode, glo_bookNameInputCode;
var submit_data_login_student = {
	userName: {
		value: "",
		text: "学号"
	},
	password: {
		value: "",
		text: "密码"
	}
};
var submit_data_report_problems = {
	userId: localStorage.getItem(global_localStorage.userId) || "",
	bookShelfId: public_getBookShelfId(),
	bookId: localStorage.getItem(global_localStorage.bookId),
	readId: localStorage.getItem(global_localStorage.userId) ? localStorage.getItem(global_localStorage.readId) : "",
	problemIds: ""
};
var glo_bookCodeReturnBook = "",
	glo_bookNameReturnBook, glo_cellNoReturnBook;
/*
 * 图书裂变，手势翻页变量
 */
var MOVELEN = 200,
	startX, startY, moveEndX, moveEndY, X, Y;
/*
 * 各个页面定时器的时间设置
 */
var returnBook_countTime = 120,
	inputCode_countDown = 60,
	bookDetail_countTime = 120,
	managerLogin_countTime = 120,
	changePassword_countTime = 120,
	openDoor_countTime = 30;
	
var version = '1.1.2';