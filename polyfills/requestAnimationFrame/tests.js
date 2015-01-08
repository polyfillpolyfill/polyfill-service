it('should be defined', function () {
    expect(window.requestAnimationFrame).to.be.a('function');
    expect(window.cancelAnimationFrame).to.be.a('function');
});

it('should return a number id', function () {
    expect(requestAnimationFrame(function () {})).to.be.a('number');
});

it('should be cancelable', function (done) {
    var called = false;
    var id = requestAnimationFrame(function () {
        called = true;
    });
    cancelAnimationFrame(id);
    setTimeout(function () {
        expect(called).to.be(false);
        done();
    }, 50);
});

it('should use a high precision timer', function (done) {
    requestAnimationFrame(function (time) {
        // See http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision#feature-detection
        expect(time).to.be.below(1e12);
        done();
    });
});
