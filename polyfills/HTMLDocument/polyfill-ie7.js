(function () {
	var
	// create HTMLDocument constructor
	HTMLDocument = window.HTMLDocument = window.Document = function HTMLDocument() {},

	// polyfill query selector functionality
	__querySelectorAll__ = HTMLDocument.__querySelectorAll__ = function (document, selector, callback, one) {
		var
		generator = document.__createElement__('*'),
		id = String(Math.random()),
		style, matches;

		generator.innerHTML = 'x<style>' + selector + '{qsa:' + id + '}';

		style = document.appendChild(generator.lastChild);

		matches = callback(document, id, selector, one);

		document.removeChild(style);

		return matches;
	},
	__getElementsByQSA__ = function (node, id, selector, one) {
		var
		childNodes = node.childNodes || [],
		currentStyle = node.currentStyle || {},
		elements = [],
		index = -1,
		childNode;

		if (currentStyle.qsa === id) {
			if (elements.push(node) && one) {
				return elements[0];
			}
		}

		while (childNode = childNodes[++index]) {
			if (elements = elements.concat(__getElementsByQSA__(childNode, id, selector, one)) && one) {
				return elements[0];
			}
		}

		return elements;
	},

	// polyfill HTMLDocument.prototype on a document
	shiv = HTMLDocument.__shiv__ = function (document) {
		// conditionally process document
		if (document.constructor !== HTMLDocument) {
			document.constructor = HTMLDocument;

			var
			// cache native methods
			__createDocumentFragment__ = document.__createDocumentFragment__ = document.createDocumentFragment,
			__createElement__ = document.__createElement__ = document.createElement,

			// process document during ready state change
			interval = setInterval(function () {
				if (document.body || /c/.test(document.readyState)) {
					clearInterval(interval);

					if (window.HTMLElement && window.HTMLElement.__shiv__) {
						window.HTMLElement.__shiv__(document, true);
					}
				}
			});

			// shiv elements
			'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section subhead summary template time video'.replace(/\w+/g, function (nodeName) {
				__createElement__(nodeName);
			});

			// <HTMLDocument>.createDocumentFragment
			document.createDocumentFragment = function createDocumentFragment() {
				var documentFragment = __createDocumentFragment__();

				shiv(documentFragment);

				return documentFragment;
			};

			// <HTMLDocument>.createElement
			document.createElement = function createElement(nodeName) {
				var
				element = __createElement__(String(nodeName).toLowerCase());

				shiv(element.document);

				return window.HTMLElement && window.HTMLElement.__shiv__ ? window.HTMLElement.__shiv__(element) : element;
			};

			// <HTMLDocument>.querySelector
			document.querySelector = function querySelector(selector) {
				return __querySelectorAll__(document, selector, __getElementsByQSA__, true);
			};

			// <HTMLDocument>.querySelectorAll
			document.querySelectorAll = function querySelectorAll(selector) {
				return __querySelectorAll__(document, selector, __getElementsByQSA__);
			};
		}

		return document;
	};

	HTMLDocument.prototype = shiv(document);
})();
