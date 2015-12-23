(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.markTimeline === 'function') {
		return;
	}

	console.markTimeline = function markTimeline() {
		// noop
	};

})(this);
