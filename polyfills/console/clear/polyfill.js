(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.clear === 'function') {
		return;
	}

	console.clear = function clear() {
		// noop
	};

})(this);
