// <element>.hidden
Object.defineProperty(Element.prototype, "hidden", {
	configurable: true,
	enumerable: true,
	get: function () {
		return this.hasAttribute("hidden");
	},
	set: function (value) {
		!!value ? this.setAttribute("hidden", "") : this.removeAttribute("hidden");
	}
});