// Window.prototype.Event.hashchange
(function () {
	var
	hash = window.location.hash,
	func = function () {
		if (hash !== window.location.hash) {
			hash = window.location.hash;

			window.dispatchEvent(new Event('hashchange'));
		}

		setTimeout(func, 200);
	};

	func();
})();
