/*
 * 首页轮播图片
 */
function swipeIndexImgs(id,imgurls) {	
	if(imgurls.length!=0){						
		var indexSlider = doc.getElementById(id);
		    indexSlider.innerHTML = "";
		for(var i = 0; i < imgurls.length; i++) {
		var newElement = doc.createElement("div");
		newElement.className = "swiper-slide";
		var childElement = doc.createElement("img");
		childElement.src = global_absoluteRoot + imgurls[i].ImgUrl;
		childElement.style.width = "1080px";
		childElement.style.height = "750px";

		newElement.appendChild(childElement);
		indexSlider.appendChild(newElement)
	}
		
var swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed:1000,
      autoplay: {
        delay: 8000
      },
      effect:"fade"
  });				
	}		
}