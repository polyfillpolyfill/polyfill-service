(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.exception === 'function') {
		return;
	}

	console.exception = function exception() {
		// noop
	};

})(this);
