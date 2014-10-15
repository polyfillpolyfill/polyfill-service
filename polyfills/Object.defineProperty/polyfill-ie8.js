// Object.defineProperty
(function (nativeDefineProperty) {
	Object.defineProperty = function defineProperty(object, property, descriptor) {
		delete descriptor.configurable;
		delete descriptor.enumerable;
		delete descriptor.writable;

		return nativeDefineProperty(object, property, descriptor);
	};
})(Object.defineProperty);
