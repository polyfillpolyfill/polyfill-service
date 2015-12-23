(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.dirxml === 'function') {
		return;
	}

	console.dirxml = function dirxml() {
		// noop
	};

})(this);
