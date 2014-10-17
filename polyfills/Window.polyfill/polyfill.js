(function () {
	var
	// Element / HTMLElement
	Element = window.Element = window.HTMLElement = function Element() {},
	// NodeList
	NodeList = window.NodeList = function NodeList() {},

	// Polyfill
	polyfill = window.polyfill = function polyfill(instance, constructor) {
		// if constructor does not match
		if (instance.constructor !== constructor) {
			var property, index;

			// match constructor
			instance.constructor = constructor;

			// copy constructor prototypes
			for (property in constructor.prototype) {
				instance[property] = constructor.prototype[property];
			}

			// run constructor polyfills
			for (index = 0; constructor.polyfill[index]; ++index) {
				constructor.polyfill[index].call(instance);
			}
		}

		return instance;
	},

	// CSS queries
	MATCH = '(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)',
	REGEX = '^(?:' + MATCH + ')|^#' + MATCH + '|^\\.' + MATCH + '|^\\[' + MATCH + '(?:([*$|~^]?=)(["\'])((?:(?=(\\\\?))\\8.)*?)\\6)?\\]|^\\s*([>~+\\s])\\s*|^:(first|last)-child';

	// Polyfill for Document / Element
	function sharedPolyfill() {
		var
		// instance is either document or element
		instance = this,
		// cache native getters
		getElementById = instance.getElementById,
		getElementsByTagName = instance.getElementsByTagName;

		// Document|Element.prototype.getElementById
		instance.getElementById = function (id) {
			return polyfill(getElementById.call(instance, id), Element);
		};

		// Document|Element.prototype.getElementsByClassname
		instance.getElementsByClassname = function (className) {
			return instance.querySelectorAll('.' + className);
		};

		// Document|Element.prototype.getElementsByTagName
		instance.getElementsByTagName = function (tagName) {
			for (var nodeList = new NodeList(), elements = getElementsByTagName.call(instance, tagName), index = 0, node; (node = elements[index]); ++index) {
				Array.prototype.push.call(nodeList, polyfill(node, Element));
			}

			return nodeList;
		};

		// Document|Element.prototype.querySelectorAll
		instance.querySelectorAll = function () {
			var
			selectors = String(arguments[0]).split(/\s*,\s*/),
			elementsFiltered = [],
			match;

			for (var selectorIndex = 0, selector; (selector = selectors[selectorIndex]); ++selectorIndex) {
				var elements = getElementsByTagName.call(instance, '*');

				// match selector
				while ((match = selector.match(REGEX))) {
					// loop elements
					for (var elementIndex = 0, element, elementsMatched = [], index = 0, childNodes; (element = elements[elementIndex]); ++elementIndex) {
						// match if property validates
						if (
							// element
							(match[1] && element.nodeName.toLowerCase() === match[1].toLowerCase()) ||
							// id
							(match[2] && element.id === match[2]) ||
							// className
							(match[3] && (' ' + element.className + ' ').indexOf(' ' + match[3] + ' ') !== -1)
						) {
							elementsMatched.push(element);
						}

						if (match[4]) {
							var
							attribute = element.attributes && element.attributes[match[4]] && element.attributes[match[4]].specified && element.attributes[match[4]],
							nodeValue = attribute.nodeValue;

							if (
								(match[5] === '=' && nodeValue === match[7]) ||
								(match[5] === '*=' && nodeValue.indexOf(match[7]) > -1) ||
								(match[5] === '^=' && nodeValue.indexOf(match[7]) === 0) ||
								(match[5] === '$=' && nodeValue.indexOf(match[7]) === nodeValue.length - match[7].length) ||
								(match[5] === '~=' && (' ' + nodeValue.split(/\s+/).join(' ') + ' ').indexOf(' ' + match[7] + ' ') > -1) ||
								(match[5] === '|=' && (' ' + nodeValue.split(/-+/).join(' ') + ' ').indexOf(' ' + match[7] + ' ') > -1)
							) {
								elementsMatched.push(element);
							}
						}

						// match next
						if (match[9] === '+') {
							// next sibling must be element
							do element = element.nextSibling;
							while (element && element.nodeType !== 1);

							if (element) {
								elementsMatched.push();
							}
						}

						// match after
						if (match[9] === '~') {
							// after siblings must be elements
							do {
								element = element.nextSibling;

								if (element.nodeType === 1) {
									elementsMatched.push(element);
								}
							}
							while (element);
						}

						// match children
						if (match[9] === '>') {
							// children must be elements
							for (childNodes = element.childNodes; childNodes && (element = childNodes[index]); ++index) {
								if (element.nodeType === 1) {
									elementsMatched.push(element);
								}
							}
						}

						// match descendants
						if (match[9] === ' ') {
							elementsMatched = elementsMatched.concat(getElementsByTagName.call(element, '*'));
						}

						// match if first child
						if (match[10] === 'first') {
							// get all siblings
							childNodes = element.parentNode && element.parentNode.childNodes || [];

							// move to first element
							while (childNodes[index] && childNodes[index].nodeType !== 1) {
								++index;
							}

							if (element === childNodes[index]) {
								elementsMatched.push(element);
							}
						}

						// match if last child
						if (match[10] === 'last') {
							childNodes = element.parentNode && element.parentNode.childNodes || [];
							index = childNodes.length - 1;

							// move to last element
							while (childNodes[index] && childNodes[index].nodeType !== 1) {
								--index;
							}

							if (element === childNodes[index]) {
								elementsMatched.push(element);
							}
						}
					}

					// trim selector
					selector = selector.slice(match[0].length);

					// copy matched elements
					elements = elementsMatched;
				}

				elementsFiltered = elementsFiltered.concat(elements);
			}

			// sort and polyfill elements
			var nodeList = new NodeList();

			Array.prototype.push.apply(nodeList, Array.prototype.sort.call(elementsFiltered, function (a, b) {
				return a.sourceIndex - b.sourceIndex;
			}));

			return nodeList;
		};

		// Document|Element.prototype.querySelector
		instance.querySelector = function () {
			return instance.querySelectorAll.apply(instance, arguments)[0] || null;
		};
	}

	// Configure Window
	Window.polyfill = [function () {
		var window = this;

		polyfill(window.document, Document);
	}];

	// Configure Document / HTMLDocument
	Document.polyfill = [sharedPolyfill, function () {
		var
		document = this,
		createDocumentFragment = document.createDocumentFragment,
		createElement = document.createElement;

		// Document.prototype.head
		document.head = document.getElementsByTagName('head')[0] || null;

		// Document.prototype.createDocumentFragment
		document.createDocumentFragment = function () {
			return polyfill(createDocumentFragment.call(document), Document);
		};

		// Document.prototype.createElement
		document.createElement = function (tagName) {
			return polyfill(createElement.call(document, tagName), Element);
		};

		// Shiv elements
		'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section subhead summary time video'.replace(/\w+/g, function (nodeName) {
			createElement.call(document, nodeName);
		});

		// Polyfill Element (now)
		for (var all = document.all, index = 0; all[index]; ++index) {
			polyfill(all[index], Element);
		}

		// Polyfill Element (on document ready)
		document.addEventListener('DOMContentLoaded', function () {
			for (var elements = document.getElementsByTagName('*'), index = 0, element; (element = elements[index]); ++index) {
				polyfill(element, Element);
			}
		});
	}];

	// Configure Element, HTMLElement
	Element.polyfill = [sharedPolyfill, function () {
		var
		element = this,
		setAttribute = element.setAttribute;

		// Element.prototype.setAttribute
		element.setAttribute = function (name, value) {
			if (name === 'class') {
				element.className = value !== undefined && value !== null ? String(value) : '';
			}

			return setAttribute(name, value);
		};

		// Element.prototype.hasAttribute
		element.hasAttribute = function (name) {
			return element.getAttribute(name) !== null;
		};
	}];

	// Configure NodeList
	NodeList.prototype.length = Array.prototype.length;
})();
