(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.groupCollapsed === 'function') {
		return;
	}

	console.groupCollapsed = function groupCollapsed() {
		// noop
	};

})(this);
