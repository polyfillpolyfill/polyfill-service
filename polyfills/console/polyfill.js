(function(global) {

	// Grab a referecnce to the console or assign one if it does not exist.
	var console = global.console || (global.console = {});

	function noop () {}

	// This is based off of angular's internal log factory.
	function factory(type) {

		var fn = console[type] || console.log || noop;
		var hasApply = false;

		// Reading `fn.apply` throws in IE11  in IE8 mode. This is because
		// `typeof console.log === "object"` in IE8
		try {
			hasApply = !!fn.apply;
		} catch (e) { /* do nothing */ }

		// Check if we can safely use `fn.apply`.
		if (hasApply) {
			return function () {
				fn.apply(console, arguments);
			};
		}

		// If we are here it means that `console[type]` does not have an
		// `apply` method. So instead we log out the first 3 arguments.
		return function (arg1, arg2, arg3) {
			fn(arg1, arg2, arg3);
		};

	}

	// The properties to polyfill.
	var properties = [
		'memory'
	];

	// The methods to polyfill.
	var methods = [
		'log',
		'assert',
		'cd',
		'clear',
		'count',
		'debug',
		'dir',
		'error',
		'exception',
		'group',
		'groupCollapsed',
		'groupEnd',
		'info',
		'markTimeline',
		'profile',
		'profileEnd',
		'profiles',
		'show',
		'table',
		'time',
		'timeEnd',
		'timeStamp',
		'timeline',
		'timelineEnd',
		'trace',
		'warn'
	];

	var index, method, property;
	var empty = {};

	// Polyfill the properties.
	for (index = 0; index < properties.length; index++) {
		property = properties[index];
		if (!(property in console)) {
			console[property] = empty;
		}
	}

	// Polyfill the methods.
	for (index = 0; index < methods.length; index++) {
		method = methods[index];
		if (typeof console[method] !== 'function') {
			console[method] = factory(method);
		}
	}

})(this);
