// polyfill old ie
(function (global) {
	var
	WindowPrototype = Window.prototype,
	DocumentPrototype = Document.prototype,
	ElementPrototype = Element.prototype,
	push = Array.prototype.push,
	getElementsByTagName = document.getElementsByTagName,
	eventRegistry = [];

	function getAllElements(element) {
		for (var elements = [], children = element.children || element.childNodes, index = 0, child; child = children && children[index]; ++index) {
			child.nodeType == 1 && elements.push.apply(elements, [child].concat(child.children && getAllElements(child)));
		}

		return elements;
	}

	function getElementsByQuery(element, query) {
		var
		elements = getAllElements(element),
		valid = '-?[_a-zA-Z]+[_a-zA-Z0-9-]*',
		matches = new RegExp([
			'('+valid+'|\\*)', // element [1]
			'#('+valid+')', // id [2]
			'\\.('+valid+')', // class [3]
			'\\[('+valid+')]', // attribute [4]
			'\\[('+valid+')([*$|~^]?=)?(["\'])(.*?)\\7\\]', // attribute with value [5, 6, 7, 8]
			':('+valid+')', // :pseudo [9]
			'\\s*([>~+ ])\\s*' // modifier [10]
		].join('|'), 'g');

		while (match = elements && matches.exec(query)) {
			var
			_element = match[1],
			_id = match[2],
			_class = match[3],
			_attribute = match[4], _attributeName = match[5], _attributeType = match[6], _attributeValue = match[8],
			_pseudo = match[9],
			_modifier = match[10];

			if (_element == '*') continue;

			for (var matchedElements = new NodeList, index = 0, element; element = elements[index]; ++index) {
				if (_element) {
					if (element.nodeName.toLowerCase() == _element.toLowerCase()) {
						push.call(matchedElements, element);
					}
				}
				else if (_id) {
					if (element.id.toLowerCase() == _id.toLowerCase()) {
						push.call(matchedElements, element);
					}
				}
				else if (_class) {
					if (element.className.toLowerCase() == _class.toLowerCase()) {
						push.call(matchedElements, element);
					}
				}
				else if (_pseudo == 'first-child') {
					var child = element.parentNode && element.parentNode.nodeType == 1 && element.parentNode.firstChild;

					while (child && child.nodeType != 1) {
						child = child.nextSibling;
					}

					if (element == child) {
						push.call(matchedElements, element);
					}
				}
				else if (_pseudo == 'last-child') {
					var child = element.parentNode && element.parentNode.nodeType == 1 && element.parentNode.lastChild;

					while (child && child.nodeType != 1) {
						child = child.previousSibling;
					}

					if (element == child) {
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

						if (_attributeType == '=' && nodeValue == _attributeValue) {
							push.call(matchedElements, element);
						}
						if (_attributeType == '*=' && nodeValue.indexOf(_attributeValue) > -1) {
							push.call(matchedElements, element);
						}
						if (_attributeType == '^=' && nodeValue.indexOf(_attributeValue) == 0) {
							push.call(matchedElements, element);
						}
						if (_attributeType == '$=' && nodeValue.indexOf(_attributeValue) == nodeValue.length - _attributeValue.length) {
							push.call(matchedElements, element);
						}
						if (_attributeType == '~=' && (' ' + nodeValue.split(/\s+/).join(' ') + ' ').indexOf(' '+_attributeValue+' ') > -1) {
							push.call(matchedElements, element);
						}
						if (_attributeType == '|=' && (' ' + nodeValue.split(/-+/).join(' ') + ' ').indexOf(' '+_attributeValue+' ') > -1) {
							push.call(matchedElements, element);
						}
					}
				}
				else if (_pseudo == 'last-child') {
					var child = element.parentNode.lastChild;

					while (child && child.nodeType != 1) {
						child = child.previousSibling;
					}

					if (element == child) {
						push.call(matchedElements, element);
					}
				}
				else if (_modifier == '>') {
					for (var children = element.children, index2 = 0; child = children[index2]; ++index2) {
						if (child.nodeType == 1) {
							push.call(matchedElements, child);
						}
					}
				}
				else if (_modifier == '~') {
					do {
						element = element.nextSibling
					} while (element && element.nodeType != 1);

					if (element) {
						push.call(matchedElements, element);
					}
				}
				else if (_modifier == '+') {
					do {
						element = element.nextSibling
					} while (element && element.nodeType != 1);

					if (element) {
						push.call(matchedElements, element);
					}
				}
				else if (_modifier == ' ') {
					push.apply(matchedElements, getAllElements(element));
				}
				else {
					throw Error('SyntaxError: DOM Exception 12');
				}
			}

			elements = matchedElements;
		}

		return elements;
	}

	// <window|document|element>.addEventListener
	Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener(type, listener) {
		var target = this;

		eventRegistry.unshift({
			__listener: function (event) {
				event.currentTarget = target;
				event.pageX = event.clientX + document.documentElement.scrollLeft;
				event.pageY = event.clientY + document.documentElement.scrollTop;
				event.preventDefault = function () { event.returnValue = false };
				event.relatedTarget = event.fromElement || null;
				event.stopPropagation = function () { event.cancelBubble = true };
				event.relatedTarget = event.fromElement || null;
				event.target = event.srcElement || target;
				event.timeStamp = +new Date;

				listener.call(target, event);
			},
			listener: listener,
			target: target,
			type: type
		});

		target.attachEvent('on' + type, eventRegistry[0].__listener);
	}

	// <window|document|element>.removeEventListener
	Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener(type, listener) {
		for (var index = 0, length = eventRegistry.length; index < length; ++index) {
			if (eventRegistry[index].target == this && eventRegistry[index].type == type && eventRegistry[index].listener == listener) {
				return this.detachEvent('on' + type, eventRegistry.splice(index, 1)[0].__listener);
			}
		}
	}

	// <window|document|element>.dispatchEvent
	Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(eventObject) {
		try {
			return this.fireEvent('on' + eventObject.type, eventObject);
		} catch (error) {
			for (var items = [].concat.call([], eventRegistry), index = 0, length = items.length; index < length; ++index) {
				if (items[index].target == this && items[index].type == eventObject.type) {
					items[index].__listener.call(this, eventObject);
				}
			}
		}
	}

	// <document|element>.querySelectorAll
	Document.prototype.querySelectorAll = Element.prototype.querySelectorAll = function (query) {
		for (var elements = getElementsByQuery(this, query), index = 0, element; element = elements[index]; ++index) {
			polyfillElement(element);
		}

		return elements;
	};

	// <document|element>.querySelector
	Document.prototype.querySelector = Element.prototype.querySelector = function (query) {
		var elements = getElementsByQuery(this, query);

		return elements[0] && polyfillElement(elements[0]) || null;
	};

	function polyfillWindow(window) {
		for (property in WindowPrototype) {
			window[property] = WindowPrototype[property];
		}

		window.CustomEvent = function CustomEvent(type, canBubble, cancelable, detail) {
			var event = self.document.createEventObject(), key;

			event.type = type;
			event.returnValue = !cancelable;
			event.cancelBubble = !canBubble;

			for (key in detail) {
				event[key] = detail[key];
			}

			return event;
		};

		// <window>.pageXOffset, <window>.pageYOffset, <window>.innerWidth, <window>.innerHeight
		function onResize() {
			var html = document.documentElement, body = document.body || document.createElement("body");

			window.pageXOffset = (html.scrollLeft || body.scrollLeft || 0) - (html.clientLeft || body.clientLeft || 0);
			window.pageYOffset = (html.scrollTop || body.scrollTop || 0) - (html.clientTop || body.clientTop || 0);
			window.innerWidth = document.documentElement.clientWidth;
			window.innerHeight = document.documentElement.clientHeight;
		}

		window.attachEvent('onresize', onResize);

		onResize();

		return window;
	}

	function polyfillDocument(document) {
		if (document.constructor == Document) return document; else document.constructor = Document;

		var
		createDocumentFragment = document.createDocumentFragment,
		createElement = document.createElement,
		getElementsByTagName = document.getElementsByTagName,
		getElementById = document.getElementById;

		document.createDocumentFragment = function () {
			return polyfillDocument(createDocumentFragment());
		};

		document.createElement = function (tagName) {
			return polyfillElement(createElement(tagName));
		};

		document.getElementsByTagName = function (tagName) {
			for (var nodeList = new NodeList, elements = getElementsByTagName(tagName), index = 0, element; element = elements[index]; ++index) {
				push.call(nodeList, polyfillElement(element));
			}

			return nodeList;
		};

		document.getElementById = function (id) {
			return polyfillElement(getElementById(id));
		};

		for (property in DocumentPrototype) {
			document[property] = DocumentPrototype[property];
		}

		return document;
	}

	function polyfillElement(element) {
		if (element.constructor == Element) return element; else element.constructor = Element;

		var
		getElementsByTagName = element.getElementsByTagName,
		getElementById = element.getElementById;

		element.getElementsByTagName = function (tagName) {
			for (var nodeList = new NodeList, elements = getElementsByTagName(tagName), index = 0, element; element = elements[index]; ++index) {
				push.call(nodeList, polyfillElement(element));
			}

			return nodeList;
		};

		element.getElementById = function (id) {
			return polyfillElement(getElementById(id));
		};

		element.classList = {
			add: function (className) {
				var
				classList = ' '+element.className.split(/\s+/).join(' ')+' ',
				className = ' '+className+' ',
				index = classList.indexOf(className);

				if (index < 0) {
					element.className = classList.slice(1, -1)+className.slice(0, -1);
				}
			},
			contains: function (className) {
				return (' '+element.className.split(/\s+/).join(' ')+' ').indexOf(' '+className+' ') > -1;
			},
			remove: function (className) {
				var
				classList = ' '+element.className.split(/\s+/).join(' ')+' ',
				className = ' '+className+' ',
				index = classList.indexOf(className);

				if (index > -1) {
					element.className = classList.slice(1, index - 1)+classList.slice(index + className.length);
				}
			},
			toggle: function (className) {
				var
				classList = ' '+element.className.split(/\s+/).join(' ')+' ',
				className = ' '+className+' ',
				index = classList.indexOf(className);

				element.className = index < 0 ? classList.slice(1, -1)+className.slice(0, -1) : classList.slice(1, index - 1)+classList.slice(index + className.length);
			}
		};

		for (property in ElementPrototype) {
			element[property] = ElementPrototype[property];
		}

		return element;
	}

	polyfillWindow(window);
	polyfillDocument(document);

	// document.onDOMContentLoaded
	document.attachEvent('onreadystatechange', function (event) {
		if (document.readyState == 'complete') {
			for (var elements = document.all, index = 0, element; element = elements[index]; ++index) {
				polyfillElement(element);
			}

			document.dispatchEvent(new CustomEvent('DOMContentLoaded', false, false));
		}
	});
})(this);
