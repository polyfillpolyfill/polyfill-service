// Object.defineProperty
(function (defineProperty) {
	Object.defineProperty = function defineProperty(object, property, descriptor) {
		delete descriptor.configurable;
		delete descriptor.enumerable;
		delete descriptor.writable;

		return defineProperty(object, property, descriptor);
	};
})(Object.defineProperty);
