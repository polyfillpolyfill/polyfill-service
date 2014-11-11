(function (global, PENDING, FULFILLED, REJECTED) {
	function Promise(resolver) {
		if (!(resolver instanceof Function)) {
			throw new TypeError('Promise resolver ' + resolver + ' is not a function');
		}

		var
		self = defineValues(this, {
			PromiseChain: [],
			PromiseResolver: {},
			PromiseStatus: PENDING,
			PromiseValue: undefined
		}),
		resolve = getResolveFunction(self, FULFILLED),
		reject = getResolveFunction(self, REJECTED);

		try {
			resolver(resolve, reject);
		} catch (error) {
			reject(error);
		}
	}

	function getResolveFunction(promise, status) {
		return function (value) {
			var PromiseStatus = promise.PromiseStatus;

			if (PromiseStatus === PENDING) {
				promise.PromiseStatus = status;
				promise.PromiseValue = value;
			}

			setTimeout(function () {
				resolveChain(promise);
			});
		};
	}

	function resolveChain(promise) {
		if (promise.PromiseStatus !== PENDING) {
			var
			chain = promise.PromiseChain,
			status = promise.PromiseStatus,
			value = promise.PromiseValue,
			index = -1,
			resolver;

			chain = chain.splice(0, chain.length);

			while (chained = chain[++index]) {
				resolver = chained.PromiseResolver[status];

				if (resolver instanceof Function) {
					try {
						chained.PromiseStatus = FULFILLED;
						chained.PromiseValue = resolver(value);
					} catch (error) {
						chained.PromiseStatus = REJECTED;
						chained.PromiseValue = error;
					}
				} else {
					chained.PromiseStatus = status;
					chained.PromiseValue = value;
				}

				resolveChain(chained);
			}
		}
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
		all: function all(iterable) {
			var
			promise = new Promise(function () {}),
			array = Array.prototype.slice.call(iterable),
			length = array.length,
			index = -1,
			countdown = length,
			values = new Array(length);

			function getOnFulfill(index) {
				return function (value) {
					values[index] = value;

					if (!--countdown) {
						if (promise.PromiseStatus === PENDING) {
							promise.PromiseStatus = REJECTED;
							promise.PromiseValue = error;

							resolveChain(promise);
						}
					}
				};
			}

			while (++index < length) {
				(array[index] instanceof Promise ? array[index] : Promise.resolve(array[index])).then(getOnFulfill(index));
			}
		},
		resolve: function resolve(value) {
			var
			promise = new Promise(function () {});

			if (value instanceof Promise) {
				value.PromiseChain.push(promise);

				resolveChain(value);
			} else if (value && value.then instanceof Function) {
				var
				promiseResolve = getResolveFunction(promise, FULFILLED),
				promiseReject = getResolveFunction(promise, FULFILLED);

				try {
					value.then(promiseResolve, promiseReject);
				} catch (error) {
					if (promise.PromiseStatus === PENDING) {
						promise.PromiseStatus = REJECTED;
						promise.PromiseValue = error;

						resolveChain(promise);
					}
				}
			} else {
				promise.PromiseStatus = FULFILLED;
				promise.PromiseValue = value;				
			}

			return promise;
		}
	});

	defineValues(Promise.prototype, {
		'catch': function then(onRejected) {
			return this.then(undefined, onRejected);
		},
		then: function then(onFulfilled, onRejected) {
			var
			promise = this,
			chained = new Promise(function () {});

			promise.PromiseChain.push(chained);

			chained.PromiseResolver[FULFILLED] = onFulfilled;
			chained.PromiseResolver[REJECTED] = onRejected;

			setTimeout(function () {
				resolveChain(promise);
			});

			return chained;
		}
	});

	defineValues(global, {
		Promise: Promise
	});
})(this, 'pending', 'fulfilled', 'rejected');
