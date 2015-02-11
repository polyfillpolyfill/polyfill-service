// http://dom.spec.whatwg.org/#dom-childnode-after
Document.prototype.after = Element.prototype.after = Text.prototype.after = function after() {
	if (this.parentNode) {
		this.parentNode.insertBefore(_mutation(arguments), this.nextSibling);
	}
};
