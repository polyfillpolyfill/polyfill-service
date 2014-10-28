(function (hasOwnProperty) {
	var
	// create Element constructor
	Element = window.Element = window.HTMLElement = function Element() {},

	// generate sandboxed iframe
	vbody = document.appendChild(document.createElement('body')),
	frame = vbody.appendChild(document.createElement('iframe')),

	// use sandboxed iframe to replicate Element functionality
	frameDocument = frame.contentWindow.document,
	prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement('*')),
	cache = Element.__prototype__ = {},

	// getter to assist in Object.defineProperty({ set: Function });
	Getter = Element.__getter__ = function Getter(getter) {
		this.get = function (scope) {
			return getter.call(scope);
		};
	},

	// polyfill Element.prototype on an element
	shiv = Element.__shiv__ = function (element, deep) {
		var
		childNodes = element.childNodes || [],
		index = -1,
		key, value, childNode;

		if (element.nodeType === 1 && element.constructor !== Element) {
			element.constructor = Element;

			for (key in cache) {
				value = cache[key];

				element[key] = value instanceof Getter ? value.get(element) : value;
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
		nonValue = !hasOwnProperty.call(cache, propertyName),
		newValue = prototype[propertyName],
		oldValue = cache[propertyName],
		index = -1,
		element;

		while (element = elements[++index]) {
			if (element.nodeType === 1) {
				if (nonValue || element[propertyName] === oldValue || oldValue instanceof Getter) {
					element[propertyName] = newValue instanceof Getter ? newValue.get(element) : newValue;
				}
			}
		}

		cache[propertyName] = newValue;
	});

	prototype.constructor = Element;

	// <Element>.cloneNode
	prototype.cloneNode = function cloneNode(deep) {
		var
		self = this,
		nodeName = self.nodeName,
		element = self.document.createElement(nodeName);

		if (deep) {
			var
			outerHTML = self.outerHTML.slice(nodeName.length + 1, - 3 - nodeName.length),
			regex = /^\s+(.+?)=(['"])(.+?)\2/,
			matches;

			while (matches = outerHTML.match(regex)) {
				element.setAttribute(matches[1], matches[3]);

				outerHTML = outerHTML.slice(matches[0].length);
			}

			element.innerHTML = outerHTML.slice(1);
		}

		return element;
	};

	if (!prototype.hasAttribute) {
		// <Element>.hasAttribute
		prototype.hasAttribute = function hasAttribute(name) {
			return this.getAttribute(name) !== null;
		};
	}

	// remove sandboxed iframe
	document.removeChild(vbody);
})(Object.prototype.hasOwnProperty);
