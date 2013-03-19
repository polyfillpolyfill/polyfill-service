Element.prototype.matchesSelector = function (selector) {
	var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;

	while (nodes[++i] && nodes[i] != node);

	return !!nodes[i];
};