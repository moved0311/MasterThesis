chrome.runtime.sendMessage(scanPage());
function scanPage() {

	return scanElement(document.documentElement);

	function scanElement(domElement) {
		var id = domElement.id;
		var classes = domElement.classList;
		var tagName = domElement.tagName;
		var children = domElement.children;
		var scannedChildren = [];
		for (var i = 0; i < children.length; i++) {
			scannedChildren.push(scanElement(children[i]));
		}
		return {
			tag: tagName,
			id: id,
			classes: classes,
			children: scannedChildren
		}
	}
}
