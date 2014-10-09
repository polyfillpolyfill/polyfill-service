// Window.polyfill
(function () {
	// HTML Shiving
	'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section subline summary time video'.replace(/\w+/g, function (nodeName) {
		document.createElement(nodeName);
	});

	// Element.prototype.cloneNode
	(function (origCloneNode) {
			Object.defineProperty(Element.prototype, 'cloneNode', {

					value: function (deep) {
							switch (this.nodeType) {
									case 1:
											var i, len, child;
											var clone = origCloneNode.call(this, false);

											if (deep) {
													for (i = 0, len = this.childNodes.length; i < len; i++) {
															child = this.childNodes[i];
															clone.appendChild(child.cloneNode(true));
													}
											}

											return clone;

									case 8:
											return document.createComment(this.data);
							}
					}
			});
	})(Element.prototype.cloneNode);

	// Element.prototype.innerHTML
	var innerHTMLSetter = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').set;

	Object.defineProperty(Element.prototype, 'innerHTML', {
		set: function (value) {
			var element = this;

			String(value).replace(/<\w+/g, function (tagName) {
				element.document.createElement(tagName.slice(1));
			});

			innerHTMLSetter.call(element, value);
		}
	});
})();
