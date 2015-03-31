var _enqueueMicrotask = function () {
	function flush() {
		if (flushing && callbacks.length) {
			activeCallbacks = callbacks.splice(0, 1024);
			index = -1;

			while (callback = activeCallbacks[++index]) {
				callback();
			}

			flushing = callbacks.length;
		}
	}

	var
	callbacks = [],
	activeCallbacks, callback, flushing, index;

	setInterval(flush, 1);

	return function (callback) {
		var args = [].slice.call(arguments, 1);
		if (args) callback = callback.bind.apply(callback, [this].concat(args));
		callbacks[callbacks.length] = callback;

		if (!flushing) {
			flushing = true;
		}
	};
}();
