(function (Function, Object) {
	// Adapted from
	// https://github.com/zloirock/core-js/blob/167408c8467f2ee7934968fdf73e3a3f4eab7567/modules/es6.reflect.construct.js

	function aFunction(item) {
		if (typeof item !== 'function') {
			throw new TypeError(item + ' is not a function');
		}

		return item;
	}

	function isObject(it) {
		return typeof it === 'object' ? it !== null : typeof it === 'function';
	}

	Object.defineProperty(Reflect, 'construct', {
		value: function (Target, args) {
			aFunction(Target);

			if (!isObject(args)) {
				throw new TypeError('Argument list is not array-like.');
			}

			var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);

			if (Target === newTarget) {
				// w/o altered newTarget, optimization for 0-4 arguments
				switch (args.length) {
					case 0:
						return new Target();
					case 1:
						return new Target(args[0]);
					case 2:
						return new Target(args[0], args[1]);
					case 3:
						return new Target(args[0], args[1], args[2]);
					case 4:
						return new Target(args[0], args[1], args[2], args[3]);
					default:
						// w/o altered newTarget, lot of arguments case
						var $args = [null];
						$args.push.apply($args, args);

						return new (Function.bind.apply(Target, $args))();
				}
			} else {
				// with altered newTarget
				var proto = newTarget.prototype;
				var instance = Object.create(isObject(proto) ? proto : Object.prototype);
				var result = Function.apply.call(Target, instance, args);

				return isObject(result) ? result : instance;
			}
		},
		configurable: true,
		writable: true
	});
})(Function, Object);
