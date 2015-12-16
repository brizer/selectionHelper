
chrome.browserAction.onClicked.addListener(function(tab) {
	window.open("http://www.baidu.com/baidu?word="+"helloworld","_blank");
});

function test(){
	
	chrome.tabs.query({active:true,currentWindow:true},function(tabs){
		var tab = tabs[0];
		var url = tab.url;
		// alert(url);
	});
	localStorage.setItem("userSelection","123");
	
}
