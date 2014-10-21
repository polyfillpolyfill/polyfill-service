(function () {
	var
	HTMLDocument = window.Document = window.HTMLDocument,
	prototype = HTMLDocument.prototype,

	// cache native methods
	__createDocumentFragment__ = prototype.createDocumentFragment,
	__createElement__ = prototype.createElement;

	function shiv(document) {
		// shiv elements
		'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section subhead summary template time video'.replace(/\w+/g, function (nodeName) {
			__createElement__.call(document, nodeName);
		});

		return document;
	}

	prototype.createDocumentFragment = function createDocumentFragment() {
		return shiv(__createDocumentFragment__.call(this));
	};

	prototype.createElement = function createElement(tagName) {
		var
		element = __createElement__.call(this, tagName);

		shiv(element.document);

		return element;
	};

	shiv(document);
})();
