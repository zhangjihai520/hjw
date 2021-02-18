//api接口
var ajax_url = 'http://b.huangjw.com/appInterface/'; //正式环境请求地址
var WSURL="118.31.34.120:85"; //websocket地址
var local_url = 'http://127.0.0.1:18001/'; //本地地址
var global_absoluteRoot = 'http://b.huangjw.com';


//var global_official_ajaxURL = "118.31.34.120:85";//公司服务器
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

//接口名
var interface_name = {
	method_book_detail:'book_details', //获取书籍信息
	method_borrow_book_userName: 'borrow_book_by_userName', //输入账号密码借书
	method_book_type_list: "book_type_list", //获取书籍类型列表
	method_book_list: "book_list", //获取书籍列表
	method_get_book_id_by_cell: "get_book_id_by_cell", //根据输入的格口号获取书籍信息
	method_get_book: 'get_book', //取书
	method_return_book: 'return_book', //还书
	method_book_list_search_for_shelf: 'book_list_search_for_shelf', //淘书列表
	
	
	method_cell_list: 'cell_list', //获取上书列表
	method_put_book: 'put_book', //放书接口
	method_remove_book: 'remove_book', //清书接口
	method_clearAllBook: 'clearAllBook', //一键清书
	
	method_change_password: "change_password_tel", //修改密码
	method_notice_list: 'notice_list', //问题列表
	method_report_problem: 'problem_list', //报修问题列表
	method_repair_sumbit: "report_problem", //报修问题提交
	method_report_problem_sys:'report_problem_sys', //自动上传问题
	
	method_shelf_manager_log_in: "shelf_manager_log_in", //管理员登录
	method_set_shelf_id: 'set_shelf_id', //设置设备号
	
	method_open: "open",
	method_reboot: "reboot",
	method_lightOnOff:"lightOnOff",
}

//本地缓存名
var localcacheName = {
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
	method_shelf_QR: 'shelf_QR',
	method_orgQrCodeUrl:'orgQrCodeUrl',
	method_shelf_Name:'shelf_Name',
	method_start_Light:'start_light',
	method_end_Light:'end_light',
	bookItemId: "loc_bookItemId",
	geziNumber: "loc_geziNumber",
	method_manager_user_id:"manager_user_id",
	method_borrow_user_id:"borrow_user_id",
	method_shelfId: "shelfId",
	method_shelfNo: "shelfNo", //设备号
	method_netWorkType:"netWorkType" //网络状态
}

//常量
var now_time,doc=document,bigImgCount=0,countDown,inter,writeInput;
	
var cellListPageController,
    SKIP_TIME=35000,//主页跳转到睡眠轮播图延迟时间
	PageSize = 12,	//图书列表设置显示条目
	glo_countPerPage = 20,			//书格列表设置显示条目
    glo_audioPlayer = null,         //音频
    global_BOOK_CODE_LENGTH=24//录入书本的编码长度
    key_basket=[];//记录上次keyboard按键对象
    version = '1.0.9';


//正则表达式对象
var global_regexp = {
	cellPhone: /^1[3|4|5|7|8]\d{9}$/,
	email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	idCard: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
};

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

//字符串
var global_stringObject = {
	backSpace: "退格",
	project: "微型图书馆",
	protocol: "《微型图书馆条款》",
	serviceDial: "4000671973",
	serviceDisplay: "400-067-1973",
	wangluoyichang: "网络异常"
};