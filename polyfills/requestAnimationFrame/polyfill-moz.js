(function (global) {

// window.requestAnimationFrame
global.requestAnimationFrame = function (callback) {
    return mozRequestAnimationFrame(function () {
        callback(performance.now());
    });
};

// window.cancelAnimationFrame
global.cancelAnimationFrame = mozCancelAnimationFrame;

}(this));
