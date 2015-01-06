(function (global) {
	'use strict';

	var
	now = Date.now || function () {
		return new Date().getTime();
	},
	startTime = now(),
	lastTime = startTime;

	// <Global>.requestAnimationFrame
	global.requestAnimationFrame = function (callback) {
		var
		currentTime = now(),
		delay = 16 + lastTime - currentTime;

		if (delay < 0) {
			delay = 0;
		}

		lastTime = currentTime;

		return setTimeout(function () {
			lastTime = (new Date()).getTime();

			callback(lastTime - startTime);
		}, delay);
	};

	// <Global>.cancelAnimationFrame
	global.cancelAnimationFrame = function (id) {
		clearTimeout(id);
	};
})(this);
