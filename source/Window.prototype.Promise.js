(function () {
	'use strict';

	// states of a promise
	var STATE = {
		PENDING: 'pending',
		REJECTED: 'rejected',
		RESOLVED: 'resolved'
	};

	function forEach(array, callback, scope, splice) {
		for (var all = [].concat(array), index = 0, length = all.length; index < length; ++index) {
			if (splice) {
				array.splice(index, 1);
			}

			callback.call(scope, all[index], index, array, scope);
		}
	}

	function Promise(onInit) {
		var promise = this, resolver = new PromiseResolver();

		// create a unique instance of these methods
		promise.then = function then() {
			return Promise.prototype.then.apply(promise, arguments);
		};
		resolver.resolve = function resolve() {
			return PromiseResolver.prototype.resolve.apply(resolver, arguments);
		};

		// hide the state, the callback array, the resolver, and the promise within the unique instances
		promise.then.state = STATE.PENDING;
		promise.then[STATE.RESOLVED] = [];
		promise.then[STATE.REJECTED] = [];

		promise.then.resolver = resolver;

		resolver.resolve.promise = promise;

		// initialize the promise
		if (typeof onInit === 'function') {
			onInit.call(promise, resolver);
		}
	}

	Promise.prototype = {
		'constructor': Promise,
		'then': function (onResolved, onRejected) {
			var promise = this;

			// initalize the next promise
			promise.then.next = new Promise();

			// add a resolve callback to the resolved callback array
			if (typeof onResolved === 'function') {
				promise.then[STATE.RESOLVED].push(onResolved);
			}

			// add a reject callback to the rejected callback array
			if (typeof onRejected === 'function') {
				promise.then[STATE.REJECTED].push(onRejected);
			}

			// if the promise is already resolved
			if (promise.then.state === STATE.RESOLVED) {
				// call the resolve method
				promise.then.resolver.resolve.call(promise.then.resolver, promise.then.value);
			}

			// if the promise is already rejected
			if (promise.then.state === STATE.REJECTED) {
				// call the reject method
				promise.then.resolver.reject.call(promise.then.resolver, promise.then.value);
			}

			// return next promise
			return promise.then.next;
		},
		'catch': function (onRejected) {
			return this.then(null, onRejected);
		}
	};

	function PromiseResolver() {}

	PromiseResolver.prototype = {
		'constructor': PromiseResolver,
		'resolve': function (value) {
			var resolver = this, promise = resolver.resolve.promise;

			// set the value and state of the promise
			promise.then.value = value;
			promise.then.state = STATE.RESOLVED;

			// call each resolved callback
			forEach(promise.then[STATE.RESOLVED], timeout, promise, true);
		},
		'reject': function (value) {
			var resolver = this, promise = resolver.resolve.promise;

			// set value and state
			promise.then.value = value;
			promise.then.state = STATE.REJECTED;

			// call each rejected callback
			forEach(promise.then[STATE.REJECTED], timeout, promise, true);
		}
	};

	function timeout(onEach) {
		var promise = arguments[3];

		// thread this callback
		setTimeout(function () {
			// get the value returned by the callback
			var returnValue = onEach.call(promise, promise.then.value);

			// if the value is a promise
			if (returnValue instanceof Promise) {
				// forward all of the promises events to next promise
				forEach(promise.then.next.then[STATE.RESOLVED], returnValue.then, returnValue);
				forEach(promise.then.next.then[STATE.REJECTED], returnValue['catch'], returnValue);

				// reassign the next promise
				returnValue.then.next = promise.then.next.then.next;
			}
		}, 0);
	}

	// automatically create a resolved promise
	Promise.resolve = function (value) {
		return new Promise(function (resolver) {
			resolver.resolve(value);
		});
	};

	Window.prototype.Promise = Promise;
})();
