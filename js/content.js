console.log("刘放的插件在运转！");
body =document.body;
state = 0;
x = 0;
y = 0;
body.addEventListener("mouseup",function(e){
	var selected = window.getSelection();
	var selected_value = selected.toString();
	console.log(selected_value);
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
 */
function createDiv(text,left,top){
	var old = document.getElementById("selectionHelper");
	if(old){
		old.style.left = left+"px";
		old.style.top = top+"px";
		old.style.display = "block";
		var a_search = document.getElementById("a_search");
		a_search.onclick=function(){
			window.open("http://www.baidu.com/baidu?word="+text,"_blank");	
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
		div.appendChild(span_copy);
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
		a_search.onclick=function(){
			window.open("http://www.baidu.com/baidu?word="+text,"_blank");		
		};
	}
}

