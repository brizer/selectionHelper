//选中的搜索引擎
var whichoneSearch = '0';
/**
 * @description 监听来自content.js的消息
 */
chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
	if(request.engineer == "hello"){
		whichoneSearch = localStorage.getItem("index");
		sendResponse({whichone:whichoneSearch});
	}else if(request.engineer == "no"){
		sendResponse({whichone:request.selected});
		localStorage.setItem("index",request.selected);
	}
});

function test(){
	
	chrome.tabs.query({active:true,currentWindow:true},function(tabs){
		var tab = tabs[0];
		var url = tab.url;
		// alert(url);
	});
	localStorage.setItem("userSelection","123");
	
}

