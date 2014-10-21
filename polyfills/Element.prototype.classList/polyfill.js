(function (CLASSLIST) {
	var descriptor = {
		get: function () {
			function DOMTokenList() {}

			DOMTokenList.prototype = window.DOMTokenList.prototype;

			var classList = new DOMTokenList();

			classList.element = this;

			classList.toString();

			return classList;
		}
	};

	Object.defineProperty(HTMLElement.prototype, CLASSLIST, descriptor);
})('classList');
