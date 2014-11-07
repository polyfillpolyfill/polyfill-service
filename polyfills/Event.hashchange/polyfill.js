(function (global) {
	var
	hash = global.location.hash,
	func = function () {
		if (hash !== global.location.hash) {
			hash = global.location.hash;

			global.dispatchEvent(new Event('hashchange'));
		}

		setTimeout(func, 200);
	};

	global.onhashchange = undefined;

	func();
})(this);
