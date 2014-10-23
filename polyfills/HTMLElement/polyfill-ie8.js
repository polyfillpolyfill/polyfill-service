(function () {
	var
	HTMLElement = window.HTMLElement = window.Element,
	prototype = HTMLElement.prototype;

	// <HTMLElement>.cloneNode
	prototype.cloneNode = function cloneNode(deep) {
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

	// <HTMLElement>.matches
	prototype.matches = function matches(selector) {
		var
		self = this,
		matches = self.document.querySelectorAll(selector),
		index = -1,
		match;

		while (match = matches[++index]) {
			if (match === self) {
				return true;
			}
		}

		return false;
	};
})();
