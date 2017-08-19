// http://dom.spec.whatwg.org/#mutation-method-macro
function _mutation(nodes) {
	if (nodes.length === 1) {
		return nodes[0] instanceof Node ? nodes[0] : document.createTextNode(nodes[0]+'');
	}

	var fragment = document.createDocumentFragment();

	for (var i=0; i<nodes.length; i++) {
		fragment.appendChild(nodes[i] instanceof Node ? nodes[i] : document.createTextNode(nodes[i]+''));
	}

	return fragment;
}
