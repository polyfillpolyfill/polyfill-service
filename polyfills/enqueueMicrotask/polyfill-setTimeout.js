enqueueMicrotask = function () {
	function flush() {
		activeCallbacks = callbacks.splice(0, 1024);
		index = -1;

		while (callback = activeCallbacks[++index]) {
			callback();
		}

		if (flushing = callbacks.length) {
			setTimeout(flush);
		}
	}

	var
	callbacks = [],
	activeCallbacks, callback, flushing, index;

	return function (callback) {
		callbacks[callbacks.length] = callback;

		if (!flushing) {
			flushing = true;

			setTimeout(flush, 0);
		}
	};
}();
