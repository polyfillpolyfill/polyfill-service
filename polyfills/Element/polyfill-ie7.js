(function () {
	var
	// create Element constructor
	Element = window.Element = window.HTMLElement = new Function('return function Element() {}')(),

	// generate sandboxed iframe
	vbody = document.appendChild(document.createElement('body')),
	frame = vbody.appendChild(document.createElement('iframe')),

	// use sandboxed iframe to replicate Element functionality
	frameDocument = frame.contentWindow.document,
	prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement('*')),
	cache = {},

	// getter to assist in Object.defineProperty({ set: Function });
	Getter = Element.__getter__ = function Getter(getter) {
		this.get = function (scope) {
			return getter.call(scope);
		};
	},

	// polyfill Element.prototype on an element
	shiv = function (element, deep) {
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

	elements = document.getElementsByTagName('*'),
	nativeCreateElement = document.createElement,
	interval,
	loopLimit = 100;

	prototype.attachEvent('onpropertychange', function (event) {
		var
		propertyName = event.propertyName,
		nonValue = !cache.hasOwnProperty(propertyName),
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

	if (!prototype.hasAttribute) {
		// <Element>.hasAttribute
		prototype.hasAttribute = function hasAttribute(name) {
			return this.getAttribute(name) !== null;
		};
	}

	// Apply Element prototype to the pre-existing DOM as soon as the body element appears.
	function bodyCheck(e) {
		if (!(loopLimit--)) clearTimeout(interval);
		if (document.body && !document.body.prototype && /(complete|interactive)/.test(document.readyState)) {
			shiv(document, true);
			if (interval && document.body.prototype) clearTimeout(interval);
			return (!!document.body.prototype);
		}
		return false;
	}
	if (!bodyCheck(true)) {
		document.onreadystatechange = bodyCheck;
		interval = setInterval(bodyCheck, 25);
	}

	// Apply to any new elements created after load
	document.createElement = function createElement(nodeName) {
		var element = nativeCreateElement(String(nodeName).toLowerCase());
		return shiv(element);
	};

	// remove sandboxed iframe
	document.removeChild(vbody);
})();
