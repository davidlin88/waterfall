//模拟数据Json
var data = [{
	"src": "./images/img_1.jpg",
	"title": "薄雾浓云愁永昼"
},{
	"src": "./images/img_2.jpg",
	"title": "薄雾浓云愁永昼"
},{
	"src": "./images/img_3.jpg",
	"title": "薄雾浓云愁永昼"
},{
	"src": "./images/img_4.jpg",
	"title": "薄雾浓云愁永昼"
},{
	"src": "./images/img_5.jpg",
	"title": "薄雾浓云愁永昼"
},{
	"src": "./images/img_6.jpg",
	"title": "薄雾浓云愁永昼"
},{
	"src": "./images/img_7.jpg",
	"title": "薄雾浓云愁永昼"
},{
	"src": "./images/img_8.jpg",
	"title": "薄雾浓云愁永昼"
},{
	"src": "./images/img_9.jpg",
	"title": "薄雾浓云愁永昼"
},{
	"src": "./images/img_10.jpg",
	"title": "薄雾浓云愁永昼"
},{
	"src": "./images/img_11.jpg",
	"title": "薄雾浓云愁永昼"
},{
	"src": "./images/img_12.jpg",
	"title": "薄雾浓云愁永昼"
}]

function waterfall(wrap,boxes){
	//获取列数
	var boxWidth = boxes.eq(0).outerWidth(true);
	var windowWidth = $(window).width();
	var colsNumber = Math.floor(windowWidth / boxWidth);

	//设置容器宽度
	wrap.width(boxWidth * colsNumber);

	//定义一个数组存储每一列的高度
	var everyHeight = new Array();
	for (var i = 0; i < boxes.length; i++) {
		if(i<colsNumber){
			everyHeight[i] = boxes.eq(i).outerHeight(true);
		} else{
			var minHeight =Math.min.apply(null,everyHeight);
			var minIndex = getIndex(minHeight,everyHeight);
			setStyle(boxes.eq(i),minHeight,boxes.eq(minIndex).position().left,i);
			everyHeight[minIndex] += boxes.eq(i).outerHeight(true);
		};
		// 给盒子加半透明特效
		boxes.eq(i).hover(function(event){
			$(this).stop().animate({
				'opacity':'0.5'
			},300);
		},function(event){
			$(this).stop().animate({
				'opacity':'1'
			},300);
		}).children('img').click(function(){
			console.log($(this).next()[0]);
			$(this).next()[0].click();
		});

		// // 给图片加单机跳转事件
		// boxes.eq(i).children('img').click(function(){
		// 	console.log($(this).next())
		// 	$(this).next().click();
		// });
	};
}

//获取最小高度的索引
function getIndex(minHeight,everyHeight){
	for(index in everyHeight){
		if (everyHeight[index] == minHeight){
			return index;
		}
	}
}

//追加盒子函数
var appendBox = function(wrap){
	console.log(getCheck(wrap));
	if (getCheck(wrap)) {
		for(i in data){
			var innerString ='<div><img src='+data[i].src+'><a href="#">'+data[i].title+'</a></div>';
			wrap.append(innerString);
		};
	} else return false;
	waterfall(wrap,wrap.children('div'));

}

//设置追加盒子样式
var getStartNumber = 0;
var setStyle = function(box,top,left,index){
	if (index <= getStartNumber) {
		return false;
	};
	box.css({
		'position':'absolute',
		'top':top,
		'left':left,
		'opacity':'0'
	}).stop().animate({
		'opacity':'1'
	},1000)
	
	getStartNumber = index;
}
// 数据请求检验
var getCheck = function(wrap){
	var documentHeight = $(window).height();
	var scrollHeight = $(window).scrollTop();
	var lastBox = wrap.children('div').eq(wrap.children('div').length - 1);
	var lastBoxTop = lastBox.offset().top;
	var lastBoxHeight = lastBox.outerHeight();
	var lastColHeight = lastBoxTop + lastBoxHeight;
	return documentHeight + scrollHeight >= lastColHeight ? true : false;
}

$(function(){
	var wrap = $('#wrap');
	var boxes = $('#wrap').children('div');
	waterfall(wrap,boxes);

	$(this).scroll(function(event){
		appendBox(wrap);
	});
});