(function () {
	var
	HTMLDocument = window.Document = window.HTMLDocument,
	prototype = HTMLDocument.prototype,

	// cache native methods
	__createDocumentFragment__ = prototype.createDocumentFragment,
	__createElement__ = prototype.createElement,

	shivStyle = document.createElement();

	shivStyle.innerHTML = 'x<style>' +
	// corrects block display not defined in IE6/7/8/9
	'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
	// adds styling not present in IE6/7/8/9
	'mark{background:#FF0;color:#000}' +
	// hides non-rendered elements
	'template,[hidden]{display:none}';

	document.documentElement.appendChild(shivStyle.lastChild);

	function addStyleSheet(ownerDocument, cssText) {
		var p = ownerDocument.createElement('p'),
		parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;
		p.innerHTML = 'x<style>' + cssText + '</style>';
		return parent.insertBefore(p.lastChild, parent.firstChild);
	}

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
	addStyleSheet(document,
        // corrects block display not defined in IE6/7/8/9
        'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
        // adds styling not present in IE6/7/8/9
        'mark{background:#FF0;color:#000}' +
        // hides non-rendered elements
        'template{display:none}'
      );
})();
