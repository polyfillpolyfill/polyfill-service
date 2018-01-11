/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(Promise, Function);
});

it('has correct argument length', function () {
	proclaim.equal(Promise.length, 1);
});

describe('Section 2.1.2.1: When fulfilled, a promise: must not transition to any other state.', function () {
	var promise, deferred;

	beforeEach(function () {
		deferred = {};

		promise = new Promise(function () {
			deferred.resolve = arguments[0];
			deferred.reject = arguments[1];
		});
	});

	it('trying to fulfill immediately then reject immediately', function (done) {
		promise.then(function onFulfilled() {
			deferred.value = true;
		}, function onRejected() {
			deferred.value = false;
		});

		deferred.resolve();
		deferred.reject();

		setTimeout(function () {
			proclaim.equal(deferred.value, true);

			done();
		}, 50);
	});

	it('trying to fulfill immediately then reject delayed', function (done) {
		promise.then(function onFulfilled() {
			deferred.value = true;
		}, function onRejected() {
			deferred.value = false;
		});

		deferred.resolve();

		setTimeout(function () {
			deferred.reject();

			setTimeout(function () {
				proclaim.equal(deferred.value, true);

				done();
			}, 50);
		}, 50);
	});

	it('trying to fulfill delayed then reject delayed', function (done) {
		promise.then(function () {
			deferred.value = true;
		}, function () {
			deferred.value = false;
		});

		setTimeout(function () {
			deferred.resolve();

			setTimeout(function () {
				deferred.reject();

				setTimeout(function () {
					proclaim.equal(deferred.value, true);

					done();
				}, 50);
			});
		}, 50);
	});
});

describe('Section 2.1.3.1: When rejected, a promise: must not transition to any other state.', function () {
	var promise, deferred;

	beforeEach(function () {
		deferred = {};

		promise = new Promise(function () {
			deferred.resolve = arguments[0];
			deferred.reject = arguments[1];
		});
	});

	it('trying to reject immediately then resolve immediately', function (done) {
		promise.then(function onFulfilled() {
			deferred.value = true;
		}, function onRejected() {
			deferred.value = false;
		});

		deferred.reject();
		deferred.resolve();

		setTimeout(function () {
			proclaim.equal(deferred.value, false);

			done();
		}, 50);
	});

	it('trying to reject immediately then resolve delayed', function (done) {
		promise.then(function onFulfilled() {
			deferred.value = true;
		}, function onRejected() {
			deferred.value = false;
		});

		deferred.reject();

		setTimeout(function () {
			deferred.resolve();

			setTimeout(function () {
				proclaim.equal(deferred.value, false);

				done();
			}, 50);
		}, 50);
	});

	it('trying to reject delayed then resolve delayed', function (done) {
		promise.then(function () {
			deferred.value = true;
		}, function () {
			deferred.value = false;
		});

		setTimeout(function () {
			deferred.reject();

			setTimeout(function () {
				deferred.resolve();

				setTimeout(function () {
					proclaim.equal(deferred.value, false);

					done();
				}, 50);
			});
		}, 50);
	});
});

describe('2.2.1: Both `onFulfilled` and `onRejected` are optional arguments.', function () {
	var promise;

	describe('2.2.1.1: If `onFulfilled` is not a function, it must be ignored.', function () {
		describe('applied to a directly-rejected promise', function () {
			function testNonFunction(nonFunction, stringRepresentation) {
				specify('`onFulfilled` is ' + stringRepresentation, function (done) {
					promise.then(nonFunction, function () {
						done();
					});
				});
			}

			var reject;

			promise = new Promise(function (oresolve, oreject) {
				reject = oreject;
			});

			reject();

			testNonFunction(undefined, '`undefined`');
			testNonFunction(null, '`null`');
			testNonFunction(false, '`false`');
			testNonFunction(5, '`5`');
			testNonFunction({}, 'an object');
		});

		describe('applied to a promise rejected and then chained off of', function () {
			function testNonFunction(nonFunction, stringRepresentation) {
				specify('`onFulfilled` is ' + stringRepresentation, function (done) {
					promise.then(function () {}, undefined).then(nonFunction, function () {
						done();
					});
				});
			}

			promise = new Promise(function (resolve, reject) {
				reject();
			});

			testNonFunction(undefined, '`undefined`');
			testNonFunction(null, '`null`');
			testNonFunction(false, '`false`');
			testNonFunction(5, '`5`');
			testNonFunction({}, 'an object');
		});
	});
});

it('should resolve inside then (test case from @matthew-andrews)', function(done) {
	Promise.resolve().then(function() {
		return Promise.resolve('[true]').then(JSON.parse);
	}).then(function(a) {
		proclaim.equal(a[0], true);
		done();
	});
});

it('should resolve Promise.all when all promises resolve', function(done) {
	Promise.all([
		Promise.resolve(3),
		Promise.resolve(5)
	]).then(function(results) {
		proclaim.deepEqual(results, [3,5]);
		done();
	})['catch'](function(e) {
		done(e);
	});
});
