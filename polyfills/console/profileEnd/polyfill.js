(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.profileEnd === 'function') {
		return;
	}

	console.profileEnd = function profileEnd() {
		// noop
	};

})(this);
