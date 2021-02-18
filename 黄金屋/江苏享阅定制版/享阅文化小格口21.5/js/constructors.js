/*
 * 上传图片控制器constructor
 * storageArray: 存放base64（string）
 * storageArrayMaxLength:storageArray允许的最大长度
 * storageArrayMinLength:storageArray允许的最小长度
 * diaplayTag：用于图片展示的元素的id
 * diaplayName: 图片名称
 */
function ImageUploadController(storageArray, storageArrayMaxLength, storageArrayMinLength, diaplayTag, diaplayName){
	this.storageArray = storageArray;
	this.storageArrayMaxLength = storageArrayMaxLength;
	this.storageArrayMinLength = storageArrayMinLength;
	this.diaplayTag = diaplayTag; 
	this.diaplayName = diaplayName; 
}
/*
 * 上划加载更多页面控制器constructor
 * countPerPage:每页的条数
 * currentPage: 当前页
 * totalPage: 总页数
 */
function PageController(countPerPage){
    this.countPerPage = countPerPage;
	this.currentPage = 1;
	this.totalPage = 1;	
}
PageController.prototype.firstPage = function(){
	this.currentPage = 1;
};
PageController.prototype.previousPage = function(){
	if(this.currentPage > 1){
		this.currentPage--;	
	}else{
		this.currentPage = 1;	
	}
};
PageController.prototype.nextPage = function(){
	if(this.currentPage < this.totalPage){		
		this.currentPage++;	
		var currentPage = this.currentPage;
//		console.log("in: " + currentPage);
	}else{		
		this.currentPage = this.totalPage;	
	}
};
/*
 * 标签控制器constructor
 * (array)subpages: 子页面
 * (string)top: 子页面距顶部的距离，建议值45px
 * (string)bottom: 子页面距底部的距离，建议值51px
 */
function TabController(subpages, top, bottom){
	this.subpages = subpages;	
	this.activeTab = subpages[0];
	this.subpage_style = {
		top: top,
		bottom: bottom,
		bounce: 'none'
	};
	this.aniShow = {};
}
/*
 * 时间控制器constructor
 * intervalId: 定时器id
 * max: 最大时间
 * min: 最小时间
 */
function TimeController(intervalId, max, min){
	this.intervalId = intervalId;
	this.max = max;
	this.min = min;
}

