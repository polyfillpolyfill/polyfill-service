(function(global) {

	var console = global.console || (global.console = {});

	if (typeof console.timeStamp === 'function') {
		return;
	}

	console.timeStamp = function timeStamp() {
		// noop
	};

})(this);
