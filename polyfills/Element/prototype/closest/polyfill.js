Element.prototype.closest = function closest(selector) {
	var node = this;

	while (node) {
		if (node.matches(selector)) return node;
		else node = node instanceof SVGElement ? node.parentNode : node.parentElement;
	}

	return null;
};
