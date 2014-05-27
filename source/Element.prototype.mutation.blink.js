(function () {
	// http://dom.spec.whatwg.org/#mutation-method-macro
	function mutation(nodes) {
		if (!nodes.length) {
			throw new Error('DOM Exception 8');
		} else if (nodes.length === 1) {
			return typeof nodes[0] === 'string' ? document.createTextNode(nodes[0]) : nodes[0];
		} else {
			var fragment = document.createDocumentFragment(), index, node;

			for (index in arguments) {
				node = arguments[index];

				fragment.appendChild(typeof node === 'string' ? document.createTextNode(node) : node);
			}

			return fragment;
		}
	}

	// http://dom.spec.whatwg.org/#dom-parentnode-prepend
	Element.prototype.prepend = function prepend() {
		this.insertBefore(mutation(arguments), this.firstChild);
	};

	// http://dom.spec.whatwg.org/#dom-parentnode-append
	Element.prototype.append = function append() {
		this.appendChild(mutation(arguments));
	};

	// http://dom.spec.whatwg.org/#dom-childnode-before
	Element.prototype.before = function before() {
		if (this.parentNode) {
			this.parentNode.insertBefore(mutation(arguments), this);
		}
	};

	// http://dom.spec.whatwg.org/#dom-childnode-after
	Element.prototype.after = function after() {
		if (this.parentNode) {
			this.parentNode.insertBefore(mutation(arguments), this.nextSibling);
		}
	};

	// http://dom.spec.whatwg.org/#dom-childnode-replace
	Element.prototype.replace = function replace() {
		if (this.parentNode) {
			this.parentNode.replaceChild(mutation(arguments), this);
		}
	};
})();
