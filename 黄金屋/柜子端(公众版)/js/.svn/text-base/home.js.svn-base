//---------轮播图函数-------------
function slideshow() {
  var slideshow=document.getElementById("indexSlider"),
  imgs=slideshow.getElementsByTagName("img"), //得到图片们
  current=0; //current为当前活跃的图片编号

  function slideOff() {
    imgs[current].className=""; //图片淡出
  }
  function slideOn() {
    imgs[current].className="active"; //图片淡入
  }
  function changeSlide() { //切换图片的函数
    slideOff(); //图片淡出
    current++; //自增1
    if(current>=bigImgCount) current=0;
    slideOn(); //图片淡入
//  alert(1);
  } 
  //每2s调用changeSlide函数进行图片轮播
  var slideon=setInterval(changeSlide,15000);  
}

/*
 * 加载轮播睡眠图
 */
function swipeSleepImgs(bigImgsUrls){
  if(bigImgsUrls.length>0){
		indexSlider.innerHTML="";
		bigImgCount=bigImgsUrls.length;			
	for(var i=0;i<bigImgsUrls.length;i++){
		var newEle=doc.createElement("img");
		newEle.src=global_absoluteRoot+bigImgsUrls[i].ImgUrl;
		newEle.className = "bannerimg";
		if(i==0){newEle.className="bannerimg active"};									
			indexSlider.appendChild(newEle);
	}
		slideshow();
	}	
}

//---------轮播图函数-------------
function slideshowAll() {
  var slideshow=document.getElementById("slideshow"),
  imgs=slideshow.getElementsByTagName("img"), //得到图片们
  current=0; //current为当前活跃的图片编号

  function slideOff() {
    imgs[current].className=""; //图片淡出
  }
  function slideOn() {
    imgs[current].className="active"; //图片淡入
  }
  function changeSlide() { //切换图片的函数
    slideOff(); //图片淡出
    current++; //自增1
    if(current>=bigImgCount) current=0;
    slideOn(); //图片淡入
  } 
  //每2s调用changeSlide函数进行图片轮播
  var slideon=setInterval(changeSlide,15000);  
}

/*
 * 加载轮播睡眠图
 */
function swipeSleepImgsAll(bigImgsUrls){
  if(bigImgsUrls.length>0){
		bigList.innerHTML="";
		bigImgCount=bigImgsUrls.length;			
	for(var i=0;i<bigImgsUrls.length;i++){
		var newEle=doc.createElement("img");
		newEle.src=global_absoluteRoot+bigImgsUrls[i].ImgUrl;
		if(i==0){newEle.className="active"};									
			bigList.appendChild(newEle);
	}	
		slideshowAll();
	}	
}