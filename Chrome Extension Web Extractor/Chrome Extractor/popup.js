window.onload = onWindowLoad;

chrome.runtime.onMessage.addListener(function(request, sender) {
	//build DOM tree
	document.getElementById('tree').innerHTML = buildTree(request);

	//source SO: https://stackoverflow.com/questions/11167628/trees-in-twitter-bootstrap
	// show DOM tree and open first three layer.
	$('.tree li').hide();
    $('.tree li:first').show();
    $('.tree li:first > ul').children().show();
    $('.tree li:first > ul > li > ul').children().show();
    $('.tree li').on('click', function (e) {
        var children = $(this).find('> ul > li');
        if (children.is(":visible")) children.hide('fast');
        else children.show('fast');
        e.stopPropagation();
    });

	// when mouse over treeNode send message to content (message action).
    $('.tree').mouseover(function(e){
    	let el = $(e.target);
		let querynode = el.attr('nodeQuery');
		console.log('querynode',querynode);
    	if(querynode){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		        chrome.tabs.sendMessage(tabs[0].id, {action: querynode}, function(response) {});
			});
    	}
    })
	// click icon and open another window to show selected node (message source).
    $('.preivewIcon').click(function(e){
    	let parent = $(this).parent();
    	el_download = this.parentElement.parentElement.getAttribute("nodeQuery");
    	if(el_download){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				console.log('popjs : sendMessage html source code');
				console.log(el_download);
		        chrome.tabs.sendMessage(tabs[0].id, {source: el_download}, function(response) {
					popitup('./showCode.html');
					localStorage.setItem('source',response);
				});
			});
		}
    	e.stopPropagation();
    })
});


function onWindowLoad(){
  chrome.tabs.executeScript(null, {file: "getDOMtree.js"});
  chrome.tabs.executeScript(null, {file: "lib/jquery-3.3.1.min.js"}, function(){
	chrome.tabs.executeScript(null, {file: "contentScript.js"});
  });
}

var elementdict = {};  // count .className
function buildDict(node){
	if(node.id || node.tag || node.classes[0]){
		if(!(node.tag in elementdict)){
			elementdict[node.tag] = 0;
		}else{
			elementdict[node.tag] += 1;
		}
		for(let key in node.classes){
			if(!(node.classes[key] in elementdict)){
				elementdict[node.classes[key]] = 0;
			}else{
				elementdict[node.classes[key]] += 1;
			}
		}
	}
	if (node.children.length > 0) {
		for (var i = 0; i < node.children.length; i++) {
			buildDict(node.children[i]);
		}
	}
}
function buildTree(root) {
	return '<div class="tree"><ul>' + buildNode(root) + '</ul></div>';
	
	function buildNode(node) {
		
		// add property node Query.
		var nodeString = "<li nodeQuery = '";
		// bulid tag/class name dict
		if(node.id || node.tag || node.classes[0]){
			if(!(node.tag in elementdict)){
				elementdict[node.tag] = 0;
			}else{
				elementdict[node.tag] += 1;
			}
			for(let key in node.classes){
				if(!(node.classes[key] in elementdict)){
					elementdict[node.classes[key]] = 0;
				}else{
					elementdict[node.classes[key]] += 1;
				}
			}
		}

		if(node.id){
			nodeString += "#" + node.id;
		}else if(node.classes[0]){

			nodeString += "." + node.classes[0];
			if((elementdict[node.classes[0]])) 
				nodeString += ':' + elementdict[node.classes[0]]; 
		}else{
			nodeString += node.tag;
			if(elementdict[node.tag]){
				nodeString += ':' + elementdict[node.tag];
			}
		}
		//node query end.						 
		nodeString += "'><a><span class='ntag'>" + node.tag + '</span>'; 
		//download icon
		nodeString += "<img class='preivewIcon' style='margin-left:5px;' src='./preview.png'>"
		// show id and class
		if(node.id){
			nodeString += '<span class="badge">#' + node.id + '</span>'; 
		}
		for (var key in node.classes) {
			nodeString += '<span class="badge">.' + node.classes[key] + '</span>';
		}
		nodeString += "</span></a>";
		// Add the children as a sublist if any and filter tag what we focus.
		if (node.children.length > 0) {
			nodeString += '<ul>';
			for (var i = 0; i < node.children.length; i++) {
				let tag = node.children[i].tag;
				if(tag == 'HTML' || tag == 'BODY' || tag == 'UL' || tag == 'DIV' || tag == 'FOOTER' ||
			       tag == 'HEAD' || tag == 'HEADER' || tag == 'SECTION' || tag == 'NAV' || 
			       tag == 'ARTICLE' || tag == 'MAIN' || tag == 'APP-ROOT' || tag == 'TABLE'){
					nodeString += buildNode(node.children[i]);
				}else{
					buildTree(node.children[i]);
				}
			}
			nodeString += '</ul>';
		}
		nodeString += '</li>'
		return nodeString;
	}
}

//open new window e.g. popitup('./showCode.html');
function popitup(url) {
	newwindow=window.open(url,'name','height=1000,width=1000');
	if (window.focus) {newwindow.focus()}
	return false;
}

