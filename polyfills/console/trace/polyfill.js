(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.trace === 'function') {
		return;
	}

	console.trace = function trace() {
		// noop
	};

})(this);
