(function () {
	var toString = Object.prototype.toString;
	Object.defineProperty(Symbol, 'toStringTag', {value: Symbol('toStringTag')});
	var descriptor = Object.getOwnPropertyDescriptor(Object.prototype, 'toString');
	descriptor.value = function () {
		var str = toString.call(this);
		var tst = this[Symbol.toStringTag];
		return typeof tst === 'undefined' ? str : ('[object ' + tst + ']');
	};
	Object.defineProperty(Object.prototype, 'toString', descriptor);
}());
