var timer,LENG=10,index=6;

var chart_orgUserNum,op_orgUserNum, data_orgUserNum;
var chart_bookTypenum,op_bookTypenum, data_bookTypenum;
var chart_orgBorrowNum,op_orgBorrowNum, data_orgBorrowNum;
var chart_readlog7Day,op_readlog7Day, data_readlog7Day;
var chart_readerInOutNum,op_readerInOutNum, data_readerInOutNum;

function loadInterval(){
	clearInterval(timer);
	timer = setInterval(function(){
		 index ++;
		 if(index>LENG-1) index =0;
		 loadChart(chart_bookTypenum,op_bookTypenum,data_bookTypenum);
		 loadChart(chart_orgBorrowNum,op_orgBorrowNum,data_orgBorrowNum);
		 loadChart(chart_orgUserNum,op_orgUserNum, data_orgUserNum);
	},4000);
}
function loadChart(_myChart,_option,_datas,flag){
	if(_myChart == null || _option == null || _datas == null) {
	    return;
	}
	if(index<_datas.length){
	    _option.series[0].data.shift();
	    _option.series[0].data.push(_datas[index].num);
	    
	    if(flag=='yAxis'){
		    _option.yAxis[0].data.shift();
		    _option.yAxis[0].data.push(_datas[index].xName);
	    }else{
		    _option.xAxis[0].data.shift();
		    _option.xAxis[0].data.push(_datas[index].xName);
	    }	
	    
	    _myChart.setOption(_option);
	}
}
function f_loadData(_myChart,_option,_datas,flag){
	if(_myChart == null || _option == null || _datas == null) {
	    return;
	}
	var len= _datas.length<7?_datas.length:7;
	var datas_num =[],datas_name =[];
	for(var i=0;i<len;i++){
		datas_num.push(_datas[i].num);
		datas_name.push(_datas[i].xName);
	}
	_option.series[0].data=datas_num;

    if(flag=='yAxis'){
    	_option.yAxis[0].data=datas_name;
    }else{
    	_option.xAxis[0].data=datas_name;
    }	
	_myChart.setOption(_option);
}
//前四类别占比
function classreadlog(classreadlog){
	var rank =document.getElementById('rank_scale');
	var rank_scale =echarts.init(rank);

	if(classreadlog==null) return;
	option =null;
	option = {
	    title: {
	        text: '前四类别占比',
	        left: 'center',
	        top:20,
	        textStyle:{
	        	fontSize:24,
	        	color:"#FFF"
	        }
	        
	    },
	    color:['#038afb','#91f4c2','#d76000','#c8d000'],
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        bottom: 10,
	        data: (function(){
	        	var datas =[];
	        	for(var i=0;i<4;i++){
	        		var item = classreadlog[i].typeName.slice(0,4);
	        		datas.push[item];	
	        	}
//	        	console.log(datas)
	        })(),
	        textStyle:{
	        	color:'#FFF'
	        }
	    },
	    overAnimation:false,
	    series : [
	        {
	            type: 'pie',
	            radius : '100%',
	            center: ['50%', '50%'],
	            selectedMode: 'single',
	            data:(function(){
	            	var datas =[];
	            	for(var i= 0;i<4;i++){
	            		var obj ={};
	            		obj.value = classreadlog[i].num;
	            		obj.name = classreadlog[i].typeName.slice(0,4);
//	            		console.log(obj)
	            		datas.push(obj)
	            	}
	            	return datas
	            })()
	            ,
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            },
	            lavel:{
	                show:true,
	                position:'inside',
	               formatter: '{b}:{d}',
	            },
	            labelLine:{
	                show:false
	            },
	            itemStyle:{
	                normal:{
	                    label:{
	                        show : true,
					    	position : 'inner',
					    	formatter: "{d}%)",
	                    }
	                }
	            }
	        }
	    ]
};

	rank_scale.setOption(option,true);
}
//机构借阅占比
function orgBorrow_scale(orgBorrowNum){
		var myChart;
		if(myChart != null && myChart != "" && myChart != undefined) {
		    myChart.dispose();
		}
		var borrow =document.getElementById('borrow_scale');
		 myChart =echarts.init(borrow); 
		if(orgBorrowNum==null) return;
		option = {
		    title: {
		        text: '机构借阅占比',
		        left: 'center',
		        top:20,
		        textStyle:{
		        	fontSize:24,
		        	color:"#FFF"
		        }
		    },
		    color:['#038afb','#91f4c2','#d76000','#c8d000'],
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        bottom: 10,
		        data: (function(){
		        	var datas =[];
		      
		        	for(var i=0;i<4;i++){
		        		var item =orgBorrowNum[i].xName;
		        		datas.push[item];
		        		
		        	}
//		        	console.log(datas)
		        })(),
		        textStyle:{
		        	color:'#FFF'
		        }
		    },
		    overAnimation:false,
		    series : [
		        {
		            type: 'pie',
		            radius : '100%',
		            center: ['50%', '50%'],
		            selectedMode: 'single',
		            data:(function(){
		            	var datas =[];
		            	for(var i= 0;i<4;i++){
		            		var obj ={};
		            		obj.value =orgBorrowNum[i].num;
		            		obj.name =orgBorrowNum[i].xName;
		            		datas.push(obj)
		            	}
		            	return datas
		            })(),
		          
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            },
		            
		            lavel:{
		                show:true,
		                position:'inside',
		               formatter: '{b}:{d}',
		            },
		            labelLine:{
		                show:false
		            },
		            itemStyle:{
		                normal:{
		                    label:{
		                        show : true,
						    	position : 'inner',
						    	formatter: "{d}%)",
		                    }
		                }
		            }
		        }
		    ]
	};
		 myChart.setOption(option,true);
}
function cityReadNum(cityReadNum){
	var myChart;
	if(myChart != null && myChart != "" && myChart != undefined) {
	    myChart.dispose();
	}
	var areas =document.getElementById('area_scale');
	 myChart =echarts.init(areas);
	if(cityReadNum==null) return;
	option = {
	    title: {
	        text: '区域借阅量占比',
	        left: 'center',
	        top:20,
	        textStyle:{
	        	fontSize:24,
	        	color:"#FFF"
	        }
	    },
	    color:['#038afb','#91f4c2','#d76000','#c8d000'],
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        bottom: 10,
	        data: (function(){
	        	var datas =[];
//	        	console.log(cityReadNum)
	        	for(var i=0;i<4;i++){
	        		var item =cityReadNum[i].xName;
	        		datas.push[item];     
	        	}	
	        	
	        })(),
	        textStyle:{
	        	color:'#FFF'
	        }
	    },
	    overAnimation:false,
	    series : [
	        {
	            type: 'pie',
	            radius : '100%',
	            center: ['50%', '50%'],
	            selectedMode: 'single',
	            data:(function(){
	            	var datas =[];
	            	for(var i= 0;i<4;i++){
	            		var obj ={};
	            		obj.value = cityReadNum[i].num;
	            		obj.name =	cityReadNum[i].xName;
	            		datas.push(obj)
	            	}
	            	return datas
	            })()
	            ,
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            },
	            lavel:{
	                show:true,
	                position:'inside',
	               formatter: '{b}:{d}',
	            },
	            labelLine:{
	                show:false
	            },
	            itemStyle:{
	                normal:{
	                    label:{
	                        show : true,
					    	position : 'inner',
					    	formatter: "{d}%)",
	                    }
	                }
	            }
	        }
	    ]
};



	if(option &&typeof option ==="object"){
					 myChart.setOption(option,true);
				}
}
//机构借阅量
function f_init_orgBorrowNum(){
	if(chart_orgBorrowNum != null && chart_orgBorrowNum != "" && chart_orgBorrowNum != undefined) {
	    chart_orgBorrowNum.dispose();
	}
	var person =document.getElementById('count_type');
	chart_orgBorrowNum =echarts.init(person);

	op_orgBorrowNum = {
		title:{
			text:'机构借阅量',
			textStyle:{
				color:"#FFF",
			},
			top:10
		},
		legend:{
			type:'plain',
			top:10,
			textStyle:{
				color:""
			},
			left:150
		},
	    color: ['#3398DB'],
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data :null,
	            axisTick: {
	            	show:true,
	                alignWithLabel: true
	            },
	            axisLine:{
	            	lineStyle:{
	            		color:["#FFF"]
	            	}
	            },
	            
	       
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	           	axisLabel:{
	           		textStyle:{
	           			color:'#FFF'
	           		}
	           	},
			    axisLine:{
			    	show:false,
	            },
	         	
	        }
	    ],
	    series : [
	        {
	            name:'直接访问',
	            type:'bar',
	            barWidth: '30%',
	            data:null,
	            label:{
		           	show:true,
		           	position:'top',
		           	textStyle:{
		           		color:"#FFF"
		           	}
	           }
	        }
	    ]
	};

	chart_orgBorrowNum.setOption(op_orgBorrowNum,true);
		
}
//机构用户数统计
function f_init_orgUserNum(){
	var doubles =document.getElementById('count_double');
	chart_orgUserNum =echarts.init(doubles);

	op_orgUserNum = {
		title:{
			text:'机构用户数统计',
			textStyle:{
				color:"#FFF",
			},
			top:10
		},
		legend:{
			show:true,
			type:'plain',
			top:10,
			textStyle:{
				color:""
			},
			left:150
		},
	    color: ['#b127ec'],
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data :null,
	            axisTick: {
	                alignWithLabel: true
	            },
	            axisLine:{
	            	lineStyle:{
	            		color:"#FFF"
	            	}
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	           	axisLabel:{
	           		textStyle:{
	           			color:'#FFF'
	           		}
	           	},
	           	axisLine:{
			    	show:false,
	            },
	        }
	    ],
	    series : [
	        {
	        	name:'机构用户统计',
	            type:'bar',
	            barWidth: '30%',
	            data:null,
	             label:{
		           	show:true,
		           	position:'top',
		           	textStyle:{
		           		color:"#FFF"
		           	}
	           }
	        }
	    ]
	};

	chart_orgUserNum.setOption(op_orgUserNum,true);
}

//藏书量分类统计
function f_init_bookType(){
	if(chart_bookTypenum != null && chart_bookTypenum != "" && chart_bookTypenum != undefined) {
	    chart_bookTypenum.dispose();
	}
	var types =document.getElementById('classbook');
	chart_bookTypenum =echarts.init(types);
	op_bookTypenum = {
		title:{
			text:'藏书量分类统计',
			textStyle:{
				color:"#FFF",
			},
			top:25,
			left:30,
		},
		legend:{
			type:'plain',
			top:25,
			textStyle:{
				color:""
			},
		},
		grid:{
			bottom:50,
			show:true
		},
		
	    color: ['#c8d000'],
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	
	    xAxis : [
	        {
	            type : 'category',
	            data :null,
	            axisTick: {
	                alignWithLabel: true
	            },
	            axisLine:{
	            	lineStyle:{
	            		color:"#FFF"
	            	}
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	           	axisLabel:{
	           		textStyle:{
	           			color:'#FFF'
	           		}
	           	},
	           	axisLine:{
			    	show:false,
	            },
	        }
	    ],
	    series : [
	        {
	            name:'直接访问',
	            type:'bar',
	            barWidth: '30%',
	            data:null,
	             label:{
		           	show:true,
		           	position:'top',
	           	textStyle:{
	           		color:"#FFF"
	           	}
	           }
	        }
	    ]
	};

	chart_bookTypenum.setOption(op_bookTypenum,true);
}

//地图
function provinceMap(provinceMap){
	var dom =document.getElementById('map');
	var mychart4=echarts.init(dom);

	if(provinceMap==null) return;
	var app ={};
	option =null;
	var option={
		title:{//标题
			textStyle:{
				color:'#ccc',
				fontSize:24,
			},
			subtextStyle:{
				color:'red',
				fontSize:30,
			},
			x:'center',
			itemGap:30,//间隔
		},
		legend:{//图例组件
			show:false,
			data:['area']
		},
		color:["#964ad8"],
		series:[{
			name:"area",
			type:'map',
			mapType:'china',
			 itemStyle: {
	            normal: {
	                 areaColor:'rgb(5,79,143)',
	            },
	            emphasis: {
	                areaColor: '#2a333d'
	            }
	        },
	      
	       data:(function(){
	       		var datas = [];
	       		var redMap ={name:"南海诸岛",value:0,	itemStyle:{normal:{opacity:0,label:{show:false}}}};
				datas.push(redMap);
	       		for(var i=0;i<provinceMap.length;i++){
	       			var obj={};
	       			var lab ={};
	       			obj.name =provinceMap[i].shorts;
	       			obj.value =Math.round(Math.random()*1000);
	       			lab.show =true;
	       			lab.formatter =provinceMap[i].shorts;
	       			lab.color='#ffffff';
	       			obj.label =lab;
	       			datas.push(obj);
	       			
	       		}
	       		return datas
	       })(),
		}],
		geo: {
	        map: 'china',
	        label: {
	            emphasis: {
	                show:true
	            },
	        },
	        itemStyle: {
	            normal: {
	                 areaColor:'rgb(5,79,143)',
	            },
	            emphasis: {
	                areaColor: '#2a333d'
	            }
	        },
	        roam:false,
	        aspectScale:0.9,
	    },
		
	}
	if(option &&typeof option ==="object"){
		 mychart4.setOption(option,true);
	}
}
//近一周阅读
function f_init_readlog7Day(){
	
	var readlog7 = document.getElementById('readlog7Day');
	chart_readlog7Day = echarts.init(readlog7);
	op_readlog7Day = {
		title:{
				text:'近一周借出、归还统计',
				top:25,
				left:30,
				textStyle:{
					color:'#FFF'
				}
			},
		color:['red','yellow'],
	    legend: {
	        data:['借出数量', '归还数量'],
	        textStyle:{
	        	color:'white'
	        },
	        top:30,
			left:370
		  },
	    xAxis: {
	        type: 'category',
			data:null,
	        axisTick: {
                alignWithLabel: true
            },
            axisLine: {
				lineStyle: {
					color: '#fff'
				}
			},
	    },
	    yAxis: {
	        type: 'value',
	        axisLine: {
				lineStyle: {
					color: '#fff'
				}
			},
	    },
	    series: [
		    {
	            name:'借出数量',
		        data:null,
		        type: 'line',				        
		    },
		    {
	            name:'归还数量',
		        data:null,
		        type: 'line',				        
		    }
	    ]
	};

	chart_readlog7Day.setOption(op_readlog7Day, true);
}
//进出馆人流量
function f_init_readerInOutNum(){
	var readerInOutNum =document.getElementById('count_person');
	chart_readerInOutNum = echarts.init(readerInOutNum);

	op_readerInOutNum = {
	    title: {
	        text: '进出馆人流量',
	        //subtext: '纯属虚构',
			textStyle:{
				color:"#FFF",
			},
			top:10,
			left:30
	    },
	    legend: {
	        data:['入馆人数', '出馆人数'],
	        textStyle:{
	        	color:'white'
	        },
	        top:10,
			left:250
	    },
	    height:160,
	    xAxis: [
	        {
	            type: 'category',
	            boundaryGap: true,
	            data:null,
	            axisLine:{
				    	lineStyle:{
				    		color:'#fff'
				    	}
				    }
	        },		        
	    ],
	    yAxis: [
	        {
		        type: 'value',
		        axisLine: {
					lineStyle: {
						color: '#fff'
					}
				},
	            min: 0,
	            minInterval :1
	        }
	    ],
	    color:['red','yellow'],
	    series: [
	        {
	            name:'入馆人数',
	            type:'line',
	            data:(function (){
	                var res = [];
	                for(var i=0;i<10;i++){
	                	 res.push(0);
	                }
	                return res;
	            })()
	        },
	        {
	            name:'出馆人数',
	            type:'line',
	            data:(function (){
	                var res = [];
	                for(var i=0;i<10;i++){
	                	res.push(0);
	                }
	                return res;
	            })()
	        }
	    ],
	    
	};
	
	chart_readerInOutNum.setOption(op_readerInOutNum, true);
}
function initChart(){
	f_init_bookType();
	f_init_readlog7Day();
	f_init_readerInOutNum();
	f_init_orgBorrowNum();
	f_init_orgUserNum();
//	borrow_total();
//	borrow_today();
//	return_today()
}
function showTheHours(theHour) {
	var type = true;//24小时制，false为12小时制
	if (type || (theHour > 0 && theHour < 13)) {
		//如果时间在12小时内
		return (theHour);
	}
	if (theHour == 0) {
		//如果时间等于0
		return (12);
	}
	return (theHour - 12);
	//如果时间大于12，需要减去12-针对12小时制
}
//分
function showZeroFilled(inValue) {
	if (inValue > 9) {
		//设置分钟数的两位数显示，不足两位补0
		return "" + inValue;
	}
	return "0" + inValue;
}
//秒
function showTheTime(now) {
	//获取当前时间
	var nowtime = showTheHours(now.getHours()) + ":"
			+ showZeroFilled(now.getMinutes());
	//+ ":"	+ showZeroFilled(now.getSeconds());
	return nowtime;//结果
}
var chart_borrowTotal,op_borrowTotal
function borrow_total(msgData){
		var borrow_total =document.getElementById('borrow_total');
		 chart_borrowTotal =echarts.init(borrow_total); 
//		if(orgBorrowNum==null) return;
	op_borrowTotal = {
	     title: {
		        text: '进出总数',
		        left: 'center',
		      	top:80,
		        textStyle:{
		        	fontSize:16,
		        	color:"white"
		        }
		    },
		    color:'#2762ff',
	    series: [
	        {
	            name:'进出总数',
	            type:'pie',
	            radius: ['80%', '90%'],
	            label: {
	                normal: {
	                    show: false,
	                    position: 'center'
	                }
	            },
	            data:[ 
	                {value:msgData, name:'借阅总数',label:{show:true,formatter:"{c}",fontSize:24,padding:[0,0,20,0],color:'#fff'}},	               	     
	            ]
	        }
	    ]
};
	
			 chart_borrowTotal.setOption(op_borrowTotal,true);	
}
var chart_borrowToday,op_borrowToday
function inNum_today(msgData){
		var myChart;
		if(myChart != null && myChart != "" && myChart != undefined) {
		    myChart.dispose();
		}
		var borrow =document.getElementById('borrow_today');
		 myChart =echarts.init(borrow); 
		 option =null;
	option = {
	     title: {
		        text: '今日进馆人数',
		        left: 'center',
		      	top:80,
		        textStyle:{
		        	fontSize:16,
		        	color:"white"
		        }
		    },
		    color:'#d568ff',
	    series: [
	        {
	            name:'今日进馆人数',
	            type:'pie',
	            radius: ['80%', '90%'],
	            label: {
	                normal: {
	                    show: false,
	                    position: 'center'
	                }
	            },
	            data:[ 
	                {value:msgData, name:'今日进馆人数',label:{show:true,formatter:"{c}",fontSize:24,padding:[0,0,20,0],color:'#fff'}},	               	     
	            ]
	        }
	    ]
};
			 myChart.setOption(option,true);
}

function outNum_today(msgData){
		var myChart;
		if(myChart != null && myChart != "" && myChart != undefined) {
		    myChart.dispose();
		}
		var borrow =document.getElementById('return_today');
		 myChart =echarts.init(borrow); 
		 option =null;
	option = {
	     title: {
		        text: '今日出馆人数',
		        left: 'center',
		      	top:80,
		        textStyle:{
		        	fontSize:16,
		        	color:"white"
		        }
		    },
		    color:'#27ed97',
	    series: [
	        {
	            name:'今日出馆人数',
	            type:'pie',
	            radius: ['80%', '90%'],
	            label: {
	                normal: {
	                    show: false,
	                    position: 'center'
	                }
	            },
	            data:[ 
	                {value:msgData, name:'今日出馆人数',label:{show:true,formatter:"{c}",fontSize:24,padding:[0,0,20,0],color:'#fff'}},	               	     
	            ]
	        }
	    ]
};
			 myChart.setOption(option,true);
}
