(function (global, slice, prefix, messages) {
	// setImmediate
	global.setImmediate = function setImmediate(func) {
		/* use strict */

		var
		scope = this,
		args = slice.call(arguments, 1),
		id = messages.push(function (event) {
			if (event.data === prefix + id) {
				global.clearImmediate(id);

				func.apply(scope, args);
			}
		}) - 1;

		addEventListener(type, messages[id]);

		global.postMessage(prefix + id, '*');

		return id;
	};

	// clearImmediate
	global.clearImmediate = function clearImmediate(id) {
		if (messages[id]) {
			removeEventListener(type, messages[id]);

			delete messages[id];
		}
	};

	var
	addEventListener = global.addEventListener || global.attachEvent,
	removeEventListener = global.removeEventListener || global.detachEvent,
	type = global.addEventListener ? 'message' : 'onmessage';
})(this, Array.prototype.slice, 'setImmediate#', []);
