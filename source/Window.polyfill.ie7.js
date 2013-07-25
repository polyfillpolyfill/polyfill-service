// Window.polyfill
(function () {
	function getAllElements(element) {
		for (var elements = [], all = element.all, index = 0, length = all.length; index < length; ++index) {
			elements.push(all[index]);
		}

		return elements;
	}

	function getElementsByQuery(element, query) {
		var
		// get all descendant elements
		allElements = getAllElements(element),
		allMatchedElements = new NodeList(),
		valid = '-?[_a-zA-Z]+[_a-zA-Z0-9-]*', // valid tag, id, or classname
		matches = new RegExp([
			'(' + valid + '|\\*)', // element [1]
			'#(' + valid + ')', // id [2]
			'\\.(' + valid + ')', // class [3]
			'\\[(' + valid + ')]', // attribute [4]
			'\\[(' + valid + ')([*$|~^]?=)?([\"\'])(.*?)\\7\\]', // attribute with value [5, 6, 7, 8]
			':(' + valid + ')', // :pseudo [9]
			'\\s*([>~+ ])\\s*' // modifier [10]
		].join('|'), 'g'),
		elements, match;

		// loop through the queries
		for (var queries = query.replace(/^\s+|\s+$/g, '').split(/\s*,\s*/), queryIndex = 0; query = queries[queryIndex]; ++queryIndex) {
			elements = [].concat(allElements);

			while (match = elements && matches.exec(query)) {
				var
				_element = match[1],
				_id = match[2],
				_class = match[3],
				_attribute = match[4], _attributeName = match[5], _attributeType = match[6], _attributeValue = match[8],
				_pseudo = match[9],
				_modifier = match[10],
				child;

				if (_element === '*') {
					continue;
				}

				for (var matchedElements = [], elementIndex = 0; element = elements[elementIndex]; ++elementIndex) {
					if (_element) {
						if (element.nodeName.toLowerCase() === _element.toLowerCase()) {
							push.call(matchedElements, element);
						}
					}
					else if (_id) {
						if (element.id.toLowerCase() === _id.toLowerCase()) {
							push.call(matchedElements, element);
						}
					}
					else if (_class) {
						if ((' ' + element.className.split(/\s+/).join(' ') + ' ').indexOf(' ' +_class + ' ') > -1) {
							push.call(matchedElements, element);
						}
					}
					else if (_pseudo === 'first-child') {
						child = element.parentNode && element.parentNode.nodeType === 1 && element.parentNode.firstChild;

						while (child && child.nodeType !== 1) {
							child = child.nextSibling;
						}

						if (element === child) {
							push.call(matchedElements, element);
						}
					}
					else if (_pseudo === 'last-child') {
						child = element.parentNode && element.parentNode.nodeType === 1 && element.parentNode.lastChild;

						while (child && child.nodeType !== 1) {
							child = child.previousSibling;
						}

						if (element === child) {
							push.call(matchedElements, element);
						}
					}
					else if (_attribute) {
						if (element.attributes[_attribute] && element.attributes[_attribute].specified) {
							push.call(matchedElements, element);
						}
					}
					else if (_attributeName) {
						if (element.attributes[_attributeName] && element.attributes[_attributeName].specified) {
							var nodeValue =  element.attributes[_attributeName].nodeValue;

							if (_attributeType === '=' && nodeValue === _attributeValue) {
								push.call(matchedElements, element);
							}
							if (_attributeType === '*=' && nodeValue.indexOf(_attributeValue) > -1) {
								push.call(matchedElements, element);
							}
							if (_attributeType === '^=' && nodeValue.indexOf(_attributeValue) === 0) {
								push.call(matchedElements, element);
							}
							if (_attributeType === '$=' && nodeValue.indexOf(_attributeValue) === nodeValue.length - _attributeValue.length) {
								push.call(matchedElements, element);
							}
							if (_attributeType === '~=' && (' ' + nodeValue.split(/\s+/).join(' ') + ' ').indexOf(' ' + _attributeValue + ' ') > -1) {
								push.call(matchedElements, element);
							}
							if (_attributeType === '|=' && (' ' + nodeValue.split(/-+/).join(' ') + ' ').indexOf(' ' + _attributeValue + ' ') > -1) {
								push.call(matchedElements, element);
							}
						}
					}
					else if (_pseudo === 'last-child') {
						child = element.parentNode.lastChild;

						while (child && child.nodeType !== 1) {
							child = child.previousSibling;
						}

						if (element === child) {
							push.call(matchedElements, element);
						}
					}
					else if (_modifier === '>') {
						for (var children = element.children, childIndex = 0; child = children[childIndex]; ++childIndex) {
							if (child.nodeType === 1) {
								push.call(matchedElements, child);
							}
						}
					}
					else if (_modifier === '~') {
						do {
							element = element.nextSibling;
						} while (element && element.nodeType !== 1);

						if (element) {
							push.call(matchedElements, element);
						}
					}
					else if (_modifier === '+') {
						do {
							element = element.nextSibling;
						} while (element && element.nodeType !== 1);

						if (element) {
							push.call(matchedElements, element);
						}
					}
					else if (_modifier === ' ') {
						push.apply(matchedElements, getAllElements(element));
					}
					else {
						throw new Error('SyntaxError: DOM Exception 12');
					}
				}

				elements = matchedElements;
			}

			push.apply(allMatchedElements, elements);
		}

		return sort.call(allMatchedElements, function (a, b) {
			return a.sourceIndex - b.sourceIndex;
		});
	}

	var
	Window = window.Window = function Window() {},
	HTMLDocument = window.HTMLDocument = function HTMLDocument() {},
	Element = window.Element = function Element() {},
	NodeList = window.NodeList = function NodeList() {},
	polyfill = window.polyfill = function polyfill(instance, constructor) {
		var each, index;

		if (instance.constructor === constructor) {
			return instance;
		} else {
			instance.constructor = constructor;
		}

		for (each in constructor.prototype) {
			instance[each] = constructor.prototype[each];
		}

		for (index = 0; constructor.polyfill[index]; ++index) {
			constructor.polyfill[index].call(instance);
		}

		return instance;
	},
	push = Array.prototype.push,
	sort = Array.prototype.sort;

	NodeList.prototype.length = Array.prototype.length;

	Window.polyfill = [function () {
		var window = this;

		polyfill(window.document, HTMLDocument);
	}];

	HTMLDocument.polyfill = [function () {
		var
		document = this,
		createDocumentFragment = document.createDocumentFragment,
		createElement = document.createElement,
		getElementById = document.getElementById,
		getElementsByTagName = document.getElementsByTagName;

		// HTMLDocument.prototype.head
		document.head = document.getElementsByTagName('head')[0] || document.createElement('head');

		// HTMLDocument.prototype.createDocumentFragment
		document.createDocumentFragment = function () {
			return polyfill(createDocumentFragment(), HTMLDocument);
		};

		// HTMLDocument.prototype.createElement
		document.createElement = function (tagName) {
			return polyfill(createElement(tagName), Element);
		};

		// HTMLDocument.prototype.getElementById
		document.getElementById = function (id) {
			return polyfill(getElementById(id), Element);
		};

		// HTMLDocument.prototype.getElementsByClassName
		document.getElementsByClassName = function (className) {
			for (var nodeList = new NodeList(), elements = getElementsByTagName('*'), index = 0, element; element = elements[index]; ++index) {
				if ((' ' + element.className.split(/\s+/).join(' ') + ' ').indexOf(' '+className+' ') > -1) {
					push.call(nodeList, polyfill(element, Element));
				}
			}

			return nodeList;
		};

		// HTMLDocument.prototype.getElementsByTagName
		document.getElementsByTagName = function (tagName) {
			for (var nodeList = new NodeList(), elements = getElementsByTagName(tagName), index = 0, element; element = elements[index]; ++index) {
				push.call(nodeList, polyfill(element, Element));
			}

			return nodeList;
		};

		// HTMLDocument.prototype.querySelector
		document.querySelector = function (query) {
			var elements = getElementsByQuery(document, query);

			return elements[0] && polyfill(elements[0], Element) || null;
		};

		// HTMLDocument.prototype.querySelectorAll
		document.querySelectorAll = function (query) {
			for (var elements = getElementsByQuery(document, query), index = 0, element; element = elements[index]; ++index) {
				polyfill(element, Element);
			}

			return elements;
		};

		// HTML Shiving
		'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section subline summary time video'.replace(/\w+/g, function (nodeName) {
			document.createElement(nodeName);
		});

		// Element
		for (var all = document.all, index = 0; all[index]; ++index) {
			polyfill(all[index], Element);
		}

		document.addEventListener('DOMContentLoaded', function () {
			Array.prototype.forEach.call(document.all, function (element) {
				polyfill(element, Element);
			});
		});
	}];

	Element.polyfill = [function () {
		var
		element = this,
		getElementById = element.getElementById,
		getElementsByTagName = element.getElementsByTagName,
		setAttribute = element.setAttribute;

		// <element>.getElementById
		element.getElementById = function (id) {
			return polyfill(getElementById(id), Element);
		};

		// <element>.getElementsByClassName
		element.getElementsByClassName = function (className) {
			for (var nodeList = new NodeList(), elements = getElementsByTagName('*'), index = 0; element = elements[index]; ++index) {
				if ((' ' + element.className.split(/\s+/).join(' ') + ' ').indexOf(' ' + className + ' ') > -1) {
					push.call(nodeList, polyfill(element, Element));
				}
			}

			return nodeList;
		};

		// <element>.getElementsByTagName
		element.getElementsByTagName = function (tagName) {
			for (var nodeList = new NodeList(), elements = getElementsByTagName(tagName), index = 0; element = elements[index]; ++index) {
				push.call(nodeList, polyfill(element, Element));
			}

			return nodeList;
		};

		// <element>.querySelector
		element.querySelector = function (query) {
			var elements = getElementsByQuery(element, query);

			return elements[0] && polyfill(elements[0], Element) || null;
		};

		// <element>.querySelectorAll
		element.querySelectorAll = function (query) {
			for (var elements = getElementsByQuery(element, query), index = 0; element = elements[index]; ++index) {
				polyfill(element, Element);
			}

			return elements;
		};

		// <element>.setAttribute
		element.setAttribute = function (name, value) {
			element = element || this;

			if (name === 'class') {
				element.className = value !== undefined && value !== null && String(name) || '';
			}

			return setAttribute(name, value);
		};

		// <element>.hasAttribute
		element.hasAttribute = function (name) {
			element = element || this;

			return element.getAttribute(name) !== null;
		};
	}];
})();