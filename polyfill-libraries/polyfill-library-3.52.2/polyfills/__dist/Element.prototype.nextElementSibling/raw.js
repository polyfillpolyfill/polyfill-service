
// Element.prototype.nextElementSibling
Object.defineProperty(Element.prototype, "nextElementSibling", {
	get: function(){
		var el = this.nextSibling;
		while (el && el.nodeType !== 1) { el = el.nextSibling; }
		return el;
	}
});
