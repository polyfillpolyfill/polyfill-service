(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.timeEnd === 'function') {
		return;
	}

	console.timeEnd = function timeEnd() {
		// noop
	};

})(this);
