//ajax请求，后端的类/对象
var global_ajaxObject = {
	boxctrl: {
		name: "boxctrl",
		method_open: "open",
		method_reader: "reader",
		method_state: "status",
		method_reboot: "reboot",
		method_lightOnOff:"lightOnOff"
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
		method_book_list_search_for_shelf: 'book_list_search_for_shelf',
		method_borrow_book_userName: 'borrow_book_by_userName'
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


var global_imgURL = '';
//新闻列表暂无图片
var global_noPicURL = 'images/no_pic.jpg';

var global_ajaxResult = {
	SUCCESS: 1,
	FAILED: 0,
	SIGN_ERROR: -1
};
var global_ajaxTimeout = 1 * 60 * 1000;
var global_doorState = {
	EMPTY: 0,
	OCCUPIED: 1,
	OPEN: 2
};

var global_localStorage = {
	bookCode: "book_code",
	//关于id
	bookId: "bookId",
	//取书验证码
	code: "code",
	helpId: "help_id",
	readId: "read_id",
	shelfId: "shelfId",
	shelfNo: "shelfNo", //设备号
	userId: "user_id",
	geziNumber:"geziNumber",
	ShopUserID: "loc_ShopUserID",
	json: {
		/*
		 * bookName 	string 					书名
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