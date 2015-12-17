
var selection = document.getElementById("search_name");
var selected = 0;
/**
 * @description 通过localStorage将用户选择的搜索引擎记录选中
 * @author 刘放 brizer1992@outlook.com 
 * @date 2015/12/17 10:56
 */
if(localStorage.getItem("index")){
	selected = localStorage.getItem("index");
}else {
	localStorage.setItem("index","0");
}
selection.value = selected;
selection.addEventListener("change",function(){
    selected = selection.options[selection.selectedIndex].value;
    localStorage.setItem("index",selected);
	sendMessage(selected);
},false);

/**
 * @description 将值传递到background中
 * @params 
 * @return 
 * @author 刘放 brizer1992@outlook.com 
 * @date 
 */
function sendMessage(){
	chrome.extension.sendMessage({resource:"popup",selected:selected},function(response){
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
			search_engineer = 'google';	
	}
	console.log(search_engineer);
	});
}