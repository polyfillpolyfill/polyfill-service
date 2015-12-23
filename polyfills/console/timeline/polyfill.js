(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.timeline === 'function') {
		return;
	}

	console.timeline = function timeline() {
		// noop
	};

})(this);
