
// performance.now
(function (global) {

var startTime = Date.now();

if (!global.performance) {
	global.performance = {};
}

global.performance.now = function () {
	return Date.now() - startTime;
};

}(self));
