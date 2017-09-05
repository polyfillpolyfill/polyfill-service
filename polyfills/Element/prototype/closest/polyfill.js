Element.prototype.closest = function closest(selector) {
	var node = this;

	while (node) {
		if (node.matches(selector)) return node;
        else node = node.tagName === 'svg' ? node.parentNode : node.parentElement;
	}

	return null;
};
