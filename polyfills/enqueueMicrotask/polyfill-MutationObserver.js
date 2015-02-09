enqueueMicrotask = function () {
	function flush() {
		activeCallbacks = callbacks.splice(0, 1024);
		index = -1;

		while (callback = activeCallbacks[++index]) {
			callback();
		}

		if (flushing = callbacks.length) {
			textNode.data = data = !data;
		}
	}

	var
	callbacks = [],
	textNode = document.createTextNode(''),
	activeCallbacks, callback, data, flushing, index;

	(new MutationObserver(flush)).observe(textNode, {
		characterData: true
	});

	return function (callback) {
		callbacks[callbacks.length] = callback;

		if (!flushing) {
			flushing = true;

			textNode.data = data = !data;
		}
	};
}();
