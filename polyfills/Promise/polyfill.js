(function (global, setImmediate, slice, empty, PENDING, FULFILLED, REJECTED) {
	function resolvePromise(promise, state, value, defer) {
		if (promise.PromiseState === PENDING) {
			promise.PromiseState = state;
			promise.PromiseValue = value;
		}

		if (defer) {
			setImmediate(resolveChain, promise);
		} else {
			resolveChain(promise);
		}
	}

	function resolveChain(promise) {
		if (promise.PromiseState !== PENDING) {
			var
			chain = promise.PromiseChain,
			state = promise.PromiseState,
			value = promise.PromiseValue,
			index = -1,
			resolver;

			chain = chain.splice(0, chain.length);

			while (promise = chain[++index]) {
				resolver = promise.PromiseResolver[state];

				if (resolver instanceof Function) {
					try {
						resolvePromise(promise, FULFILLED, resolver(value));
					} catch (error) {
						resolvePromise(promise, REJECTED, error);
					}
				} else {
					resolvePromise(promise, state, value);
				}
			}
		}
	}

	function createResolver(promise, state) {
		return function (value) {
			resolvePromise(promise, state, value, true);
		};
	}

	// Promise
	function Promise(resolver) {
		if (!(resolver instanceof Function)) {
			throw new TypeError(resolver + ' is not a function');
		}

		var
		self = defineValues(this, {
			PromiseState: PENDING,
			PromiseValue: undefined,

			PromiseChain: [],
			PromiseResolver: {}
		}),
		promiseFulfill = createResolver(self, FULFILLED),
		promiseReject = createResolver(self, REJECTED);

		try {
			resolver(promiseFulfill, promiseReject);
		} catch (error) {
			promiseReject(error);
		}
	}

	// Promise.resolve
	function resolve(value) {
		if (value instanceof Promise) {
			return value;
		}

		var
		promise = new Promise(empty);

		if (value && value.then instanceof Function) {
			var
			promiseFulfill = createResolver(promise, FULFILLED),
			promiseReject = createResolver(promise, REJECTED);

			setImmediate(function () {
				try {
					value.then(promiseFulfill, promiseReject);
				} catch (error) {
					resolvePromise(promise, REJECTED, error);
				}
			});
		} else {
			promise.PromiseState = FULFILLED;
			promise.PromiseValue = value;
		}

		return promise;
	}

	// Promise.all
	function all(iterable) {
		var
		promise = new Promise(empty),
		array = iterable === undefined || iterable === null ? [] : typeof iterable === 'string' ? iterable.split('') : Object(iterable),
		index = -1,
		length = Math.min(Math.max(Number(array.length) || 0, 0), 9007199254740991),
		values = [];

		function createOnFulfilled(index) {
			return function (value) {
				values[index] = value;

				if (!--length) {
					resolvePromise(promise, FULFILLED, values);
				}
			};
		}

		if (length) {
			while (++index < length) {
				resolve(array[index]).then(createOnFulfilled(index));
			}
		} else {
			resolvePromise(promise, FULFILLED, []);
		}

		return promise;
	}

	// Promise.race
	function race(iterable) {
		var
		promise = new Promise(empty),
		array = iterable === undefined || iterable === null ? [] : typeof iterable === 'string' ? iterable.split('') : Object(iterable),
		index = -1,
		length = Math.min(Math.max(Number(array.length) || 0, 0), 9007199254740991);

		function createOnFulfilled() {
			return function (value) {
				resolvePromise(promise, FULFILLED, value);
			};
		}

		while (++index < length) {
			if (index in arraylike) {
				resolve(array[index]).then(createOnFulfilled());
			}	
		}

		return promise;
	}

	// Promise#then
	function then(onFulfilled, onRejected) {
		var
		promise = this,
		chained = new Promise(empty);

		promise.PromiseChain.push(chained);

		chained.PromiseResolver[FULFILLED] = onFulfilled;
		chained.PromiseResolver[REJECTED] = onRejected;

		setImmediate(resolveChain, promise);

		return chained;
	}

	// Promise#catch
	function catchthen(onRejected) {
		return this.then(undefined, onRejected);
	}

	function defineValues(object, properties) {
		for (var key in properties) {
			Object.defineProperty(object, key, {
				configurable: true,
				value: properties[key],
				writable: true
			});
		}

		return object;
	}

	defineValues(Promise, {
		all: all,
		race: race,
		resolve: resolve
	});

	defineValues(Promise.prototype, {
		'catch': catchthen,
		then: then
	});

	defineValues(global, {
		Promise: Promise
	});

	setImmediate = setImmediate || function (func) {
		var args = slice.call(arguments, 1);

		return setTimeout(function () {
			func.apply(null, args);
		});
	};
})(this, window.setImmediate, Array.prototype.slice, function () {}, 'pending', 'fulfilled', 'rejected');
