(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.show === 'function') {
		return;
	}

	console.show = function show() {
		// noop
	};

})(this);
