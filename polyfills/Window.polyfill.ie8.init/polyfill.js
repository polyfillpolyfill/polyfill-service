(function () {
	// HTML Shiving
	'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section subline summary time video'.replace(/\w+/g, function (nodeName) {
		document.createElement(nodeName);
	});

	// HTMLElement.prototype.cloneNode
	Object.defineProperty(HTMLElement.prototype, 'cloneNode', {
		value: function (deep) {
			var
			element = this,
			xElement = this.document.createElement('x');

			xElement.innerHTML = element.outerHTML;

			if (!deep) {
				xElement.firstChild.innerHTML = '';
			}

			return xElement.removeChild(xElement.firstChild);
		}
	});

	// HTMLElement.prototype.innerHTML
	var innerHTMLSetter = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerHTML').set;

	Object.defineProperty(HTMLElement.prototype, 'innerHTML', {
		set: function (value) {
			var element = this;

			String(value).replace(/<\w+/g, function (tagName) {
				element.document.createElement(tagName.slice(1));
			});

			innerHTMLSetter.call(element, value);
		}
	});
})();
