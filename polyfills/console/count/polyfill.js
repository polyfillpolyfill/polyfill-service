(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.count === 'function') {
		return;
	}

	console.count = function count() {
		// noop
	};

})(this);
