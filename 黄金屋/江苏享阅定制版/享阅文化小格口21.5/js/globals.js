//ajax请求，后端的类/对象
var global_ajaxObjectLL = {
	HelpArticle: "/help",
	IndexScrollImg: "/index",
	IndexLampS: "/platform_info",
	ListMenu: "/book_type_list",
	ListMain: "/book_list",
	TakeSumbit: "/get_book",
	ItemInfo: "/book_details",
	ItemBuy: "/sell_book",
	ItemBuyCallBack: "XXXXX",
	ItemBorrowSta: "/borrow_book_status_official",
	RepairProblem: "/problem_list",
	RepairSumbit: "/report_problem",
	LoginSumbit: "/shelf_manager_log_in",
	SettingAddSubmit: "/set_shelf_id",
	SettingUpdateSubmit: "/set_shelf_no",
	WarehouseList: "/cell_list",
	WarehousePut: "/put_book",
	ListKeyboardGetId: "/get_book_id_by_cell"
};
var global_official_ajaxURL = "b.huangjw.com";
//var global_official_ajaxURL = "118.31.34.120:85";//公司服务器
//var global_official_ajaxURL = "192.168.1.103:8080";
var global_absoluteRoot = 'http://' + global_official_ajaxURL;   
var g_domain=global_absoluteRoot+ "/appInterface";//正式

var global_ajaxURL =g_domain+"/";

var ApiUrl = g_domain;

var  WSURL="118.31.34.120:85";
//var  WSURL="118.31.34.120:8080";
//var  WSURL="192.168.1.103:8080";
var global_boxctrlService = "http://127.0.0.1:18001/";

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
var now_time,doc=document,bigImgCount=0,countDown, isOperate,inter,writeInput;
	doc.getElementById("serId").innerHTML = "版本号：小格口21.5寸屏 1.0.9";		
var bigList=doc.getElementById("slideshow"),
		bookDetailId,
		glo_bookCodeBookDetail,
	    glo_cellNoBookDetail,
	    glo_bookNameBookDetail ,
	    glo_randomCodeBookDetail,
	    glo_randomCodeIntervalBookDetail,
	    glo_pageControllerBookList,	
	    cellListPageController,
	    glo_checkDoorStateIntervalCellList,
	    SKIP_TIME=35000,//主页跳转到睡眠轮播图延迟时间
		glo_countPerPageBookList = 12,	//图书列表设置显示条目
		glo_countPerPage = 20,			//书格列表设置显示条目
	    glo_audioPlayer = null,         //音频
	    global_BOOK_CODE_LENGTH=24//录入书本的编码长度
	    key_basket=[];//记录上次keyboard按键对象
	    version = '1.0.9';
/*
 * 图书裂变，手势翻页变量
 */
 var MOVELEN=200, startX, startY, moveEndX, moveEndY, X, Y;   
/*
* 各个页面定时器的时间设置
*/
var returnBook_countTime=120,inputCode_countDown=60,bookDetail_countTime=120,managerLogin_countTime=120,changePassword_countTime=120,openDoor_countTime=30;
/*
 * 提交参数
 */
var submit_data={
			userName:{
				text:"用户名",
				value:""
			},
			password:{
				text:"密码",
				value:""
			}
	},		
	submit_deviceNum={
			num:{
				text:"设备号",
				value:""
			}
		},
		submit_data_bookDetail={
			userName:{
				text:"用户名",
				value:""
			},
			password:{
				text:"密码",
				value:""
			}
		},
		borrow_return_data={
			borrowBook:{
				type:true,
				text1:"借书成功",
				text2:"借书"				
			},
		    returnBook:{
		    	type:false,
		    	text1:"还书成功",
				text2:"还书"
		    }
		},
		submit_data_changePw={
					userName: {
					value: "",
					text: "用户名"
				},
				password: {
					value: "",
					text: "密码"
				},
				newPassword:{
					value: "",
					text: "新密码"
				},
				confirmPassword:{
					value: "",
					text: "确认密码"
				}
			};
			