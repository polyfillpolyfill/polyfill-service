// <Element>.cloneNode
Element.prototype.cloneNode = function cloneNode(deep) {
	var
	self = this,
	nodeName = self.nodeName,
	clone = self.document.createElement(nodeName);

	if (deep) {
		var
		outerHTML = self.outerHTML.slice(nodeName.length + 1, - 3 - nodeName.length),
		regex = /^\s+(.+?)=(['"])(.+?)\2/,
		pieces = [],
		matches;

		while (matches = outerHTML.match(regex)) {
			clone.setAttribute(matches[1], matches[3]);

			outerHTML = outerHTML.slice(matches[0].length);
		}

		clone.innerHTML = outerHTML.slice(1);
	}

	return clone;
};
