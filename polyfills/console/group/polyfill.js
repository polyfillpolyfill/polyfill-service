(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.group === 'function') {
		return;
	}

	console.group = function group() {
		// noop
	};

})(this);
