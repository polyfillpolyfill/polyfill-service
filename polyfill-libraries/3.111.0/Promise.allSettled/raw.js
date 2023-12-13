
// Promise.allSettled
/* global CreateMethodProperty, IterableToList, Promise, Type */
(function () {
	// Based on https://github.com/es-shims/Promise.allSettled/blob/main/implementation.js

	CreateMethodProperty(Promise, 'allSettled', function allSettled (iterable) {
		var C = this;
		if (Type(C) !== 'object') {
			throw new TypeError('`this` value must be an object');
		}

		var arr;
		if (Array.isArray(iterable)) {
			arr = iterable;
		} else {
			try {
				arr = IterableToList(iterable);
			} catch (_error) {
				return Promise.reject(new TypeError('Argument of Promise.allSettled is not iterable'));
			}
		}

		var promises = arr.map(function (promise) {
			var onFulfill = function (value) {
				return { status: 'fulfilled', value: value };
			};
			var onReject = function (reason) {
				return { status: 'rejected', reason: reason };
			};
			var itemPromise = C.resolve(promise);
			try {
				return itemPromise.then(onFulfill, onReject);
			} catch (e) {
				return C.reject(e);
			}
		});

		return C.all(promises);
	});
}());
