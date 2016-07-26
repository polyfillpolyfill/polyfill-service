/* eslint-env mocha, browser */
/* global expect, sinon, proclaim */
/* eslint-disable no-var, strict, one-var, no-unused-vars, eqeqeq, no-extend-native */
"use strict";
/**
 * Include Sinon for section 2.2.6
 */
before(function(done) {
  var head = head = document.head || document.getElementsByTagName('head')[0];
  var scriptEl = document.createElement('script');
  var readywait = null;
  scriptEl.src = 'https://cdnjs.cloudflare.com/ajax/libs/sinon.js/1.15.4/sinon.min.js';
  scriptEl.onload = function() {
    clearTimeout(readywait);
    done();
  };
  readywait = setInterval(function() {
    if ('sinon' in window) {
      clearTimeout(readywait);
      done();
    }
  }, 500);
  head.appendChild(scriptEl);
});

/**
 * Polyfill-service tests for Promise
 */
it('has correct instance', function () {
	expect(Promise).to.be.a(Function);
});

it('has correct argument length', function () {
	expect(Promise.length).to.be(1);
});

it('should resolve inside then (test case from @matthew-andrews)', function(done) {
	Promise.resolve().then(function() {
		return Promise.resolve('[true]').then(JSON.parse);
	}).then(function(a) {
		expect(a[0]).to.be(true);
		done();
	});
});

it('should resolve Promise.all when all promises resolve', function(done) {
	Promise.all([
		Promise.resolve(3),
		Promise.resolve(5)
	]).then(function(results) {
		expect(results).to.eql([3,5]);
		done();
	})['catch'](function(e) {
		done(e);
	});
});

// promises-aplus and promises-es6 test suites both look for an assert global.
var assert = proclaim;
var global = window;

/**
 * This section is used to adapt the Promise polyfill and polyfill-service
 * tests to work with promises-aplus test harness.
 * https://github.com/promises-aplus/promises-tests
 */
(function(){

	var adapter = {};

	adapter.deferred = function () {
		var pending = {};
		pending.promise = new Promise(function (resolver, reject) {
			pending.resolve = resolver;
			pending.reject = reject;
		});
		return pending;
	};

	adapter.resolved = function (value) {
		return Promise.resolve(value);
	};

	adapter.rejected = function (reason) {
		return Promise.reject(reason);
	};

	/**
	 * Declare all common test variables and helpers before the test suites.
	 */

	var dummy = { dummy: "dummy" }; // we fulfill or reject with this when we don't intend to test against it
	var other = { other: "other" }; // a value we don't want to be strict equal to
	var sentinel = { sentinel: "sentinel" }; // a sentinel fulfillment value to test for with strict equality
	var sentinelArray = [sentinel]; // a sentinel fulfillment value to test when we need an array
	var thenables = {
		fulfilled: {
				"a synchronously-fulfilled custom thenable": function (value) {
						return {
								then: function (onFulfilled) {
										onFulfilled(value);
								}
						};
				},

				"an asynchronously-fulfilled custom thenable": function (value) {
						return {
								then: function (onFulfilled) {
										setTimeout(function () {
												onFulfilled(value);
										}, 0);
								}
						};
				},

				"a synchronously-fulfilled one-time thenable": function (value) {
						var numberOfTimesThenRetrieved = 0;
						return Object.create(null, {
								then: {
										get: function () {
												if (numberOfTimesThenRetrieved === 0) {
														++numberOfTimesThenRetrieved;
														return function (onFulfilled) {
																onFulfilled(value);
														};
												}
												return null;
										}
								}
						});
				},

				"a thenable that tries to fulfill twice": function (value) {
						return {
								then: function (onFulfilled) {
										onFulfilled(value);
										onFulfilled(other);
								}
						};
				},

				"a thenable that fulfills but then throws": function (value) {
						return {
								then: function (onFulfilled) {
										onFulfilled(value);
										throw other;
								}
						};
				},

				"an already-fulfilled promise": function (value) {
						return resolved(value);
				},

				"an eventually-fulfilled promise": function (value) {
						var d = deferred();
						setTimeout(function () {
								d.resolve(value);
						}, 50);
						return d.promise;
				}
		},
		rejected: {
				"a synchronously-rejected custom thenable": function (reason) {
						return {
								then: function (onFulfilled, onRejected) {
										onRejected(reason);
								}
						};
				},

				"an asynchronously-rejected custom thenable": function (reason) {
						return {
								then: function (onFulfilled, onRejected) {
										setTimeout(function () {
												onRejected(reason);
										}, 0);
								}
						};
				},

				"a synchronously-rejected one-time thenable": function (reason) {
						var numberOfTimesThenRetrieved = 0;
						return Object.create(null, {
								then: {
										get: function () {
												if (numberOfTimesThenRetrieved === 0) {
														++numberOfTimesThenRetrieved;
														return function (onFulfilled, onRejected) {
																onRejected(reason);
														};
												}
												return null;
										}
								}
						});
				},

				"a thenable that immediately throws in `then`": function (reason) {
						return {
								then: function () {
										throw reason;
								}
						};
				},

				"an object with a throwing `then` accessor": function (reason) {
						return Object.create(null, {
								then: {
										get: function () {
												throw reason;
										}
								}
						});
				},

				"an already-rejected promise": function (reason) {
						return rejected(reason);
				},

				"an eventually-rejected promise": function (reason) {
						var d = deferred();
						setTimeout(function () {
								d.reject(reason);
						}, 50);
						return d.promise;
				}
		}
	};

	var resolved = adapter.resolved;
	var rejected = adapter.rejected;
	var deferred = adapter.deferred;

	var testFulfilled = function (value, test) {
			specify("already-fulfilled", function (done) {
					test(resolved(value), done);
			});

			specify("immediately-fulfilled", function (done) {
					var d = deferred();
					test(d.promise, done);
					d.resolve(value);
			});

			specify("eventually-fulfilled", function (done) {
					var d = deferred();
					test(d.promise, done);
					setTimeout(function () {
							d.resolve(value);
					}, 50);
			});
	};

	var testRejected = function (reason, test) {
			specify("already-rejected", function (done) {
					test(rejected(reason), done);
			});

			specify("immediately-rejected", function (done) {
					var d = deferred();
					test(d.promise, done);
					d.reject(reason);
			});

			specify("eventually-rejected", function (done) {
					var d = deferred();
					test(d.promise, done);
					setTimeout(function () {
							d.reject(reason);
					}, 50);
			});
	};

	var reasons = {};

	reasons["`undefined`"] = function () {
			return undefined;
	};

	reasons["`null`"] = function () {
			return null;
	};

	reasons["`false`"] = function () {
			return false;
	};

	reasons["`0`"] = function () {
			return 0;
	};

	reasons["an error"] = function () {
			return new Error();
	};

	reasons["an error without a stack"] = function () {
			var error = new Error();
			delete error.stack;

			return error;
	};

	reasons["a date"] = function () {
			return new Date();
	};

	reasons["an object"] = function () {
			return {};
	};

	reasons["an always-pending thenable"] = function () {
			return { then: function () { } };
	};

	reasons["a fulfilled promise"] = function () {
			return resolved(dummy);
	};

	reasons["a rejected promise"] = function () {
			return rejected(dummy);
	};

	describe("2.1.2.1: When fulfilled, a promise: must not transition to any other state.", function () {
			testFulfilled(dummy, function (promise, done) {
					var onFulfilledCalled = false;

					promise.then(function onFulfilled() {
							onFulfilledCalled = true;
					}, function onRejected() {
							assert.strictEqual(onFulfilledCalled, false);
							done();
					});

					setTimeout(done, 100);
			});

			specify("trying to fulfill then immediately reject", function (done) {
					var d = deferred();
					var onFulfilledCalled = false;

					d.promise.then(function onFulfilled() {
							onFulfilledCalled = true;
					}, function onRejected() {
							assert.strictEqual(onFulfilledCalled, false);
							done();
					});

					d.resolve(dummy);
					d.reject(dummy);
					setTimeout(done, 100);
			});

			specify("trying to fulfill then reject, delayed", function (done) {
					var d = deferred();
					var onFulfilledCalled = false;

					d.promise.then(function onFulfilled() {
							onFulfilledCalled = true;
					}, function onRejected() {
							assert.strictEqual(onFulfilledCalled, false);
							done();
					});

					setTimeout(function () {
							d.resolve(dummy);
							d.reject(dummy);
					}, 50);
					setTimeout(done, 100);
			});

			specify("trying to fulfill immediately then reject delayed", function (done) {
					var d = deferred();
					var onFulfilledCalled = false;

					d.promise.then(function onFulfilled() {
							onFulfilledCalled = true;
					}, function onRejected() {
							assert.strictEqual(onFulfilledCalled, false);
							done();
					});

					d.resolve(dummy);
					setTimeout(function () {
							d.reject(dummy);
					}, 50);
					setTimeout(done, 100);
			});
	});

	describe("2.1.3.1: When rejected, a promise: must not transition to any other state.", function () {
			testRejected(dummy, function (promise, done) {
					var onRejectedCalled = false;

					promise.then(function onFulfilled() {
							assert.strictEqual(onRejectedCalled, false);
							done();
					}, function onRejected() {
							onRejectedCalled = true;
					});

					setTimeout(done, 100);
			});

			specify("trying to reject then immediately fulfill", function (done) {
					var d = deferred();
					var onRejectedCalled = false;

					d.promise.then(function onFulfilled() {
							assert.strictEqual(onRejectedCalled, false);
							done();
					}, function onRejected() {
							onRejectedCalled = true;
					});

					d.reject(dummy);
					d.resolve(dummy);
					setTimeout(done, 100);
			});

			specify("trying to reject then fulfill, delayed", function (done) {
					var d = deferred();
					var onRejectedCalled = false;

					d.promise.then(function onFulfilled() {
							assert.strictEqual(onRejectedCalled, false);
							done();
					}, function onRejected() {
							onRejectedCalled = true;
					});

					setTimeout(function () {
							d.reject(dummy);
							d.resolve(dummy);
					}, 50);
					setTimeout(done, 100);
			});

			specify("trying to reject immediately then fulfill delayed", function (done) {
					var d = deferred();
					var onRejectedCalled = false;

					d.promise.then(function onFulfilled() {
							assert.strictEqual(onRejectedCalled, false);
							done();
					}, function onRejected() {
							onRejectedCalled = true;
					});

					d.reject(dummy);
					setTimeout(function () {
							d.resolve(dummy);
					}, 50);
					setTimeout(done, 100);
			});
	});

	describe("2.2.1: Both `onFulfilled` and `onRejected` are optional arguments.", function () {
			describe("2.2.1.1: If `onFulfilled` is not a function, it must be ignored.", function () {
					describe("applied to a directly-rejected promise", function () {
							function testNonFunction(nonFunction, stringRepresentation) {
									specify("`onFulfilled` is " + stringRepresentation, function (done) {
											rejected(dummy).then(nonFunction, function () {
													done();
											});
									});
							}

							testNonFunction(undefined, "`undefined`");
							testNonFunction(null, "`null`");
							testNonFunction(false, "`false`");
							testNonFunction(5, "`5`");
							testNonFunction({}, "an object");
					});

					describe("applied to a promise rejected and then chained off of", function () {
							function testNonFunction(nonFunction, stringRepresentation) {
									specify("`onFulfilled` is " + stringRepresentation, function (done) {
											rejected(dummy).then(function () { }, undefined).then(nonFunction, function () {
													done();
											});
									});
							}

							testNonFunction(undefined, "`undefined`");
							testNonFunction(null, "`null`");
							testNonFunction(false, "`false`");
							testNonFunction(5, "`5`");
							testNonFunction({}, "an object");
					});
			});

			describe("2.2.1.2: If `onRejected` is not a function, it must be ignored.", function () {
					describe("applied to a directly-fulfilled promise", function () {
							function testNonFunction(nonFunction, stringRepresentation) {
									specify("`onRejected` is " + stringRepresentation, function (done) {
											resolved(dummy).then(function () {
													done();
											}, nonFunction);
									});
							}

							testNonFunction(undefined, "`undefined`");
							testNonFunction(null, "`null`");
							testNonFunction(false, "`false`");
							testNonFunction(5, "`5`");
							testNonFunction({}, "an object");
					});

					describe("applied to a promise fulfilled and then chained off of", function () {
							function testNonFunction(nonFunction, stringRepresentation) {
									specify("`onFulfilled` is " + stringRepresentation, function (done) {
											resolved(dummy).then(undefined, function () { }).then(function () {
													done();
											}, nonFunction);
									});
							}

							testNonFunction(undefined, "`undefined`");
							testNonFunction(null, "`null`");
							testNonFunction(false, "`false`");
							testNonFunction(5, "`5`");
							testNonFunction({}, "an object");
					});
			});
	});

	describe("2.2.2: If `onFulfilled` is a function,", function () {
			describe("2.2.2.1: it must be called after `promise` is fulfilled, with `promise`’s fulfillment value as its " +
							"first argument.", function () {
					testFulfilled(sentinel, function (promise, done) {
							promise.then(function onFulfilled(value) {
									assert.strictEqual(value, sentinel);
									done();
							});
					});
			});

			describe("2.2.2.2: it must not be called before `promise` is fulfilled", function () {
					specify("fulfilled after a delay", function (done) {
							var d = deferred();
							var isFulfilled = false;

							d.promise.then(function onFulfilled() {
									assert.strictEqual(isFulfilled, true);
									done();
							});

							setTimeout(function () {
									d.resolve(dummy);
									isFulfilled = true;
							}, 50);
					});

					specify("never fulfilled", function (done) {
							var d = deferred();
							var onFulfilledCalled = false;

							d.promise.then(function onFulfilled() {
									onFulfilledCalled = true;
									done();
							});

							setTimeout(function () {
									assert.strictEqual(onFulfilledCalled, false);
									done();
							}, 150);
					});
			});

			describe("2.2.2.3: it must not be called more than once.", function () {
					specify("already-fulfilled", function (done) {
							var timesCalled = 0;

							resolved(dummy).then(function onFulfilled() {
									assert.strictEqual(++timesCalled, 1);
									done();
							});
					});

					specify("trying to fulfill a pending promise more than once, immediately", function (done) {
							var d = deferred();
							var timesCalled = 0;

							d.promise.then(function onFulfilled() {
									assert.strictEqual(++timesCalled, 1);
									done();
							});

							d.resolve(dummy);
							d.resolve(dummy);
					});

					specify("trying to fulfill a pending promise more than once, delayed", function (done) {
							var d = deferred();
							var timesCalled = 0;

							d.promise.then(function onFulfilled() {
									assert.strictEqual(++timesCalled, 1);
									done();
							});

							setTimeout(function () {
									d.resolve(dummy);
									d.resolve(dummy);
							}, 50);
					});

					specify("trying to fulfill a pending promise more than once, immediately then delayed", function (done) {
							var d = deferred();
							var timesCalled = 0;

							d.promise.then(function onFulfilled() {
									assert.strictEqual(++timesCalled, 1);
									done();
							});

							d.resolve(dummy);
							setTimeout(function () {
									d.resolve(dummy);
							}, 50);
					});

					specify("when multiple `then` calls are made, spaced apart in time", function (done) {
							var d = deferred();
							var timesCalled = [0, 0, 0];

							d.promise.then(function onFulfilled() {
									assert.strictEqual(++timesCalled[0], 1);
							});

							setTimeout(function () {
									d.promise.then(function onFulfilled() {
											assert.strictEqual(++timesCalled[1], 1);
									});
							}, 50);

							setTimeout(function () {
									d.promise.then(function onFulfilled() {
											assert.strictEqual(++timesCalled[2], 1);
											done();
									});
							}, 100);

							setTimeout(function () {
									d.resolve(dummy);
							}, 150);
					});

					specify("when `then` is interleaved with fulfillment", function (done) {
							var d = deferred();
							var timesCalled = [0, 0];

							d.promise.then(function onFulfilled() {
									assert.strictEqual(++timesCalled[0], 1);
							});

							d.resolve(dummy);

							d.promise.then(function onFulfilled() {
									assert.strictEqual(++timesCalled[1], 1);
									done();
							});
					});
			});
	});

	describe("2.2.3: If `onRejected` is a function,", function () {
			describe("2.2.3.1: it must be called after `promise` is rejected, with `promise`’s rejection reason as its " +
							"first argument.", function () {
					testRejected(sentinel, function (promise, done) {
							promise.then(null, function onRejected(reason) {
									assert.strictEqual(reason, sentinel);
									done();
							});
					});
			});

			describe("2.2.3.2: it must not be called before `promise` is rejected", function () {
					specify("rejected after a delay", function (done) {
							var d = deferred();
							var isRejected = false;

							d.promise.then(null, function onRejected() {
									assert.strictEqual(isRejected, true);
									done();
							});

							setTimeout(function () {
									d.reject(dummy);
									isRejected = true;
							}, 50);
					});

					specify("never rejected", function (done) {
							var d = deferred();
							var onRejectedCalled = false;

							d.promise.then(null, function onRejected() {
									onRejectedCalled = true;
									done();
							});

							setTimeout(function () {
									assert.strictEqual(onRejectedCalled, false);
									done();
							}, 150);
					});
			});

			describe("2.2.3.3: it must not be called more than once.", function () {
					specify("already-rejected", function (done) {
							var timesCalled = 0;

							rejected(dummy).then(null, function onRejected() {
									assert.strictEqual(++timesCalled, 1);
									done();
							});
					});

					specify("trying to reject a pending promise more than once, immediately", function (done) {
							var d = deferred();
							var timesCalled = 0;

							d.promise.then(null, function onRejected() {
									assert.strictEqual(++timesCalled, 1);
									done();
							});

							d.reject(dummy);
							d.reject(dummy);
					});

					specify("trying to reject a pending promise more than once, delayed", function (done) {
							var d = deferred();
							var timesCalled = 0;

							d.promise.then(null, function onRejected() {
									assert.strictEqual(++timesCalled, 1);
									done();
							});

							setTimeout(function () {
									d.reject(dummy);
									d.reject(dummy);
							}, 50);
					});

					specify("trying to reject a pending promise more than once, immediately then delayed", function (done) {
							var d = deferred();
							var timesCalled = 0;

							d.promise.then(null, function onRejected() {
									assert.strictEqual(++timesCalled, 1);
									done();
							});

							d.reject(dummy);
							setTimeout(function () {
									d.reject(dummy);
							}, 50);
					});

					specify("when multiple `then` calls are made, spaced apart in time", function (done) {
							var d = deferred();
							var timesCalled = [0, 0, 0];

							d.promise.then(null, function onRejected() {
									assert.strictEqual(++timesCalled[0], 1);
							});

							setTimeout(function () {
									d.promise.then(null, function onRejected() {
											assert.strictEqual(++timesCalled[1], 1);
									});
							}, 50);

							setTimeout(function () {
									d.promise.then(null, function onRejected() {
											assert.strictEqual(++timesCalled[2], 1);
											done();
									});
							}, 100);

							setTimeout(function () {
									d.reject(dummy);
							}, 150);
					});

					specify("when `then` is interleaved with rejection", function (done) {
							var d = deferred();
							var timesCalled = [0, 0];

							d.promise.then(null, function onRejected() {
									assert.strictEqual(++timesCalled[0], 1);
							});

							d.reject(dummy);

							d.promise.then(null, function onRejected() {
									assert.strictEqual(++timesCalled[1], 1);
									done();
							});
					});
			});
	});

	describe("2.2.4: `onFulfilled` or `onRejected` must not be called until the execution context stack contains only " +
					"platform code.", function () {
			describe("`then` returns before the promise becomes fulfilled or rejected", function () {
					testFulfilled(dummy, function (promise, done) {
							var thenHasReturned = false;

							promise.then(function onFulfilled() {
									assert.strictEqual(thenHasReturned, true);
									done();
							});

							thenHasReturned = true;
					});
					testRejected(dummy, function (promise, done) {
							var thenHasReturned = false;

							promise.then(null, function onRejected() {
									assert.strictEqual(thenHasReturned, true);
									done();
							});

							thenHasReturned = true;
					});
			});

			describe("Clean-stack execution ordering tests (fulfillment case)", function () {
					specify("when `onFulfilled` is added immediately before the promise is fulfilled",
									function () {
							var d = deferred();
							var onFulfilledCalled = false;

							d.promise.then(function onFulfilled() {
									onFulfilledCalled = true;
							});

							d.resolve(dummy);

							assert.strictEqual(onFulfilledCalled, false);
					});

					specify("when `onFulfilled` is added immediately after the promise is fulfilled",
									function () {
							var d = deferred();
							var onFulfilledCalled = false;

							d.resolve(dummy);

							d.promise.then(function onFulfilled() {
									onFulfilledCalled = true;
							});

							assert.strictEqual(onFulfilledCalled, false);
					});

					specify("when one `onFulfilled` is added inside another `onFulfilled`", function (done) {
							var promise = resolved();
							var firstOnFulfilledFinished = false;

							promise.then(function () {
									promise.then(function () {
											assert.strictEqual(firstOnFulfilledFinished, true);
											done();
									});
									firstOnFulfilledFinished = true;
							});
					});

					specify("when `onFulfilled` is added inside an `onRejected`", function (done) {
							var promise = rejected();
							var promise2 = resolved();
							var firstOnRejectedFinished = false;

							promise.then(null, function () {
									promise2.then(function () {
											assert.strictEqual(firstOnRejectedFinished, true);
											done();
									});
									firstOnRejectedFinished = true;
							});
					});

					specify("when the promise is fulfilled asynchronously", function (done) {
							var d = deferred();
							var firstStackFinished = false;

							setTimeout(function () {
									d.resolve(dummy);
									firstStackFinished = true;
							}, 0);

							d.promise.then(function () {
									assert.strictEqual(firstStackFinished, true);
									done();
							});
					});
			});

			describe("Clean-stack execution ordering tests (rejection case)", function () {
					specify("when `onRejected` is added immediately before the promise is rejected",
									function () {
							var d = deferred();
							var onRejectedCalled = false;

							d.promise.then(null, function onRejected() {
									onRejectedCalled = true;
							});

							d.reject(dummy);

							assert.strictEqual(onRejectedCalled, false);
					});

					specify("when `onRejected` is added immediately after the promise is rejected",
									function () {
							var d = deferred();
							var onRejectedCalled = false;

							d.reject(dummy);

							d.promise.then(null, function onRejected() {
									onRejectedCalled = true;
							});

							assert.strictEqual(onRejectedCalled, false);
					});

					specify("when `onRejected` is added inside an `onFulfilled`", function (done) {
							var promise = resolved();
							var promise2 = rejected();
							var firstOnFulfilledFinished = false;

							promise.then(function () {
									promise2.then(null, function () {
											assert.strictEqual(firstOnFulfilledFinished, true);
											done();
									});
									firstOnFulfilledFinished = true;
							});
					});

					specify("when one `onRejected` is added inside another `onRejected`", function (done) {
							var promise = rejected();
							var firstOnRejectedFinished = false;

							promise.then(null, function () {
									promise.then(null, function () {
											assert.strictEqual(firstOnRejectedFinished, true);
											done();
									});
									firstOnRejectedFinished = true;
							});
					});

					specify("when the promise is rejected asynchronously", function (done) {
							var d = deferred();
							var firstStackFinished = false;

							setTimeout(function () {
									d.reject(dummy);
									firstStackFinished = true;
							}, 0);

							d.promise.then(null, function () {
									assert.strictEqual(firstStackFinished, true);
									done();
							});
					});
			});
	});

	describe("2.2.5 `onFulfilled` and `onRejected` must be called as functions (i.e. with no `this` value).", function () {
			describe("strict mode", function () {
					specify("fulfilled", function (done) {
							resolved(dummy).then(function onFulfilled() {
									"use strict";

									assert.strictEqual(this, undefined);
									done();
							});
					});

					specify("rejected", function (done) {
							rejected(dummy).then(null, function onRejected() {
									"use strict";

									assert.strictEqual(this, undefined);
									done();
							});
					});
			});

			describe("sloppy mode", function () {
					specify("fulfilled", function (done) {
							resolved(dummy).then(function onFulfilled() {
									assert.strictEqual(this, global);
									done();
							});
					});

					specify("rejected", function (done) {
							rejected(dummy).then(null, function onRejected() {
									assert.strictEqual(this, global);
									done();
							});
					});
			});
	});

	// "use strict";

	// var assert = require("assert");
	// var sinon = require("sinon");
	// var testFulfilled = require("./helpers/testThreeCases").testFulfilled;
	// var testRejected = require("./helpers/testThreeCases").testRejected;

	// var dummy = { dummy: "dummy" }; // we fulfill or reject with this when we don't intend to test against it
	var other = { other: "other" }; // a value we don't want to be strict equal to
	// var sentinel = { sentinel: "sentinel" }; // a sentinel fulfillment value to test for with strict equality
	var sentinel2 = { sentinel2: "sentinel2" };
	var sentinel3 = { sentinel3: "sentinel3" };

	function callbackAggregator(times, ultimateCallback) {
			var soFar = 0;
			return function () {
					if (++soFar === times) {
							ultimateCallback();
					}
			};
	}

	describe("2.2.6: `then` may be called multiple times on the same promise.", function () {
			describe("2.2.6.1: If/when `promise` is fulfilled, all respective `onFulfilled` callbacks must execute in the " +
							"order of their originating calls to `then`.", function () {
					describe("multiple boring fulfillment handlers", function () {
							testFulfilled(sentinel, function (promise, done) {
									var handler1 = sinon.stub().returns(other);
									var handler2 = sinon.stub().returns(other);
									var handler3 = sinon.stub().returns(other);

									var spy = sinon.spy();
									promise.then(handler1, spy);
									promise.then(handler2, spy);
									promise.then(handler3, spy);

									promise.then(function (value) {
											assert.strictEqual(value, sentinel);

											sinon.assert.calledWith(handler1, sinon.match.same(sentinel));
											sinon.assert.calledWith(handler2, sinon.match.same(sentinel));
											sinon.assert.calledWith(handler3, sinon.match.same(sentinel));
											sinon.assert.notCalled(spy);

											done();
									});
							});
					});

					describe("multiple fulfillment handlers, one of which throws", function () {
							testFulfilled(sentinel, function (promise, done) {
									var handler1 = sinon.stub().returns(other);
									var handler2 = sinon.stub().throws(other);
									var handler3 = sinon.stub().returns(other);

									var spy = sinon.spy();
									promise.then(handler1, spy);
									promise.then(handler2, spy);
									promise.then(handler3, spy);

									promise.then(function (value) {
											assert.strictEqual(value, sentinel);

											sinon.assert.calledWith(handler1, sinon.match.same(sentinel));
											sinon.assert.calledWith(handler2, sinon.match.same(sentinel));
											sinon.assert.calledWith(handler3, sinon.match.same(sentinel));
											sinon.assert.notCalled(spy);

											done();
									});
							});
					});

					describe("results in multiple branching chains with their own fulfillment values", function () {
							testFulfilled(dummy, function (promise, done) {
									var semiDone = callbackAggregator(3, done);

									promise.then(function () {
											return sentinel;
									}).then(function (value) {
											assert.strictEqual(value, sentinel);
											semiDone();
									});

									promise.then(function () {
											throw sentinel2;
									}).then(null, function (reason) {
											assert.strictEqual(reason, sentinel2);
											semiDone();
									});

									promise.then(function () {
											return sentinel3;
									}).then(function (value) {
											assert.strictEqual(value, sentinel3);
											semiDone();
									});
							});
					});

					describe("`onFulfilled` handlers are called in the original order", function () {
							testFulfilled(dummy, function (promise, done) {
									var handler1 = sinon.spy(function handler1() {});
									var handler2 = sinon.spy(function handler2() {});
									var handler3 = sinon.spy(function handler3() {});

									promise.then(handler1);
									promise.then(handler2);
									promise.then(handler3);

									promise.then(function () {
											sinon.assert.callOrder(handler1, handler2, handler3);
											done();
									});
							});

							describe("even when one handler is added inside another handler", function () {
									testFulfilled(dummy, function (promise, done) {
											var handler1 = sinon.spy(function handler1() {});
											var handler2 = sinon.spy(function handler2() {});
											var handler3 = sinon.spy(function handler3() {});

											promise.then(function () {
													handler1();
													promise.then(handler3);
											});
											promise.then(handler2);

											promise.then(function () {
													// Give implementations a bit of extra time to flush their internal queue, if necessary.
													setTimeout(function () {
															sinon.assert.callOrder(handler1, handler2, handler3);
															done();
													}, 15);
											});
									});
							});
					});
			});

			describe("2.2.6.2: If/when `promise` is rejected, all respective `onRejected` callbacks must execute in the " +
							"order of their originating calls to `then`.", function () {
					describe("multiple boring rejection handlers", function () {
							testRejected(sentinel, function (promise, done) {
									var handler1 = sinon.stub().returns(other);
									var handler2 = sinon.stub().returns(other);
									var handler3 = sinon.stub().returns(other);

									var spy = sinon.spy();
									promise.then(spy, handler1);
									promise.then(spy, handler2);
									promise.then(spy, handler3);

									promise.then(null, function (reason) {
											assert.strictEqual(reason, sentinel);

											sinon.assert.calledWith(handler1, sinon.match.same(sentinel));
											sinon.assert.calledWith(handler2, sinon.match.same(sentinel));
											sinon.assert.calledWith(handler3, sinon.match.same(sentinel));
											sinon.assert.notCalled(spy);

											done();
									});
							});
					});

					describe("multiple rejection handlers, one of which throws", function () {
							testRejected(sentinel, function (promise, done) {
									var handler1 = sinon.stub().returns(other);
									var handler2 = sinon.stub().throws(other);
									var handler3 = sinon.stub().returns(other);

									var spy = sinon.spy();
									promise.then(spy, handler1);
									promise.then(spy, handler2);
									promise.then(spy, handler3);

									promise.then(null, function (reason) {
											assert.strictEqual(reason, sentinel);

											sinon.assert.calledWith(handler1, sinon.match.same(sentinel));
											sinon.assert.calledWith(handler2, sinon.match.same(sentinel));
											sinon.assert.calledWith(handler3, sinon.match.same(sentinel));
											sinon.assert.notCalled(spy);

											done();
									});
							});
					});

					describe("results in multiple branching chains with their own fulfillment values", function () {
							testRejected(sentinel, function (promise, done) {
									var semiDone = callbackAggregator(3, done);

									promise.then(null, function () {
											return sentinel;
									}).then(function (value) {
											assert.strictEqual(value, sentinel);
											semiDone();
									});

									promise.then(null, function () {
											throw sentinel2;
									}).then(null, function (reason) {
											assert.strictEqual(reason, sentinel2);
											semiDone();
									});

									promise.then(null, function () {
											return sentinel3;
									}).then(function (value) {
											assert.strictEqual(value, sentinel3);
											semiDone();
									});
							});
					});

					describe("`onRejected` handlers are called in the original order", function () {
							testRejected(dummy, function (promise, done) {
									var handler1 = sinon.spy(function handler1() {});
									var handler2 = sinon.spy(function handler2() {});
									var handler3 = sinon.spy(function handler3() {});

									promise.then(null, handler1);
									promise.then(null, handler2);
									promise.then(null, handler3);

									promise.then(null, function () {
											sinon.assert.callOrder(handler1, handler2, handler3);
											done();
									});
							});

							describe("even when one handler is added inside another handler", function () {
									testRejected(dummy, function (promise, done) {
											var handler1 = sinon.spy(function handler1() {});
											var handler2 = sinon.spy(function handler2() {});
											var handler3 = sinon.spy(function handler3() {});

											promise.then(null, function () {
													handler1();
													promise.then(null, handler3);
											});
											promise.then(null, handler2);

											promise.then(null, function () {
													// Give implementations a bit of extra time to flush their internal queue, if necessary.
													setTimeout(function () {
															sinon.assert.callOrder(handler1, handler2, handler3);
															done();
													}, 15);
											});
									});
							});
					});
			});
	});

	describe("2.2.7: `then` must return a promise: `promise2 = promise1.then(onFulfilled, onRejected)`", function () {
			specify("is a promise", function () {
					var promise1 = deferred().promise;
					var promise2 = promise1.then();

					assert(typeof promise2 === "object" || typeof promise2 === "function");
					assert.notStrictEqual(promise2, null);
					assert.strictEqual(typeof promise2.then, "function");
			});

			describe("2.2.7.1: If either `onFulfilled` or `onRejected` returns a value `x`, run the Promise Resolution " +
							"Procedure `[[Resolve]](promise2, x)`", function () {
					specify("see separate 3.3 tests", function () { });
			});

			describe("2.2.7.2: If either `onFulfilled` or `onRejected` throws an exception `e`, `promise2` must be rejected " +
							"with `e` as the reason.", function () {
					function testReason(expectedReason, stringRepresentation) {
							describe("The reason is " + stringRepresentation, function () {
									testFulfilled(dummy, function (promise1, done) {
											var promise2 = promise1.then(function onFulfilled() {
													throw expectedReason;
											});

											promise2.then(null, function onPromise2Rejected(actualReason) {
													assert.strictEqual(actualReason, expectedReason);
													done();
											});
									});
									testRejected(dummy, function (promise1, done) {
											var promise2 = promise1.then(null, function onRejected() {
													throw expectedReason;
											});

											promise2.then(null, function onPromise2Rejected(actualReason) {
													assert.strictEqual(actualReason, expectedReason);
													done();
											});
									});
							});
					}

					Object.keys(reasons).forEach(function (stringRepresentation) {
							testReason(reasons[stringRepresentation](), stringRepresentation);
					});
			});

			describe("2.2.7.3: If `onFulfilled` is not a function and `promise1` is fulfilled, `promise2` must be fulfilled " +
							"with the same value.", function () {

					function testNonFunction(nonFunction, stringRepresentation) {
							describe("`onFulfilled` is " + stringRepresentation, function () {
									testFulfilled(sentinel, function (promise1, done) {
											var promise2 = promise1.then(nonFunction);

											promise2.then(function onPromise2Fulfilled(value) {
													assert.strictEqual(value, sentinel);
													done();
											});
									});
							});
					}

					testNonFunction(undefined, "`undefined`");
					testNonFunction(null, "`null`");
					testNonFunction(false, "`false`");
					testNonFunction(5, "`5`");
					testNonFunction({}, "an object");
					testNonFunction([function () { return other; }], "an array containing a function");
			});

			describe("2.2.7.4: If `onRejected` is not a function and `promise1` is rejected, `promise2` must be rejected " +
							"with the same reason.", function () {

					function testNonFunction(nonFunction, stringRepresentation) {
							describe("`onRejected` is " + stringRepresentation, function () {
									testRejected(sentinel, function (promise1, done) {
											var promise2 = promise1.then(null, nonFunction);

											promise2.then(null, function onPromise2Rejected(reason) {
													assert.strictEqual(reason, sentinel);
													done();
											});
									});
							});
					}

					testNonFunction(undefined, "`undefined`");
					testNonFunction(null, "`null`");
					testNonFunction(false, "`false`");
					testNonFunction(5, "`5`");
					testNonFunction({}, "an object");
					testNonFunction([function () { return other; }], "an array containing a function");
			});
	});

	describe("2.3.1: If `promise` and `x` refer to the same object, reject `promise` with a `TypeError' as the reason.",
					function () {
			specify("via return from a fulfilled promise", function (done) {
					var promise = resolved(dummy).then(function () {
							return promise;
					});

					promise.then(null, function (reason) {
							assert(reason instanceof TypeError);
							done();
					});
			});

			specify("via return from a rejected promise", function (done) {
					var promise = rejected(dummy).then(null, function () {
							return promise;
					});

					promise.then(null, function (reason) {
							assert(reason instanceof TypeError);
							done();
					});
			});
	});

	function testPromiseResolution(xFactory, test) {
			specify("via return from a fulfilled promise", function (done) {
					var promise = resolved(dummy).then(function onBasePromiseFulfilled() {
							return xFactory();
					});

					test(promise, done);
			});

			specify("via return from a rejected promise", function (done) {
					var promise = rejected(dummy).then(null, function onBasePromiseRejected() {
							return xFactory();
					});

					test(promise, done);
			});
	}

	describe("2.3.2: If `x` is a promise, adopt its state", function () {
			describe("2.3.2.1: If `x` is pending, `promise` must remain pending until `x` is fulfilled or rejected.",
							function () {
					function xFactory() {
							return deferred().promise;
					}

					testPromiseResolution(xFactory, function (promise, done) {
							var wasFulfilled = false;
							var wasRejected = false;

							promise.then(
									function onPromiseFulfilled() {
											wasFulfilled = true;
									},
									function onPromiseRejected() {
											wasRejected = true;
									}
							);

							setTimeout(function () {
									assert.strictEqual(wasFulfilled, false);
									assert.strictEqual(wasRejected, false);
									done();
							}, 100);
					});
			});

			describe("2.3.2.2: If/when `x` is fulfilled, fulfill `promise` with the same value.", function () {
					describe("`x` is already-fulfilled", function () {
							function xFactory() {
									return resolved(sentinel);
							}

							testPromiseResolution(xFactory, function (promise, done) {
									promise.then(function onPromiseFulfilled(value) {
											assert.strictEqual(value, sentinel);
											done();
									});
							});
					});

					describe("`x` is eventually-fulfilled", function () {
							var d = null;

							function xFactory() {
									d = deferred();
									setTimeout(function () {
											d.resolve(sentinel);
									}, 50);
									return d.promise;
							}

							testPromiseResolution(xFactory, function (promise, done) {
									promise.then(function onPromiseFulfilled(value) {
											assert.strictEqual(value, sentinel);
											done();
									});
							});
					});
			});

			describe("2.3.2.3: If/when `x` is rejected, reject `promise` with the same reason.", function () {
					describe("`x` is already-rejected", function () {
							function xFactory() {
									return rejected(sentinel);
							}

							testPromiseResolution(xFactory, function (promise, done) {
									promise.then(null, function onPromiseRejected(reason) {
											assert.strictEqual(reason, sentinel);
											done();
									});
							});
					});

					describe("`x` is eventually-rejected", function () {
							var d = null;

							function xFactory() {
									d = deferred();
									setTimeout(function () {
											d.reject(sentinel);
									}, 50);
									return d.promise;
							}

							testPromiseResolution(xFactory, function (promise, done) {
									promise.then(null, function onPromiseRejected(reason) {
											assert.strictEqual(reason, sentinel);
											done();
									});
							});
					});
			});
	});

	function testPromiseResolution(xFactory, test) {
			specify("via return from a fulfilled promise", function (done) {
					var promise = resolved(dummy).then(function onBasePromiseFulfilled() {
							return xFactory();
					});

					test(promise, done);
			});

			specify("via return from a rejected promise", function (done) {
					var promise = rejected(dummy).then(null, function onBasePromiseRejected() {
							return xFactory();
					});

					test(promise, done);
			});
	}

	function testCallingResolvePromise(yFactory, stringRepresentation, test) {
			describe("`y` is " + stringRepresentation, function () {
					describe("`then` calls `resolvePromise` synchronously", function () {
							function xFactory() {
									return {
											then: function (resolvePromise) {
													resolvePromise(yFactory());
											}
									};
							}

							testPromiseResolution(xFactory, test);
					});

					describe("`then` calls `resolvePromise` asynchronously", function () {
							function xFactory() {
									return {
											then: function (resolvePromise) {
													setTimeout(function () {
															resolvePromise(yFactory());
													}, 0);
											}
									};
							}

							testPromiseResolution(xFactory, test);
					});
			});
	}

	function testCallingRejectPromise(r, stringRepresentation, test) {
			describe("`r` is " + stringRepresentation, function () {
					describe("`then` calls `rejectPromise` synchronously", function () {
							function xFactory() {
									return {
											then: function (resolvePromise, rejectPromise) {
													rejectPromise(r);
											}
									};
							}

							testPromiseResolution(xFactory, test);
					});

					describe("`then` calls `rejectPromise` asynchronously", function () {
							function xFactory() {
									return {
											then: function (resolvePromise, rejectPromise) {
													setTimeout(function () {
															rejectPromise(r);
													}, 0);
											}
									};
							}

							testPromiseResolution(xFactory, test);
					});
			});
	}

	function testCallingResolvePromiseFulfillsWith(yFactory, stringRepresentation, fulfillmentValue) {
			testCallingResolvePromise(yFactory, stringRepresentation, function (promise, done) {
					promise.then(function onPromiseFulfilled(value) {
							assert.strictEqual(value, fulfillmentValue);
							done();
					});
			});
	}

	function testCallingResolvePromiseRejectsWith(yFactory, stringRepresentation, rejectionReason) {
			testCallingResolvePromise(yFactory, stringRepresentation, function (promise, done) {
					promise.then(null, function onPromiseRejected(reason) {
							assert.strictEqual(reason, rejectionReason);
							done();
					});
			});
	}

	function testCallingRejectPromiseRejectsWith(reason, stringRepresentation) {
			testCallingRejectPromise(reason, stringRepresentation, function (promise, done) {
					promise.then(null, function onPromiseRejected(rejectionReason) {
							assert.strictEqual(rejectionReason, reason);
							done();
					});
			});
	}

	describe("2.3.3: Otherwise, if `x` is an object or function,", function () {
			describe("2.3.3.1: Let `then` be `x.then`", function () {
					describe("`x` is an object with null prototype", function () {
							var numberOfTimesThenWasRetrieved = null;

							beforeEach(function () {
									numberOfTimesThenWasRetrieved = 0;
							});

							function xFactory() {
									return Object.create(null, {
											then: {
													get: function () {
															++numberOfTimesThenWasRetrieved;
															return function thenMethodForX(onFulfilled) {
																	onFulfilled();
															};
													}
											}
									});
							}

							testPromiseResolution(xFactory, function (promise, done) {
									promise.then(function () {
											assert.strictEqual(numberOfTimesThenWasRetrieved, 1);
											done();
									});
							});
					});

					describe("`x` is an object with normal Object.prototype", function () {
							var numberOfTimesThenWasRetrieved = null;

							beforeEach(function () {
									numberOfTimesThenWasRetrieved = 0;
							});

							function xFactory() {
									return Object.create(Object.prototype, {
											then: {
													get: function () {
															++numberOfTimesThenWasRetrieved;
															return function thenMethodForX(onFulfilled) {
																	onFulfilled();
															};
													}
											}
									});
							}

							testPromiseResolution(xFactory, function (promise, done) {
									promise.then(function () {
											assert.strictEqual(numberOfTimesThenWasRetrieved, 1);
											done();
									});
							});
					});

					describe("`x` is a function", function () {
							var numberOfTimesThenWasRetrieved = null;

							beforeEach(function () {
									numberOfTimesThenWasRetrieved = 0;
							});

							function xFactory() {
									function x() { }

									Object.defineProperty(x, "then", {
											get: function () {
													++numberOfTimesThenWasRetrieved;
													return function thenMethodForX(onFulfilled) {
															onFulfilled();
													};
											}
									});

									return x;
							}

							testPromiseResolution(xFactory, function (promise, done) {
									promise.then(function () {
											assert.strictEqual(numberOfTimesThenWasRetrieved, 1);
											done();
									});
							});
					});
			});

			describe("2.3.3.2: If retrieving the property `x.then` results in a thrown exception `e`, reject `promise` with " +
							"`e` as the reason.", function () {
					function testRejectionViaThrowingGetter(e, stringRepresentation) {
							function xFactory() {
									return Object.create(Object.prototype, {
											then: {
													get: function () {
															throw e;
													}
											}
									});
							}

							describe("`e` is " + stringRepresentation, function () {
									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(null, function (reason) {
													assert.strictEqual(reason, e);
													done();
											});
									});
							});
					}

					Object.keys(reasons).forEach(function (stringRepresentation) {
							testRejectionViaThrowingGetter(reasons[stringRepresentation], stringRepresentation);
					});
			});

			describe("2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and " +
							"second argument `rejectPromise`", function () {
					describe("Calls with `x` as `this` and two function arguments", function () {
							function xFactory() {
									var x = {
											then: function (onFulfilled, onRejected) {
													assert.strictEqual(this, x);
													assert.strictEqual(typeof onFulfilled, "function");
													assert.strictEqual(typeof onRejected, "function");
													onFulfilled();
											}
									};
									return x;
							}

							testPromiseResolution(xFactory, function (promise, done) {
									promise.then(function () {
											done();
									});
							});
					});

					describe("Uses the original value of `then`", function () {
							var numberOfTimesThenWasRetrieved = null;

							beforeEach(function () {
									numberOfTimesThenWasRetrieved = 0;
							});

							function xFactory() {
									return Object.create(Object.prototype, {
											then: {
													get: function () {
															if (numberOfTimesThenWasRetrieved === 0) {
																	return function (onFulfilled) {
																			onFulfilled();
																	};
															}
															return null;
													}
											}
									});
							}

							testPromiseResolution(xFactory, function (promise, done) {
									promise.then(function () {
											done();
									});
							});
					});

					describe("2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)`",
									function () {
							describe("`y` is not a thenable", function () {
									testCallingResolvePromiseFulfillsWith(function () { return undefined; }, "`undefined`", undefined);
									testCallingResolvePromiseFulfillsWith(function () { return null; }, "`null`", null);
									testCallingResolvePromiseFulfillsWith(function () { return false; }, "`false`", false);
									testCallingResolvePromiseFulfillsWith(function () { return 5; }, "`5`", 5);
									testCallingResolvePromiseFulfillsWith(function () { return sentinel; }, "an object", sentinel);
									testCallingResolvePromiseFulfillsWith(function () { return sentinelArray; }, "an array", sentinelArray);
							});

							describe("`y` is a thenable", function () {
									Object.keys(thenables.fulfilled).forEach(function (stringRepresentation) {
											function yFactory() {
													return thenables.fulfilled[stringRepresentation](sentinel);
											}

											testCallingResolvePromiseFulfillsWith(yFactory, stringRepresentation, sentinel);
									});

									Object.keys(thenables.rejected).forEach(function (stringRepresentation) {
											function yFactory() {
													return thenables.rejected[stringRepresentation](sentinel);
											}

											testCallingResolvePromiseRejectsWith(yFactory, stringRepresentation, sentinel);
									});
							});

							describe("`y` is a thenable for a thenable", function () {
									Object.keys(thenables.fulfilled).forEach(function (outerStringRepresentation) {
											var outerThenableFactory = thenables.fulfilled[outerStringRepresentation];

											Object.keys(thenables.fulfilled).forEach(function (innerStringRepresentation) {
													var innerThenableFactory = thenables.fulfilled[innerStringRepresentation];

													var stringRepresentation = outerStringRepresentation + " for " + innerStringRepresentation;

													function yFactory() {
															return outerThenableFactory(innerThenableFactory(sentinel));
													}

													testCallingResolvePromiseFulfillsWith(yFactory, stringRepresentation, sentinel);
											});

											Object.keys(thenables.rejected).forEach(function (innerStringRepresentation) {
													var innerThenableFactory = thenables.rejected[innerStringRepresentation];

													var stringRepresentation = outerStringRepresentation + " for " + innerStringRepresentation;

													function yFactory() {
															return outerThenableFactory(innerThenableFactory(sentinel));
													}

													testCallingResolvePromiseRejectsWith(yFactory, stringRepresentation, sentinel);
											});
									});
							});
					});

					describe("2.3.3.3.2: If/when `rejectPromise` is called with reason `r`, reject `promise` with `r`",
									function () {
							Object.keys(reasons).forEach(function (stringRepresentation) {
									testCallingRejectPromiseRejectsWith(reasons[stringRepresentation](), stringRepresentation);
							});
					});

					describe("2.3.3.3.3: If both `resolvePromise` and `rejectPromise` are called, or multiple calls to the same " +
									"argument are made, the first call takes precedence, and any further calls are ignored.",
									function () {
							describe("calling `resolvePromise` then `rejectPromise`, both synchronously", function () {
									function xFactory() {
											return {
													then: function (resolvePromise, rejectPromise) {
															resolvePromise(sentinel);
															rejectPromise(other);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(function (value) {
													assert.strictEqual(value, sentinel);
													done();
											});
									});
							});

							describe("calling `resolvePromise` synchronously then `rejectPromise` asynchronously", function () {
									function xFactory() {
											return {
													then: function (resolvePromise, rejectPromise) {
															resolvePromise(sentinel);

															setTimeout(function () {
																	rejectPromise(other);
															}, 0);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(function (value) {
													assert.strictEqual(value, sentinel);
													done();
											});
									});
							});

							describe("calling `resolvePromise` then `rejectPromise`, both asynchronously", function () {
									function xFactory() {
											return {
													then: function (resolvePromise, rejectPromise) {
															setTimeout(function () {
																	resolvePromise(sentinel);
															}, 0);

															setTimeout(function () {
																	rejectPromise(other);
															}, 0);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(function (value) {
													assert.strictEqual(value, sentinel);
													done();
											});
									});
							});

							describe("calling `resolvePromise` with an asynchronously-fulfilled promise, then calling " +
											"`rejectPromise`, both synchronously", function () {
									function xFactory() {
											var d = deferred();
											setTimeout(function () {
													d.resolve(sentinel);
											}, 50);

											return {
													then: function (resolvePromise, rejectPromise) {
															resolvePromise(d.promise);
															rejectPromise(other);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(function (value) {
													assert.strictEqual(value, sentinel);
													done();
											});
									});
							});

							describe("calling `resolvePromise` with an asynchronously-rejected promise, then calling " +
											"`rejectPromise`, both synchronously", function () {
									function xFactory() {
											var d = deferred();
											setTimeout(function () {
													d.reject(sentinel);
											}, 50);

											return {
													then: function (resolvePromise, rejectPromise) {
															resolvePromise(d.promise);
															rejectPromise(other);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(null, function (reason) {
													assert.strictEqual(reason, sentinel);
													done();
											});
									});
							});

							describe("calling `rejectPromise` then `resolvePromise`, both synchronously", function () {
									function xFactory() {
											return {
													then: function (resolvePromise, rejectPromise) {
															rejectPromise(sentinel);
															resolvePromise(other);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(null, function (reason) {
													assert.strictEqual(reason, sentinel);
													done();
											});
									});
							});

							describe("calling `rejectPromise` synchronously then `resolvePromise` asynchronously", function () {
									function xFactory() {
											return {
													then: function (resolvePromise, rejectPromise) {
															rejectPromise(sentinel);

															setTimeout(function () {
																	resolvePromise(other);
															}, 0);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(null, function (reason) {
													assert.strictEqual(reason, sentinel);
													done();
											});
									});
							});

							describe("calling `rejectPromise` then `resolvePromise`, both asynchronously", function () {
									function xFactory() {
											return {
													then: function (resolvePromise, rejectPromise) {
															setTimeout(function () {
																	rejectPromise(sentinel);
															}, 0);

															setTimeout(function () {
																	resolvePromise(other);
															}, 0);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(null, function (reason) {
													assert.strictEqual(reason, sentinel);
													done();
											});
									});
							});

							describe("calling `resolvePromise` twice synchronously", function () {
									function xFactory() {
											return {
													then: function (resolvePromise) {
															resolvePromise(sentinel);
															resolvePromise(other);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(function (value) {
													assert.strictEqual(value, sentinel);
													done();
											});
									});
							});

							describe("calling `resolvePromise` twice, first synchronously then asynchronously", function () {
									function xFactory() {
											return {
													then: function (resolvePromise) {
															resolvePromise(sentinel);

															setTimeout(function () {
																	resolvePromise(other);
															}, 0);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(function (value) {
													assert.strictEqual(value, sentinel);
													done();
											});
									});
							});

							describe("calling `resolvePromise` twice, both times asynchronously", function () {
									function xFactory() {
											return {
													then: function (resolvePromise) {
															setTimeout(function () {
																	resolvePromise(sentinel);
															}, 0);

															setTimeout(function () {
																	resolvePromise(other);
															}, 0);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(function (value) {
													assert.strictEqual(value, sentinel);
													done();
											});
									});
							});

							describe("calling `resolvePromise` with an asynchronously-fulfilled promise, then calling it again, both " +
											"times synchronously", function () {
									function xFactory() {
											var d = deferred();
											setTimeout(function () {
													d.resolve(sentinel);
											}, 50);

											return {
													then: function (resolvePromise) {
															resolvePromise(d.promise);
															resolvePromise(other);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(function (value) {
													assert.strictEqual(value, sentinel);
													done();
											});
									});
							});

							describe("calling `resolvePromise` with an asynchronously-rejected promise, then calling it again, both " +
											"times synchronously", function () {
									function xFactory() {
											var d = deferred();
											setTimeout(function () {
													d.reject(sentinel);
											}, 50);

											return {
													then: function (resolvePromise) {
															resolvePromise(d.promise);
															resolvePromise(other);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(null, function (reason) {
													assert.strictEqual(reason, sentinel);
													done();
											});
									});
							});

							describe("calling `rejectPromise` twice synchronously", function () {
									function xFactory() {
											return {
													then: function (resolvePromise, rejectPromise) {
															rejectPromise(sentinel);
															rejectPromise(other);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(null, function (reason) {
													assert.strictEqual(reason, sentinel);
													done();
											});
									});
							});

							describe("calling `rejectPromise` twice, first synchronously then asynchronously", function () {
									function xFactory() {
											return {
													then: function (resolvePromise, rejectPromise) {
															rejectPromise(sentinel);

															setTimeout(function () {
																	rejectPromise(other);
															}, 0);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(null, function (reason) {
													assert.strictEqual(reason, sentinel);
													done();
											});
									});
							});

							describe("calling `rejectPromise` twice, both times asynchronously", function () {
									function xFactory() {
											return {
													then: function (resolvePromise, rejectPromise) {
															setTimeout(function () {
																	rejectPromise(sentinel);
															}, 0);

															setTimeout(function () {
																	rejectPromise(other);
															}, 0);
													}
											};
									}

									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(null, function (reason) {
													assert.strictEqual(reason, sentinel);
													done();
											});
									});
							});

							describe("saving and abusing `resolvePromise` and `rejectPromise`", function () {
									var savedResolvePromise, savedRejectPromise;

									function xFactory() {
											return {
													then: function (resolvePromise, rejectPromise) {
															savedResolvePromise = resolvePromise;
															savedRejectPromise = rejectPromise;
													}
											};
									}

									beforeEach(function () {
											savedResolvePromise = null;
											savedRejectPromise = null;
									});

									testPromiseResolution(xFactory, function (promise, done) {
											var timesFulfilled = 0;
											var timesRejected = 0;

											promise.then(
													function () {
															++timesFulfilled;
													},
													function () {
															++timesRejected;
													}
											);

											if (savedResolvePromise && savedRejectPromise) {
													savedResolvePromise(dummy);
													savedResolvePromise(dummy);
													savedRejectPromise(dummy);
													savedRejectPromise(dummy);
											}

											setTimeout(function () {
													savedResolvePromise(dummy);
													savedResolvePromise(dummy);
													savedRejectPromise(dummy);
													savedRejectPromise(dummy);
											}, 50);

											setTimeout(function () {
													assert.strictEqual(timesFulfilled, 1);
													assert.strictEqual(timesRejected, 0);
													done();
											}, 100);
									});
							});
					});

					describe("2.3.3.3.4: If calling `then` throws an exception `e`,", function () {
							describe("2.3.3.3.4.1: If `resolvePromise` or `rejectPromise` have been called, ignore it.", function () {
									describe("`resolvePromise` was called with a non-thenable", function () {
											function xFactory() {
													return {
															then: function (resolvePromise) {
																	resolvePromise(sentinel);
																	throw other;
															}
													};
											}

											testPromiseResolution(xFactory, function (promise, done) {
													promise.then(function (value) {
															assert.strictEqual(value, sentinel);
															done();
													});
											});
									});

									describe("`resolvePromise` was called with an asynchronously-fulfilled promise", function () {
											function xFactory() {
													var d = deferred();
													setTimeout(function () {
															d.resolve(sentinel);
													}, 50);

													return {
															then: function (resolvePromise) {
																	resolvePromise(d.promise);
																	throw other;
															}
													};
											}

											testPromiseResolution(xFactory, function (promise, done) {
													promise.then(function (value) {
															assert.strictEqual(value, sentinel);
															done();
													});
											});
									});

									describe("`resolvePromise` was called with an asynchronously-rejected promise", function () {
											function xFactory() {
													var d = deferred();
													setTimeout(function () {
															d.reject(sentinel);
													}, 50);

													return {
															then: function (resolvePromise) {
																	resolvePromise(d.promise);
																	throw other;
															}
													};
											}

											testPromiseResolution(xFactory, function (promise, done) {
													promise.then(null, function (reason) {
															assert.strictEqual(reason, sentinel);
															done();
													});
											});
									});

									describe("`rejectPromise` was called", function () {
											function xFactory() {
													return {
															then: function (resolvePromise, rejectPromise) {
																	rejectPromise(sentinel);
																	throw other;
															}
													};
											}

											testPromiseResolution(xFactory, function (promise, done) {
													promise.then(null, function (reason) {
															assert.strictEqual(reason, sentinel);
															done();
													});
											});
									});

									describe("`resolvePromise` then `rejectPromise` were called", function () {
											function xFactory() {
													return {
															then: function (resolvePromise, rejectPromise) {
																	resolvePromise(sentinel);
																	rejectPromise(other);
																	throw other;
															}
													};
											}

											testPromiseResolution(xFactory, function (promise, done) {
													promise.then(function (value) {
															assert.strictEqual(value, sentinel);
															done();
													});
											});
									});

									describe("`rejectPromise` then `resolvePromise` were called", function () {
											function xFactory() {
													return {
															then: function (resolvePromise, rejectPromise) {
																	rejectPromise(sentinel);
																	resolvePromise(other);
																	throw other;
															}
													};
											}

											testPromiseResolution(xFactory, function (promise, done) {
													promise.then(null, function (reason) {
															assert.strictEqual(reason, sentinel);
															done();
													});
											});
									});
							});

							describe("2.3.3.3.4.2: Otherwise, reject `promise` with `e` as the reason.", function () {
									describe("straightforward case", function () {
											function xFactory() {
													return {
															then: function () {
																	throw sentinel;
															}
													};
											}

											testPromiseResolution(xFactory, function (promise, done) {
													promise.then(null, function (reason) {
															assert.strictEqual(reason, sentinel);
															done();
													});
											});
									});

									describe("`resolvePromise` is called asynchronously before the `throw`", function () {
											function xFactory() {
													return {
															then: function (resolvePromise) {
																	setTimeout(function () {
																			resolvePromise(other);
																	}, 0);
																	throw sentinel;
															}
													};
											}

											testPromiseResolution(xFactory, function (promise, done) {
													promise.then(null, function (reason) {
															assert.strictEqual(reason, sentinel);
															done();
													});
											});
									});

									describe("`rejectPromise` is called asynchronously before the `throw`", function () {
											function xFactory() {
													return {
															then: function (resolvePromise, rejectPromise) {
																	setTimeout(function () {
																			rejectPromise(other);
																	}, 0);
																	throw sentinel;
															}
													};
											}

											testPromiseResolution(xFactory, function (promise, done) {
													promise.then(null, function (reason) {
															assert.strictEqual(reason, sentinel);
															done();
													});
											});
									});
							});
					});
			});

			describe("2.3.3.4: If `then` is not a function, fulfill promise with `x`", function () {
					function testFulfillViaNonFunction(then, stringRepresentation) {
							var x = null;

							beforeEach(function () {
									x = { then: then };
							});

							function xFactory() {
									return x;
							}

							describe("`then` is " + stringRepresentation, function () {
									testPromiseResolution(xFactory, function (promise, done) {
											promise.then(function (value) {
													assert.strictEqual(value, x);
													done();
											});
									});
							});
					}

					testFulfillViaNonFunction(5, "`5`");
					testFulfillViaNonFunction({}, "an object");
					testFulfillViaNonFunction([function () { }], "an array containing a function");
					testFulfillViaNonFunction(/a-b/i, "a regular expression");
					testFulfillViaNonFunction(Object.create(Function.prototype), "an object inheriting from `Function.prototype`");
			});
	});

	describe("2.3.4: If `x` is not an object or function, fulfill `promise` with `x`", function () {
			function testValue(expectedValue, stringRepresentation, beforeEachHook, afterEachHook) {
					describe("The value is " + stringRepresentation, function () {
							if (typeof beforeEachHook === "function") {
									beforeEach(beforeEachHook);
							}
							if (typeof afterEachHook === "function") {
									afterEach(afterEachHook);
							}

							testFulfilled(dummy, function (promise1, done) {
									var promise2 = promise1.then(function onFulfilled() {
											return expectedValue;
									});

									promise2.then(function onPromise2Fulfilled(actualValue) {
											assert.strictEqual(actualValue, expectedValue);
											done();
									});
							});
							testRejected(dummy, function (promise1, done) {
									var promise2 = promise1.then(null, function onRejected() {
											return expectedValue;
									});

									promise2.then(function onPromise2Fulfilled(actualValue) {
											assert.strictEqual(actualValue, expectedValue);
											done();
									});
							});
					});
			}

			testValue(undefined, "`undefined`");
			testValue(null, "`null`");
			testValue(false, "`false`");
			testValue(true, "`true`");
			testValue(0, "`0`");

			testValue(
					true,
					"`true` with `Boolean.prototype` modified to have a `then` method",
					function () {
							Boolean.prototype.then = function () {};
					},
					function () {
							delete Boolean.prototype.then;
					}
			);

			testValue(
					1,
					"`1` with `Number.prototype` modified to have a `then` method",
					function () {
							Number.prototype.then = function () {};
					},
					function () {
							delete Number.prototype.then;
					}
			);
	});
}());

/**
 * Promises-es6 test suite
 * https://github.com/promises-es6/promises-es6
 */
(function(){
	// https://github.com/promises-es6/promises-es6/blob/master/tests/all.js
	(function(){
		/*global Promise, require, setImmediate, setTimeout, describe, it */
		"use strict";


		function unexpectedResolve(done) {
				return function () {
						done("Error: promise was expected to not resolve, but did.");
				};
		}


		// behavior from:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Static_methods
		// https://people.mozilla.org/~jorendorff/es6-draft.html
		// http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts
		// Draft rev 25, May 22 2014
		// retrieved Jun 07 2014




		describe("25.4.4.1 Promise.all( iterable )", function () {
				it("is a function", function () {
						assert.equal("function", typeof Promise.all);
				});
				it("has a length property whose value is 1", function () {
						assert.equal(1, Promise.all.length);
				});
				it("throws if 'this' is not a Promise constructor", function () {
						// requires the 'this' value to be a constructor function that suppports the
						// parameter conventions of the Promise constructor
						var empty = {};

						assert.throws(function () {
								Promise.all.call(empty, []);
						}, TypeError);
						// spec says to throw TypeError, per 25.4.1.6 NewPromiseCapability
				});

				it("should immediately reject for non-iterable argument", function (done) {
						var nonIterable = 3;

						// non-Object fails CheckIterable per 7.4.1
						// GetIterator throws TypeError per 7.4.2

						Promise.all(nonIterable)
								.then(unexpectedResolve(done))
								.catch(function (err) {
										assert.ok(err instanceof TypeError);
								}).then(done).catch(done);
				});
		});

		// 0 elements
		describe("25.4.4.1 Promise.all with 0-element array", function () {

				it("should accept an empty array", function () {
						var p = Promise.all([]);
						assert.ok(p instanceof Promise);
				});

				it("should return a resolved promise whose result is empty array", function (done) {
						var p = Promise.all([]);

						assert.ok(p instanceof Promise);

						p.then(function (result) {
								assert.deepEqual([], result);
						}).then(done).catch(done);
				});
		});

		// 1 element
		describe("25.4.4.1 Promise.all with 1-element array", function () {

				it("should accept an array of one promise", function (done) {
						var p1 = Promise.resolve(1);

						Promise.all([p1]).then(function (result) {
								assert.deepEqual([1], result);
						}).then(done).catch(done);
				});
				it("should resolve immediately", function (done) {
						var obj = {};

						var p1 = new Promise(function (resolve, reject) {
								resolve(obj);
						});

						Promise.all([p1]).then(function (resolved) {
								assert.deepEqual([obj], resolved);
						}).then(done).catch(done);
				});
				it("should reject immediately", function (done) {
						var obj = {};

						var p1 = new Promise(function (resolve, reject) {
								reject(obj);
						});

						Promise.all([p1])
								.then(unexpectedResolve(done), function (rejected) {
										assert.equal(obj, rejected);
								}).then(done).catch(done);

				});
		});

		// 2 elements
		describe("25.4.4.1 with 2-element array", function () {
				it("should accept an array of two promises", function (done) {
						var p1 = Promise.resolve(1),
								p2 = Promise.resolve(2);

						Promise.all([p1, p2]).then(function (resolved) {
								assert.deepEqual([1, 2], resolved);
						}).then(done).catch(done);

				});

				it("should not resolve immediately when one of a two-promise array resolves", function (done) {
						var p1 = new Promise(function (resolve) {
										resolve(1);
								}),
								p2 = new Promise(function (resolve) {
										resolve(2);
								});

						var sequencer = [1];

						p1.then(function (resolved) {
								assert.deepEqual([1], sequencer);
								sequencer.push(2);
						}).catch(done);

						Promise.all([p1, p2]).then(function (resolved) {
								assert.deepEqual([1, 2, 3], sequencer);
								sequencer.push(4);
						}).then(done).catch(done);

						p2.then(function (resolved) {
								assert.deepEqual([1, 2], sequencer);
								sequencer.push(3);
						}).catch(done);

				});

				it("should should execute 'then' methods in sequence", function (done) {
						var p1 = Promise.resolve(100),
								p2 = Promise.resolve(200);

						var sequencer = [1];

						p1.then(function afterOne(resolved) {
								assert.deepEqual([1], sequencer);
								sequencer.push(2);
						}).catch(done);

						Promise.all([p1, p2]).then(function afterAll(resolved) {
								assert.deepEqual([1, 2, 3], sequencer);
								sequencer.push(4);
						}).then(done).catch(done);

						p2.then(function afterTwo(resolved) {
								assert.deepEqual([1, 2], sequencer);
								sequencer.push(3);
						}).catch(done);

				});
				// covered by case above
				//	it("should resolve after both promises of a two-promise array resolve");

				it("should reject immediately when the first member of a two-promise array rejects", function (done) {
						var rejectP1,
								p1 = new Promise(function (resolve, reject) {
										rejectP1 = reject;
								}),
								p2 = Promise.resolve(2);

						Promise.all([p1, p2])
								.then(unexpectedResolve(done))
								.catch(function (rejected) {
										assert.equal(rejected, 1);
								}).then(done).catch(done);

						rejectP1(1);
				});

				it("should reject immediately when the second member of a two-promise array rejects", function (done) {
						var rejectP2,
								p1 = Promise.resolve(1),
								p2 = new Promise(function (resolve, reject) {
										rejectP2 = reject;
								});

						Promise.all([p1, p2])
								.then(unexpectedResolve(done))
								.catch(function (rejected) {
										assert.equal(2, rejected);
								}).then(done).catch(done);

						rejectP2(2);
				});
		});

		// not explicitly addressed: 25.4.4.1.1 Promise.all Resolve Element Functions
		// these are not visible from userland js
	}());

	// https://github.com/promises-es6/promises-es6/blob/master/tests/constructor.js
	(function(){
		"use strict";
		// browser compatibility: old browsers don't have strict mode, so skip
		// a few tests which rely on strict mode behavior for `this`.
		var hasStrictMode = (function() { return this===null; }).call(null);

		describe("25.4.3 The Promise Constructor", function () {
				it("is the initial value of the Promise property of the global object", function () {
						assert.strictEqual(Promise, global.Promise);
				});

				it("can be called as a function");
				// requires a functioning ES6 Symbol.create
				//, function () {
				//	var p = Promise[Symbol.create]();
				// assert.doesNotThrow(function () {
				// Promise.call(p, function () {});
				// });
				//});

				it("can be used as the value in an extends clause");

				// "Subclass constructors that intend to inherit the specified
				// Promise behaviour must include a 'super' call to Promise"

				// subclass constructors MAY include a 'super' call to Promise

				// subclass constructors *that intend to inherit specified Promise
				// behavior* MUST include such a call
		});

		describe("25.4.3.1 Promise ( executor )", function () {

				it("throws TypeError when 'this' is not of type Object", function () {
						assert.throws(function () {
								Promise.call(3, function () {});
						}, TypeError);
				});

				it("throws TypeError if 'this' is a constructed, but unresolved Promise", function (done) {
						var resolveP,
								p = new Promise(function (resolve, reject) {
										resolveP = resolve;
								});

						// promise's [[PromiseState]] internal slot should be 'pending'
						// should throw
						assert.throws(function () {
								Promise.call(p, function (resolve, reject) {
										resolve(2);
								});
						}, TypeError);

						// receive first resolution
						p.then(function (resolved) {
								assert.equal(1, resolved);
						}).then(done).catch(done);

						resolveP(1);
				});

				it("throws TypeError if 'this' is a resolved Promise", function (done) {
						var p = new Promise(function (resolve, reject) {
								resolve(1);
						});

						function afterFirstResolution() {
								// if promise's [[PromiseState]] internal slot is not 'undefined'
								// should throw
								assert.throws(function () {
										Promise.call(p, function (resolve, reject) {
												resolve(2);
										});
								}, TypeError);

								// affirm that previous resolution is still settled
								p.then(function (resolved) {
										assert.equal(1, resolved);
								}).then(done).catch(done);
						}

						// receive first resolution
						p.then(function (resolved) {
								assert.equal(resolved, 1);

								Promise.resolve().then(afterFirstResolution).catch(done);
						}).catch(done);
				});

				it("throws TypeError if 'executor' is not Callable", function () {
						assert.throws(function () {
								new Promise("not callable");
						}, TypeError);
				});
		});

		describe("25.4.3.1.1 InitializePromise ( promise, executor )", function () {
				it("returns a promise");
				it("invokes the executor with 'this' = 'undefined'", function () {
						var savedThis;
						var p = new Promise(function () {
								savedThis = this;
						});

						if (hasStrictMode) {
								assert.equal(undefined, savedThis);
						}
				});
				it("catches exceptions thrown from executor and turns them into reject", function (done) {
						// if completion is an abrupt completion
						var errorObject = {};

						var p = new Promise(function () {
								throw errorObject;
						});

						p.then(undefined, function (err) {
								if (hasStrictMode) {
										assert.equal(undefined, this);
								}
								assert.equal(errorObject, err);
						}).then(done).catch(done);

				});

				it("returns a promise either in the 'pending' or 'rejected' state");
		});

		describe("25.4.3.2 new Promise ( ... argumentsList )", function () {
				it("is a constructor call");
		});

		describe("25.4.4 Properties of the Promise Constructor", function () {
				it("has a [[Protoype]] internal slot whose value is the Function prototype object");
				it("has a length property whose value is 1", function () {
						assert.equal(1, Promise.length);
				});
		});

		describe("Promise constructor", function () {
				it("is provided", function () {
						assert.equal(typeof Promise, "function");
				});

				it("returns a new Promise", function () {
						var p = new Promise(function () {});

						assert.ok(p instanceof Promise);
				});
		});
	}());

	// https://github.com/promises-es6/promises-es6/blob/master/tests/incorrect-subclassing.js
	(function(){
		"use strict";


		describe("incorrect subclassing:", function () {
				describe("25.4.1.6.1 step 8 invalid 'resolve':", function () {
					"use strict";
						function BadResolverPromise(executor) {
								var p = new Promise(executor);
								executor(3, function () {});

								this.then = p.then;
								this.constructor = BadResolverPromise;
						}
						BadResolverPromise.prototype = Promise.prototype;
						BadResolverPromise.all = Promise.all;
						BadResolverPromise.race = Promise.race;
						BadResolverPromise.reject = Promise.reject;
						BadResolverPromise.resolve = Promise.resolve;

						it("throws TypeError with Promise.reject", function (done) {
								assert.throws(function () {
										BadResolverPromise.reject(2);
								}, TypeError);

								done();
						});

						it("provides a resolve which is not a function", function (done) {
								var brp = new BadResolverPromise(function executor(resolve, reject) {
										assert(typeof resolve != "function");
								});

								assert(brp.constructor === BadResolverPromise);
								done();
						});

						it("throws TypeError with Promise.all", function (done) {
								assert.throws(function () {
										BadResolverPromise.all([1, 2]);
								}, TypeError);

								done();
						});

						it("throws TypeError with Promise.race", function (done) {
								assert.throws(function () {
										BadResolverPromise.race([1, 2]);
								}, TypeError);

								done();
						});

						it("throws TypeError with Promise.resolve", function (done) {
								assert.throws(function () {
										BadResolverPromise.resolve(1);
								}, TypeError);

								done();
						});

						it("throws TypeError with Promise.then", function (done) {
								assert.throws(function () {
										new BadResolverPromise(function () {}).then(function () {});
								}, TypeError);

								done();
						});
				});

				describe("25.4.1.6.1 step 9 invalid 'reject'", function () {

						function BadRejectorPromise(executor) {
								var p = new Promise(executor);
								executor(function () {}, 4);

								this.then = p.then;
								this.constructor = BadRejectorPromise;
						}
						BadRejectorPromise.prototype = Promise.prototype;
						BadRejectorPromise.all = Promise.all;
						BadRejectorPromise.race = Promise.race;
						BadRejectorPromise.reject = Promise.reject;
						BadRejectorPromise.resolve = Promise.resolve;

						it("provides a reject which is not a function", function (done) {
								new BadRejectorPromise(function executor(resolve, reject) {
										assert(typeof reject != "function");
										done();
								});
						});

						it("throws TypeError with Promise.all", function (done) {
								assert.throws(function () {
										BadRejectorPromise.all([1, 2]);
								}, TypeError);

								done();
						});

						it("throws TypeError with Promise.race", function (done) {
								assert.throws(function () {
										BadRejectorPromise.race([1, 2]);
								}, TypeError);

								done();
						});

						it("throws TypeError with Promise.resolve", function (done) {
								assert.throws(function () {
										BadRejectorPromise.resolve(1);
								}, TypeError);

								done();
						});

						it("throws TypeError with Promise.reject", function (done) {
								assert.throws(function () {
										BadRejectorPromise.reject(2);
								}, TypeError);

								done();
						});

						it("throws TypeError with Promise.then", function (done) {
								assert.throws(function () {
										new BadRejectorPromise(function () {}).then(function () {});
								}, TypeError);

								done();
						});
				});
		});
	}());

	// https://github.com/promises-es6/promises-es6/blob/master/tests/prototype.js
	(function(){
		/*global Promise, require, setImmediate, setTimeout, describe, it */
		"use strict";


		describe("25.4.4.2 Promise.prototype", function () {
				it("is the Promise prototype object", function () {
						var p = new Promise(function () {});

						assert.ok(p instanceof Promise);
						// TODO(Sam): is there any way to ensure that there are no
						// other objects in the prototype chain?
						assert.ok(Promise.prototype instanceof Object);
				});
				it("has attribute [[Writable]]: false");
				it("has attribute [[Enumerable]]: false");
				it("has attribute [[Configurable]]: false");
		});

		describe("25.4.5 Properties of the Promise Prototype Object", function () {
				it("is an ordinary object");
				it("is not a Promise"); // implied
		});

		describe("25.4.5.1 Promise.prototype.catch( onRejected )", function () {
				it("is a function");
				it("expects 'this' to be a Promise");
				it("takes one argument, a function");
				it("is equivalent to 'promise.then(undefined, fn)'");
		});

		describe("25.4.5.2 Promise.prototype.constructor", function () {
				it("is an object");
				it("is a function");
				it("is the Promise constructor");
		});

		describe("25.4.5.3 Promise.prototype.then", function () {
				it("is a function");
				it("expects 'this' to be a Promise");
				it("throws TypeError if 'this' is not a Promise");
				it("takes two arguments, both optional, both functions");
				it("has default on resolve: identity");
				it("has default on reject: thrower", function (done) {
						var errorObject = {};
						var p = new Promise(function (resolve, reject) {
								reject(errorObject);
						});

						p.then().catch(function (rejected) {
								assert.equal(errorObject, rejected);
						}).then(done).catch(done);
				});

				it("does not call either function immediately if promise status is 'pending'");

				it("does call onFulfilled immediately if promise status is 'fulfilled'");
				it("never calls onRejected if promise status is 'fulfilled'");

				it("never calls onFullfilled if promise status is 'rejected'");
				it("does call onRejected immediately if promise status is 'rejected'");

				it("returns its 'this' argument if it is of type 'Promise'");
				it("returns a Promise-wrapped version of 'this' if 'this' is not of type 'Promise'");
		});
	}());

	// https://github.com/promises-es6/promises-es6/blob/master/tests/race.js
	(function() {
		/*jslint indent: 8*/
		/*global Promise, require, setImmediate, setTimeout, describe, it */
		"use strict";


		describe("25.4.4.3 Promise.race( iterable )", function () {
				it("is a function", function () {
						assert.equal("function", typeof Promise.race);
				});
				it("expects one argument", function () {
						assert.equal(1, Promise.race.length);
				});
				it("should immediately reject for non-iterable argument", function (done) {
						var nonIterable = 3;

						// non-Object fails CheckIterable per 7.4.1
						// GetIterator throws TypeError per 7.4.2

						Promise.race(nonIterable)
								.catch(function (rejected) {
										assert.ok(rejected instanceof TypeError);
								}).then(done).catch(done);
				});
				it("requires 'this' to be a constructor function that supports the " +
						"parameter conventions of the Promise constructor", function (done) {
								var empty = {};
								assert.throws(function () {
										Promise.race.call(empty, []);
								}, TypeError);
								done();
						});

				it("requires 'this' to provide a 'resolve' method");

				// eventually: test of subclassing:
				// var Extended = {};
				//
				// Extended.resolve = 3;
				// assert.equal('number', typeof Extended.resolve);
				//
				// assert.throws(function () {
				// Promise.race.call(Extended, []);
				// }, TypeError);
				// done();
		});

		describe("25.4.4.3 Promise.race with 0-element array", function () {
				it("should accept an empty array", function () {
						var p = Promise.race([]);
						assert.ok(p instanceof Promise);
				});
				it("should return a pending promise", function (done) {
						var p1 = Promise.race([]);

						p1.then(function () {
								throw new Error("expected Promise.race([]) to remain unsettled");
						})
								.catch(done);

						var p2 = Promise.resolve().then(done).catch(done);
				});
		});

		describe("25.4.4.3 Promise.race with 1-element array", function () {
				it("should accept an array of one promise", function (done) {
						var p1 = Promise.resolve(1);

						Promise.race([p1]).then(function (resolved) {
								assert.equal(1, resolved);
						}).then(done).catch(done);
				});
				it("should reject immediately", function (done) {
						var p1 = new Promise(function (resolve, reject) {
								reject(1);
						});

						Promise.race([p1]).then(function (resolved) {
								throw new Error("unexpected resolve");
						}, function (rejected) {
								assert.equal(1, rejected);
						}).then(done).catch(done);
				});
		});

		describe("25.4.4.3 Promise.race with 2-element array", function () {
				it("should accept an array of two promises", function (done) {
						var p1 = Promise.resolve(1),
								p2 = Promise.resolve(2);

						Promise.race([p1, p2]).then(function (resolved) {
								assert.equal(1, resolved);
						}).then(done).catch(done);

				});
				it("should resolve immediately when first resolves", function (done) {
						var p1 = Promise.resolve(1),
								p2 = new Promise(function () {});

						Promise.race([p1, p2]).then(function (resolved) {
								assert.equal(1, resolved);
						}).then(done).catch(done);
				});
				it("should resolve immediately when second resolves", function (done) {
						var p1 = new Promise(function () {}),
								p2 = Promise.resolve(2);

						Promise.race([p1, p2]).then(function (resolved) {
								assert.equal(2, resolved);
						}).then(done).catch(done);
				});
				it("should reject immediately when first rejects", function (done) {
						var p1 = Promise.reject(1),
								p2 = Promise.resolve(2);

						Promise.race([p1, p2]).then(function (resolved) {
								throw new Error("Unexpected resolve");
						}, function (rejected) {
								assert.equal(rejected, 1);
						}).then(done).catch(done);

				});

				it("should fulfill immediately with first fulfilled promise in array", function (done) {
						var resolveP1, rejectP2,
								p1 = new Promise(function (resolve, reject) {
										resolveP1 = resolve;
								}),
								p2 = new Promise(function (resolve, reject) {
										rejectP2 = reject;
								});

						rejectP2(2);
						resolveP1(1);

						Promise.race([p1, p2]).then(function (resolved) {
								assert.equal(resolved, 1);
						}).then(done).catch(done);
				});

				it("should reject immediately when second rejects", function (done) {
						var resolveP1, rejectP2,
								p1 = new Promise(function (resolve, reject) {
										resolveP1 = resolve;
								}),
								p2 = new Promise(function (resolve, reject) {
										rejectP2 = reject;
								});

						Promise.race([p1, p2]).then(function (resolved) {
								throw new Error("Unexpected resolve " + resolved);
						}, function (rejected) {
								assert.equal(rejected, 2);
						}).then(done).catch(done);

						rejectP2(2);
						resolveP1(1);
				});
		});
	}());

	// https://github.com/promises-es6/promises-es6/blob/master/tests/reject.js
	(function() {
		"use strict";


		describe("25.4.4.4 Promise.reject( x )", function () {
				it("is a function", function () {
						assert.equal("function", typeof Promise.reject);
				});
				it("expects one argument", function () {
						assert.equal(1, Promise.reject.length);
				});
				it("always creates a new promise using 'this' as constructor", function () {
						var p = Promise.reject(3);

						assert.ok(p instanceof Promise);
				});
				it("throws if 'this' is not a constructor", function () {
						var notAConstructor = 3;

						assert.throws(function () {
								Promise.reject.call(notAConstructor, 4);
						}, TypeError);
				});
				it("always returns a rejected promise", function (done) {
						var p = Promise.reject(3);
						p.then(function () {
								throw new Error("unexpected resolve");
						}, function (rejected) {
								assert.equal(3, rejected);
						}).then(done).catch(done);
				});
		});
	}());

	// https://github.com/promises-es6/promises-es6/blob/master/tests/resolve.js
	(function(){
		"use strict";


		describe("25.4.4.5 Promise.resolve( x )", function () {
				it("is a function", function () {
						assert.equal("function", typeof Promise.resolve);
				});
				it("expects one argument", function () {
						assert.equal(1, Promise.resolve.length);
				});

				it("passes through a resolved promise created with the same constructor as 'this'", function (done) {
						var p1 = new Promise(function (resolve) {
										resolve(1);
								}),
								p2;

						p1.then(function (r1) {
								assert.equal(1, r1);
								p2 = Promise.resolve(p1);
								p2.then(function (r2) {
										assert.equal(1, r2);
										assert.equal(p1, p2);
								}).then(done).catch(done);
						}).catch(done);
				});

				it("passes through an unsettled promise created with the same constructor as 'this'", function (done) {
						var resolveP1,
								p1 = new Promise(function (resolve) {
										resolveP1 = resolve;
								}),
								p2 = Promise.resolve(p1);

						p1.then(function (r1) {
								assert.equal(1, r1);
						}).catch(done);

						p2.then(function (r2) {
								assert.equal(1, r2);
								assert.equal(p1, p2);
						}).then(done).catch(done);

						resolveP1(1);
				});


				// otherwise (called on value not created by 'this' constructor)
				it("creates a new promise using the supplied constructor", function () {
						var p1 = Promise.resolve(3);

						assert.ok(p1 instanceof Promise);
				});
				it("throws if 'this' is not a constructor", function () {
						var notAConstructor = 3;

						assert.throws(function () {
								Promise.resolve.call(notAConstructor, 4);
						}, TypeError);
				});

				it("can return a resolved promise", function (done) {
						var p1 = Promise.resolve(3);

						p1.then(function (resolved) {
								assert.equal(3, resolved);
						}).then(done).catch(done);
				});

				it("can return a pending promise", function (done) {
						var p1 = new Promise(function (resolve) {
								resolve("resolve");
						});

						var sequencer = [1];

						var p2 = Promise.resolve(p1).then(function (resolved) {
								assert.equal("resolve", resolved);

								sequencer.push(3);
								assert.deepEqual([1, 2, 3], sequencer);

						}).then(done).catch(done);

						sequencer.push(2);
				});

				it("can return a rejected promise", function (done) {
						var p1 = Promise.reject(3);
						var p2 = Promise.resolve(p1);

						p2.then(function (resolve) {
								throw new Error("unexpected resolve " + resolve);
						}, function (rejected) {
								assert.equal(3, rejected);
						}).then(done).catch(done);
				});

				// 25.4.4.5 steps 2 a & b:
				// 2. if IsPromise(x) is true
				//   a. Let constructor be the value of x's PromiseConstructor
				//   b. if SameValue(Constructor, C) is true, return x
				it("can pass through a subclassed promise if passed a subclassed promise");
		});
	}());

	// https://github.com/promises-es6/promises-es6/blob/master/tests/sequence.js
	(function() {
		"use strict";


		describe("Sequencing tests from promises-aplus/issue #61", function () {
				it("T1", function (done) {

						var resolveP1, rejectP2, sequencer = [];

						(new Promise(function (resolve, reject) {
								resolveP1 = resolve;
						})).then(function (msg) {
								sequencer.push(msg);
						}).then(function () {
								assert.deepEqual(["A", "B"], sequencer);
						}).then(done).catch(done);

						(new Promise(function (resolve, reject) {
								rejectP2 = reject;
						})).catch(function (msg) {
								sequencer.push(msg);
						});

						rejectP2("A");
						resolveP1("B");

				});

				it("T2a", function (done) {
						var resolveP1, rejectP2, p1, p2,
								sequencer = [];

						p1 = new Promise(function (resolve, reject) {
								resolveP1 = resolve;
						});
						p2 = new Promise(function (resolve, reject) {
								rejectP2 = reject;
						});

						rejectP2("B");
						resolveP1("A");

						p1.then(function (msg) {
								sequencer.push(msg);
						});

						p2.catch(function (msg) {
								sequencer.push(msg);
						}).then(function () {
								assert.deepEqual(["A", "B"], sequencer);
						}).then(done).catch(done);
				});

				it("T2b", function (done) {

						var resolveP1, rejectP2, p1, p2,
								sequencer = [];

						p1 = new Promise(function (resolve, reject) {
								resolveP1 = resolve;
						});
						p2 = new Promise(function (resolve, reject) {
								rejectP2 = reject;
						});

						rejectP2("B");
						resolveP1("A");

						setTimeout(function () {
								p1.then(function (msg) {
										sequencer.push(msg);
								});

								p2.catch(function (msg) {
										sequencer.push(msg);
								}).then(function () {
										assert.deepEqual(["A", "B"], sequencer);
								}).then(done).catch(done);
						}, 0);

				});
		});
	}());
}());
