// http://dom.spec.whatwg.org/#dom-childnode-before
Document.prototype.before = Element.prototype.before = Text.prototype.before = function before() {
	if (this.parentNode) {
		this.parentNode.insertBefore(_mutation(arguments), this);
	}
};
