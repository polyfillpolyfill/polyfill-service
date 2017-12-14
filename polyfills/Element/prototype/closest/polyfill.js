Element.prototype.closest = function closest(selector) {
	var node = this;

	while (node) {
		if (node.matches(selector)) return node;
		else node = SVGElement && node instanceof SVGElement ? node.parentNode : node.parentElement;
	}

	return null;
};
