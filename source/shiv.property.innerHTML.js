// <element>.cloneNode, <element>.innerHTML
(function () {
	// set innerHTMLSetter
	var innerHTMLSetter = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML").set;

	Object.defineProperties(Element.prototype, {
		// shiv cloneNode method
		cloneNode: {
			configurable: true,
			value: function (deep) {
				var element = document.createElement("x");

				element.innerHTML = this.outerHTML;

				!deep && (element.firstChild.innerHTML = "");

				return element.removeChild(element.firstChild);
			}
		},
		// shiv innerHTML method
		innerHTML: {
			configurable: true,
			set: function (value) {
				var node = this;

				value.replace(/<\w+/g, function (nodeName) {
					node.document.createElement(nodeName.slice(1));
				});

				innerHTMLSetter.call(node, value);
			}
		}
	});
})(document);