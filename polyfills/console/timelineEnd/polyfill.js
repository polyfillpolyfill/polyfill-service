(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.timelineEnd === 'function') {
		return;
	}

	console.timelineEnd = function timelineEnd() {
		// noop
	};

})(this);
