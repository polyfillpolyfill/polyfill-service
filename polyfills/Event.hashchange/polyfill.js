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

	// Can't set window properties to undefined in IE7/8: "Not implemented"
	global.onhashchange = function() {};

	func();
})(this);
