//选中的搜索引擎
var whichoneSearch = '0';
/**
 * @description 监听来自content.js的消息
 */
chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
	if(request.resource == "content"){
		whichoneSearch = getItem();
		sendResponse({whichone:whichoneSearch});
	}else if(request.resource == "popup"){
		sendResponse({whichone:request.selected});
		localStorage.setItem("index",request.selected);
	}
});

function getItem(){
	var item;
	if(!window.localStorage){
		return "该浏览器版本太低，请更新!";
	}
	item = localStorage.getItem("index");
	if(!item){
		localStorage.setItem("index","0");
		item = "0";
	}
	return item;
}

