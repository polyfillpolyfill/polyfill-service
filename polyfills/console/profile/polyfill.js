(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.profile === 'function') {
		return;
	}

	console.profile = function profile() {
		// noop
	};

})(this);
