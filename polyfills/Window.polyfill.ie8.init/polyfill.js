// Window.polyfill
(function () {
	// HTML Shiving
	'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section subline summary time video'.replace(/\w+/g, function (nodeName) {
		document.createElement(nodeName);
	});

	// Element.prototype.cloneNode

	// We can't use our method for cloning for table elements.
	var noCloneOverride = [
		'TBODY', 'TFOOT', 'THEAD', 'TR', 'COL', 'COLGROUP', 'TD', 'TH'
	];
	var readOnly = [
		'COL', 'COLGROUP', 'FRAMESET', 'HEAD', 'HTML', 'STYLE', 'TABLE',
		'TBODY', 'TFOOT', 'THEAD', 'TITLE', 'TR'
	];
	var nodeCloner = Object.getOwnPropertyDescriptor(Element.prototype, 'cloneNode').value
	Object.defineProperty(Element.prototype, 'cloneNode', {
		value: function (deep) {
			var element = this;
			if (noCloneOverride.indexOf(element.tagName) !== -1) {
				return nodeCloner.call(element, deep);
			}
			else {
				var xElement = this.document.createElement('x');
				xElement.innerHTML = element.outerHTML;

				if (!deep) {
					if (readOnly.indexOf(xElement.firstChild.tagName) !== -1) {
						xElement.firstChild.innerHTML = '';
					}
				}
				return xElement.removeChild(xElement.firstChild);
			}
		}
	});

	// Element.prototype.innerHTML
	var innerHTMLSetter = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').set;

	Object.defineProperty(Element.prototype, 'innerHTML', {
		set: function (value) {
			var element = this;
			if (readOnly.indexOf(element.tagName) !== -1) {
				return
			}
			String(value).replace(/<\w+/g, function (tagName) {
				element.document.createElement(tagName.slice(1));
			});

			innerHTMLSetter.call(element, value);
		}
	});
})();
