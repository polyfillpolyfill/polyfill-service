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
    return mozRequestAnimationFrame(function () {
        callback(perfNow());
    });
};

// window.cancelAnimationFrame
global.cancelAnimationFrame = mozCancelAnimationFrame;

}(this));
