// http://dom.spec.whatwg.org/#dom-parentnode-prepend
Document.prototype.prepend = Element.prototype.prepend = function prepend() {
	this.insertBefore(mutation(arguments), this.firstChild);
};
