// http://dom.spec.whatwg.org/#dom-childnode-replacewith
Document.prototype.replaceWith = Element.prototype.replaceWith = Text.prototype.replaceWith = function replaceWith() {
	if (this.parentNode) {
		this.parentNode.replaceChild(_mutation(arguments), this);
	}
};
