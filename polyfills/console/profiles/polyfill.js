(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.profiles === 'function') {
		return;
	}

	console.profiles = function profiles() {
		// noop
	};

})(this);
