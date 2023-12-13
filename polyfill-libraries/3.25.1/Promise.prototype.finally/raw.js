
// Promise.prototype.finally
(function () {
	// Based on https://github.com/tc39/proposal-promise-finally/blob/master/polyfill.js
	var then = Function.prototype.bind.call(Function.prototype.call, Promise.prototype.then);

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var speciesConstructor = function (O, defaultConstructor) {
		// 7.3.20.1 Assert: Type(O) is Object.
		if (!O || (typeof O !== 'object' && typeof O !== 'function')) {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		// 7.3.20.2 Let C be ? Get(O, "constructor").
		var C = O.constructor;
		// 7.3.20.3 If C is undefined, return defaultConstructor.
		if (typeof C === 'undefined') {
			return defaultConstructor;
		}
		// 7.3.20.4 If Type(C) is not Object, throw a TypeError exception
		if (!C || (typeof C !== 'object' && typeof C !== 'function')) {
			throw new TypeError('O.constructor is not an Object');
		}
		// 7.3.20.5 Let S be ? Get(C, @@species).
		var S = typeof Symbol === 'function' && typeof Symbol.species === 'symbol' ? C[Symbol.species] : undefined;
		// 7.3.20.6 If S is either undefined or null, return defaultConstructor.
		if (S === undefined || S === null) {
			return defaultConstructor;
		}
		// 7.3.20.7 If IsConstructor(S) is true, return S.
		if (typeof S === 'function' && S.prototype) {
			return S;
		}
		// 7.3.20.8 Throw a TypeError exception.
		throw new TypeError('no constructor found');
	};

	var getPromise = function (C, handler) {
		return new C(function (resolve) {
			resolve(handler());
		});
	};

	var promiseFinally = function (onFinally) {
		// 1.1 Let promise be the this value.
		var promise = this;
		var handler;

		if (typeof onFinally === 'function') {
			handler = onFinally;
		} else {
			handler = function () {};
		}

		// 1.2 If IsPromise(promise) is false, throw a TypeError exception.
		// N.B. IsPromise is called within Promise.prototype.then (25.4.5.3)
		var newPromise = then(
			promise, // throws if IsPromise(promise) is not true
			function (x) {
				return then(getPromise(C, handler), function () {
					return x;
				});
			},
			function (e) {
				return then(getPromise(C, handler), function () {
					throw e;
				});
			}
		);

		// 1.3 Let C be ? SpeciesConstructor(promise, %Promise%).
		var C = speciesConstructor(promise, Promise); // throws if SpeciesConstructor throws

		// 1.4 Let resultCapablity be ? NewPromiseCapablity(C).
		// 1.5 Return PerformPromiseFinally(promise, onFinaaly, resultCapability).
		return newPromise;
	};

	Promise.prototype['finally'] = promiseFinally;
}());
