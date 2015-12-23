(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.cd === 'function') {
		return;
	}

	console.cd = function cd() {
		// noop
	};

})(this);
