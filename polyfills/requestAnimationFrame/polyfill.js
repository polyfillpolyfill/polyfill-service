(function (global) {
	'use strict';

	var
	now = Date.now || function () {
		return new Date().getTime();
	},
	startTime = now(),
	lastTime = startTime,
	getElapsed = (window.performance && window.performance.now) || function () {
		return lastTime - startTime;
	};

	// <Global>.requestAnimationFrame
	global.requestAnimationFrame = function (callback) {
		if (typeof callback !== 'function') {
			throw new TypeError(callback + 'is not a function');
		}
		
		var
		currentTime = now(),
		delay = 16 + lastTime - currentTime;

		if (delay < 0) {
			delay = 0;
		}

		lastTime = currentTime;

		return setTimeout(function () {
			lastTime = now();

			callback(getElapsed());
		}, delay);
	};

	// <Global>.cancelAnimationFrame
	global.cancelAnimationFrame = function (id) {
		clearTimeout(id);
	};
})(this);
