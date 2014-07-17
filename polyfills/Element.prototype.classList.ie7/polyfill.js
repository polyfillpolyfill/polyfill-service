// Element.prototype.classList
Element.polyfill.push(function () {
	function DOMTokenList() {}

	DOMTokenList.prototype = window.DOMTokenList.prototype;

	var classList = new DOMTokenList();

	classList.element = this;

	classList.toString();

	this.classList = classList;
});
