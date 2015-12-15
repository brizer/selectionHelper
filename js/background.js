// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
	window.open("http://www.baidu.com/baidu?word="+"helloworld","_blank");
});

function test(){
	
	chrome.tabs.query({active:true,currentWindow:true},function(tabs){
		var tab = tabs[0];
		var url = tab.url;
		alert(url);
	});
	
}
