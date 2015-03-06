(function (FUNCTION, splice, Empty) {
	FUNCTION.bind = FUNCTION.bind || function bind(scope) {
		var
		callback = this,
		args = splice.call(arguments, 1),
		arity = [],
		index = 0,
		bound, length;

		// throw if callback is not a function
		if (!(callback instanceof Function)) {
			throw new TypeError(callback + ' is not a function');
		}

		// create bound arity from callback and arguments
		length = callback.length - args.length;

		while (index < length) {
			arity.push('$' + (++index));
		}

		// create bound function
		bound = Function('_', 'return function(' + arity + '){return _.apply(this,arguments)}')(function () {
			var
			isNew = this instanceof bound,
			result = callback.apply(isNew ? this : scope, args.concat(splice.call(arguments, 0)));

			return !isNew || Object(result) !== result ? result : this;
		});

		// conditionally inherit callback prototype to bound
		if (callback.prototype) {
			Empty.prototype = callback.prototype;

			bound.prototype = new Empty();

			Empty.prototype = null;
		}

		return bound;
	};
})(Function.prototype, Array.prototype.splice, function () {});
