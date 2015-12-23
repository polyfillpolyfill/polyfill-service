(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.dir === 'function') {
		return;
	}

	console.dir = function dir() {
		// noop
	};

})(this);
