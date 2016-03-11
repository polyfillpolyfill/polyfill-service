(function (Object, Symbol) {
	Object.defineProperty(Symbol, 'toPrimitive', {value: Symbol('toPrimitive')});
}(Object, Symbol));
