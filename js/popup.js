var bg = chrome.extension.getBackgroundPage();
bg.test();

var selection = document.getElementById("search_name");
var selected = 0;
selection.addEventListener("change",function(){
	var selected = selection.options[selection.selectedIndex].value;
	console.log(selected);
},false);