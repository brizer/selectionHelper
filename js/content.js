console.log("刘放的插件在运转！");

body =document.body;
state = 0;
x = 0;
y = 0;
//默认搜索引擎为百度
var search_engineer = 'baidu';

/**
 * @description 与background进行通讯兵监听返回结果,结果为popup中选中的搜索引擎索引
 * @author 刘放 brizer1992@outlook.com 
 * @date 2015/12/17 11:16
 */
function chooseEngineer(){
	chrome.extension.sendMessage({engineer:"hello"},function(response){
		switch (response.whichone){
			case '0': 
				search_engineer = 'baidu';
				break;
			case '1':
				search_engineer = 'bing';
				break;
			case '2':
				search_engineer = 'google';
				break;
			default:
				search_engineer = 'baidu';	
		}
		//console.log(search_engineer);
	});
	return search_engineer;
}
/**
 * @description 鼠标抬起事件监听
 * 1. 获取选中的文本字符串
 * 2. 判断文本字符串长度和内容
 * 3. 获取鼠标抬起位置，创建div
 * 4. 将状态位state置为1，说明div已经出现
 * @author 刘放 brizer1992@outlook.com
 * @date 2015/12/15 
 */
body.addEventListener("mouseup",function(e){
	var selected = window.getSelection();
	var selected_value = selected.toString();
	if(selected_value!=='' && selected_value.length<=30){
		var eve = e || window.event;
		x = eve.clientX;
		y = eve.clientY;
		x += document.body.scrollLeft;
		y += document.body.scrollTop;
		createDiv(selected_value,x,y);
		state = 1;
	}else{
		//
	}
},false);
/**
 * @description 鼠标点击事件监听
 * 1. 鼠标点击后首先判断状态位，如果未出现则无反应
 * 2. 如果div出现，则通过鼠标位置和div宽高决定div点击区域
 * 3. 如果在点击区域内，则无反应，正常执行
 * 4. 如果在区域外，则将div隐藏，状态位state置为0
 * @author 刘放 brizer1992@outlook.com
 * @date 2015/12/15
 */
body.addEventListener("mousedown",function(e){
	if(state == 1){
		var xx = e.clientX;
		var yy = e.clientY;
		xx += document.body.scrollLeft;
		yy += document.body.scrollTop;
		if(xx<=x+75&&yy<=y+26){

		}else{
			var div = document.getElementById("selectionHelper");
			div.style.display = "none";
			state = 0;
		}
	}
},false);
/**
 * @description 创建div，提供复制和搜索按钮
 * @remark 暂时暂停复制功能的开发，由于必须要使用到flash
 * @param text 选中的文本内容
 * @param left 鼠标点击坐标
 * @param toop 鼠标点击坐标
 * @author 刘放 brizer1992@outlook.com
 * @date 2015/12/16 
 */
function createDiv(text,left,top){
	var old = document.getElementById("selectionHelper");
	if(old){
		old.style.left = left+"px";
		old.style.top = top+"px";
		old.style.display = "block";
		var a_search = document.getElementById("a_search");
		a_search.onclick=function(){
			searchClick(text);	
		};
	}else{
		var div = document.createElement("div");
		div.id = "selectionHelper";
		var span_copy = document.createElement("span");
		var span_search = document.createElement("span");
		var a_copy = document.createElement("a");
		var a_search = document.createElement("a");
		a_copy.innerHTML = "复制 |";
		a_search.innerHTML = "搜索";
		a_search.id = "a_search";
		type = "baidu";
		span_copy.appendChild(a_copy);
		span_search.appendChild(a_search);
		span_copy.style.margin = "3px";
		span_search.style.margin = "3px";
		//div.appendChild(span_copy);
		div.appendChild(span_search);
		div.style.left = left+"px";
		div.style.top = top+"px";
		div.style.position="absolute";
		div.style.fontSize = "10px";
		div.style.lineHeight = "1.5";
		div.style.padding = "3px";
		div.style.backgroundColor="#fff";
		div.style.border="1px solid #999";
		div.style.cursor="pointer";
		body.appendChild(div);
		a_search.onclick = function(){
			searchClick(text);		
		};
		a_copy.onclick = function(e) {
	        copyToBorad(text);
		};
	}
}
/**
 * @description event.clipBoardData只有火狐和ie支持，而document.exeCommand("Copy")谷歌从2010年开始就不再支持。剩下的就
 * 只能用Flash来模拟实现。考虑到Flash的使用率越来越低，所以复制功能暂时暂停。
 */
function copyToBorad(text){
	//window.prompt("请点击ctrl+C来复制", text);
}
/**
 * @description 根据不同的搜索引擎选项，采用不同的搜索引擎。
 */
function searchClick(text){
	var engineer = chooseEngineer();
	switch (engineer){
		case 'baidu':
			window.open("http://www.baidu.com/baidu?word="+text,"_blank");	
			break;
		case 'bing':
			window.open("http://cn.bing.com/search?q="+text,"_blank");
			break;
		case 'google':
			break;
	};
	
}
