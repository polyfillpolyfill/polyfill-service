(function (global) {
var
now = Date.now || function () {
    return new Date().getTime();
},
startTime = now(),
perfNow = (window.performance && window.performance.now) || function () {
    return now() - startTime;
};

// window.requestAnimationFrame
global.requestAnimationFrame = function (callback) {
    return webkitRequestAnimationFrame(function () {
        callback(perfNow());
    });
};

// window.cancelAnimationFrame
global.cancelAnimationFrame = webkitCancelAnimationFrame;

}(this));
