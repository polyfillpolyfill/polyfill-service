(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.debug === 'function') {
		return;
	}

	console.debug = function debug() {

		var fn = console.log;
		var hasApply = false;

		try {
			hasApply = !!fn.apply;
		} catch (e) { /* do nothing */ }

		if (hasApply) {
			return function () {
				fn.apply(console, arguments);
			};
		}

		return function (arg1, arg2, arg3) {
			fn(arg1, arg2, arg3);
		};

	};

})(this);
