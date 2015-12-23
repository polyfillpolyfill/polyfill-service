(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.table === 'function') {
		return;
	}

	console.table = function table() {
		// noop
	};

})(this);
