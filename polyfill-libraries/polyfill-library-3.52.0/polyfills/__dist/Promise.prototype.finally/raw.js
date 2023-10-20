
// Promise.prototype.finally
/* global CreateMethodProperty, IsCallable, SpeciesConstructor, Type, Promise */
(function () {
	// Based on https://github.com/tc39/proposal-promise-finally/blob/master/polyfill.js
	var then = Function.prototype.bind.call(Function.prototype.call, Promise.prototype.then);

	var getPromise = function (C, handler) {
		return new C(function (resolve) {
			resolve(handler());
		});
	};
	// 1. Promise.prototype.finally ( onFinally )
	CreateMethodProperty(Promise.prototype, 'finally', function (onFinally) {
		// 1. Let promise be the this value.
		var promise = this;
		// 2. If Type(promise) is not Object, throw a TypeError exception.
		if (Type(promise) !== 'object') {
			throw new TypeError('Method %PromisePrototype%.finally called on incompatible receiver ' + Object.prototype.toString.call(promise));
		}
		// 3. Let C be ? SpeciesConstructor(promise, %Promise%).
		var C = SpeciesConstructor(promise, Promise);
		// 4. Assert: IsConstructor(C) is true.
		// 5. If IsCallable(onFinally) is false,
		if (IsCallable(onFinally) === false) {
			// a. Let thenFinally be onFinally.
			var thenFinally = onFinally;
			// b. Let catchFinally be onFinally.
			var catchFinally = onFinally;
			// 6. Else,
		} else {
			// a. Let thenFinally be a new built-in function object as defined in ThenFinally Function.
			thenFinally = function (x) {
				return then(getPromise(C, onFinally), function () {
					return x;
				});
			};
			// b. Let catchFinally be a new built-in function object as defined in CatchFinally Function.
			catchFinally = function (e) {
				return then(getPromise(C, onFinally), function () {
					throw e;
				});
			};
			// c. Set thenFinally and catchFinally's [[Constructor]] internal slots to C.
			// d. Set thenFinally and catchFinally's [[OnFinally]] internal slots to onFinally.
		}
		// 7. Return ? Invoke(promise, "then", « thenFinally, catchFinally »).
		return then(promise, thenFinally, catchFinally);
	});
}());
