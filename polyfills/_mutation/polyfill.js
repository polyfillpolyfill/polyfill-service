var _mutation;
(function () {

	// it's missing DocumentFragment, Text, Comment.. but they probably don't exist too on ie8-
	var _Node = typeof window.Node === 'function' ? window.Node : window.Element;

	function isDOM(object) {
		// DOM, Level2
		if ("HTMLElement" in window) {
			try {
				return (object && object instanceof _Node);
			} catch (err) {
				// We enter here if the object is not an instanceof _Node, likely object is a string.
			}
		}
		// Older browsers
		return !!(object && typeof object === "object" && object.nodeType === 1 && object.nodeName);
	}

	// http://dom.spec.whatwg.org/#mutation-method-macro
	function mutation(nodes) { // eslint-disable-line no-unused-vars


		if (nodes.length === 1) {
			return isDOM(nodes[0]) ? nodes[0] : document.createTextNode(nodes[0] + '');
		}

		var fragment = document.createDocumentFragment();
		for (var i = 0; i < nodes.length; i++) {
			fragment.appendChild(isDOM(nodes[i]) ? nodes[i] : document.createTextNode(nodes[i] + ''));

		}

		return fragment;
	}

	_mutation = mutation;
}());
