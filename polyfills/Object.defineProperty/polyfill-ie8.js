(function (nativeDefineProperty) {
	Object.defineProperty = function defineProperty(object, property, descriptor) {
		if (object instanceof Window || object instanceof HTMLDocument || object instanceof Element) {
			delete descriptor.configurable;
			delete descriptor.enumerable;
			delete descriptor.writable;

			return nativeDefineProperty(object, property, descriptor);
		} else {
			if ('value' in descriptor) {
				object[property] = descriptor.value;
			} else if ('get' in descriptor) {
				object[property] = descriptor.get.call(object);
			}

			return object;
		}
	};
})(Object.defineProperty);
