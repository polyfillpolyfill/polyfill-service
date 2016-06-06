'use strict';
(function () {
	var polyfill = require('function.prototype.name/polyfill')();
	var fnCall = Function.protype.bind.call(Function.call);
	Object.defineProperty(Function.prototype, 'name', {
		configurable: true,
		enumerable: false,
		get: function () {
			var name = fnCall(polyfill, this);
			Object.defineProperty(this, 'name', {
				configurable: true,
				enumerable: false,
				value: name,
				writable: false
			});
			return name;
		}
	});
})();
