(function (global) {

// window.requestAnimationFrame
global.requestAnimationFrame = function (callback) {
    return webkitRequestAnimationFrame(function () {
        callback(performance.now());
    });
};

// window.cancelAnimationFrame
global.cancelAnimationFrame = webkitCancelAnimationFrame;

}(this));
