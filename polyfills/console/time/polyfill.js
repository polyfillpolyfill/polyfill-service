(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.time === 'function') {
		return;
	}

	console.time = function time() {
		// noop
	};

})(this);
