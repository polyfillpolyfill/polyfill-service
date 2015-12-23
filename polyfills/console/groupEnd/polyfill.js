(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.groupEnd === 'function') {
		return;
	}

	console.groupEnd = function groupEnd() {
		// noop
	};

})(this);
