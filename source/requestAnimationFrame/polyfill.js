(function () {
	'use strict';

	var
	startTime = (new Date()).getTime(),
	lastTime = startTime;

	// window.requestAnimationFrame
	window.requestAnimationFrame = function (callback) {
		var
		currentTime = (new Date()).getTime(),
		delay = Math.max(0, 16 - (currentTime - lastTime));

		lastTime = currentTime;

		return window.setTimeout(function () {
			lastTime = (new Date()).getTime();

			callback(lastTime - startTime);
		}, delay);
	};

	// window.cancelAnimationFrame
	window.cancelAnimationFrame = function (id) {
		clearTimeout(id);
	};
})();
