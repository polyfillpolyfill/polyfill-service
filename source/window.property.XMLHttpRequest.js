// Polyfill XMLHttpRequest
Object.defineProperty(Window.prototype, "XMLHttpRequest", {
	value: function () {
		return new ActiveXObject("MSXML2.XMLHTTP.3.0");
	}
});