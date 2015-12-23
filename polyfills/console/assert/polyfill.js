(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.assert === 'function') {
		return;
	}

	console.assert = function assert() {
		// noop
	};

})(this);
