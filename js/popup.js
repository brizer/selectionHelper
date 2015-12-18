
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
 * @description 将选中的搜索引擎传递到background中
 * @author 刘放 brizer1992@outlook.com 
 * @date 2015/12/17
 */
function sendMessage(){
	chrome.extension.sendMessage({resource:"popup",selected:selected},function(response){});
}