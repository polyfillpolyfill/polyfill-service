(function(global) {

	var console = global.console || (global.console = {});

	console.log = console.log || (console.log = function log() {
		// noop
	});

})(this);
