// <element>.ancestorQuerySelector
(function (Element) {
	function NodeList() {}

	Element.prototype.ancestorQuerySelectorAll = function (selector) {
		var node = this, newNodeList = new NodeList;
		for (newNodeList.length = 0; node = node.parentElement;) node.matchesSelector(selector) && Array.prototype.push.call(newNodeList, node);

		return hasDefineProperty && Object.defineProperty(newNodeList, "length", {
			configurable: false,
			enumerable: false,
			writable: true
		}), newNodeList;
	}

	Element.prototype.ancestorQuerySelector = function (selector) {
		for (var node = this; node = node.parentElement;) if (node.matchesSelector(selector)) break;

		return node || null;
	}
})(Element);