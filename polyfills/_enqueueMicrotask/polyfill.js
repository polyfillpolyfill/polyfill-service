_enqueueMicrotask = function () {
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
		callbacks[callbacks.length] = callback;

		if (!flushing) {
			flushing = true;
		}
	};
}();
