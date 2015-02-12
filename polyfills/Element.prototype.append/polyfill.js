// http://dom.spec.whatwg.org/#dom-parentnode-append
Document.prototype.prepend = Element.prototype.append = function append() {
	this.appendChild(_mutation(arguments));
};
