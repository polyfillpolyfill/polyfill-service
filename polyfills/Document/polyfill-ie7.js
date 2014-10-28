(this.Document = this.HTMLDocument = document.constructor = function Document() {}).prototype = document;

(function (global) {
	var
	// shiv document
	shiv = Document.__shiv__ = function (document) {
		var
		nativeCreateDocumentFragment = document.createDocumentFragment,
		nativeCreateElement = document.createElement;

		// shiv elements
		'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section subhead summary template time video'.replace(/\w+/g, function (nodeName) {
			nativeCreateElement(nodeName);
		});

		// <Document>.createDocumentFragment
		document.createDocumentFragment = function createDocumentFragment() {
			return shiv(nativeCreateDocumentFragment());
		};

		// <Document>.createElement
		document.createElement = function createElement(nodeName) {
			var
			element = nativeCreateElement(String(nodeName).toLowerCase());

			shiv(element.document);

			return global.Element && global.Element.__shiv__ ? global.Element.__shiv__(element) : element;
		};

		return document;
	},

	// process document during ready state change
	interval = setInterval(function () {
		if (document.body || /c/.test(document.readyState)) {
			clearInterval(interval);

			if (window.Element && window.Element.__shiv__) {
				window.Element.__shiv__(document, true);
			}
		}
	}),

	// shiv default element styling
	shivStyle = document.createElement();

	shivStyle.innerHTML = 'x<style>' +
	// corrects block display not defined in IE6/7/8/9
	'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
	// adds styling not present in IE6/7/8/9
	'mark{background:#FF0;color:#000}' +
	// hides non-rendered elements
	'template{display:none}' +
	'[hidden]{display:none}';

	document.getElementsByTagName('head')[0].appendChild(shivStyle.lastChild);

	shiv(document);
})(this);
