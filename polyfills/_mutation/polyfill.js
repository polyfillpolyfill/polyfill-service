// http://dom.spec.whatwg.org/#mutation-method-macro
function _mutation(nodes) { // eslint-disable-line no-unused-vars

	var _Node = typeof window.Node === 'function' ? window.Node : window.Element; // it's missing DocumentFragment, Text, Comment.. but they probably don't exist too on ie8-

	if (nodes.length === 1) {
		return nodes[0] instanceof _Node ? nodes[0] : document.createTextNode(nodes[0]+'');
	}

	var fragment = document.createDocumentFragment();

	for (var i=0; i<nodes.length; i++) {
		fragment.appendChild(nodes[i] instanceof _Node ? nodes[i] : document.createTextNode(nodes[i]+''));
	}

	return fragment;
}
