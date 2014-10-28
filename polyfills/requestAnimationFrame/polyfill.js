(function (global) {
	'use strict';

	var
	startTime = (new Date()).getTime(),
	lastTime = startTime;

	// <Global>.requestAnimationFrame
	global.requestAnimationFrame = function (callback) {
		var
		currentTime = (new Date()).getTime(),
		delay = Math.max(0, 16 - (currentTime - lastTime));

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
