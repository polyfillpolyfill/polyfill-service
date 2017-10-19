/* eslint-env mocha, browser */
/* global proclaim */

it('should be defined', function () {
    proclaim.isInstanceOf(window.requestAnimationFrame, Function);
    proclaim.isInstanceOf(window.cancelAnimationFrame, Function);
});

it('should return a number id', function () {
    proclaim.isTypeOf(requestAnimationFrame(function () {}), 'number');
});

it('should be cancelable', function (done) {
    var called = false;
    var id = requestAnimationFrame(function () {
        called = true;
    });
    cancelAnimationFrame(id);
    setTimeout(function () {
        proclaim.equal(called, false);
        done();
    }, 50);
});

it('should use a high precision timer', function (done) {
    requestAnimationFrame(function (time) {
        // See http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision#feature-detection
        proclaim.lessThan(time, 1e12);
        done();
    });
});
