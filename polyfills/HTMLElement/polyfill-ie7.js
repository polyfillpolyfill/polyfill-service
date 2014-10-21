(function () {
	var
	// create HTMLElement constructor
	HTMLElement = window.HTMLElement = window.Element = function HTMLElement() {},

	// generate sandboxed iframe
	vbody = document.appendChild(document.createElement('body')),
	frame = vbody.appendChild(document.createElement('iframe')),

	// use sandboxed iframe to replicate HTMLElement functionality
	frameDocument = frame.contentWindow.document,
	prototype = HTMLElement.prototype = frameDocument.appendChild(frameDocument.createElement('*')),
	cache = HTMLElement.__prototype__ = {},

	// polyfill HTMLElement.prototype on an element
	shiv = HTMLElement.__shiv__ = function (element, deep) {
		var
		childNodes = element.childNodes || [],
		index = -1,
		key, childNode;

		if (element.nodeType === 1 && element.constructor !== HTMLElement) {
			for (key in cache) {
				element[key] = cache[key];
			}
		}

		while (childNode = deep && childNodes[++index]) {
			shiv(childNode, deep);
		}

		return element;
	},

	elements = document.getElementsByTagName('*');

	prototype.attachEvent('onpropertychange', function (event) {
		var
		propertyName = event.propertyName,
		nonValue = !(propertyName in cache),
		newValue = prototype[propertyName],
		oldValue = cache[propertyName],
		index = -1,
		element;

		while (element = elements[++index]) {
			if (nonValue || element[propertyName] === oldValue) {
				element[propertyName] = newValue;
			}
		}

		cache[propertyName] = newValue;
	});

	prototype.constructor = cache.constructor = HTMLElement;

	// <HTMLElement>.cloneNode
	prototype.cloneNode = function cloneNode(deep) {
		var
		self = this,
		nodeName = self.nodeName,
		element = self.document.createElement(nodeName);

		if (deep) {
			var
			outerHTML = self.outerHTML.slice(nodeName.length + 1, - 3 - nodeName.length),
			regex = /^\s+(.+?)=(['"])(.+?)\2/,
			matches,
			pieces = [];

			while (matches = outerHTML.match(regex)) {
				element.setAttribute(matches[1], matches[3]);

				outerHTML = outerHTML.slice(matches[0].length);
			}

			element.innerHTML = outerHTML.slice(1);
		}

		return element;
	};

	// <HTMLElement>.matches
	prototype.matches = function matches(selector) {
		var
		self = this,
		currentStyle = self.currentStyle;

		return window.HTMLDocument ? window.HTMLDocument.__querySelectorAll__(self.document, selector, function (node, id) {
			return currentStyle.qsa === id;
		}, true) : false;
	};


	if (!prototype.hasAttribute) {
		// <HTMLElement>.hasAttribute
		prototype.hasAttribute = function hasAttribute(name) {
			return this.getAttribute(name) !== null;
		};
	}

	// remove sandboxed iframe
	document.removeChild(vbody);
})();
