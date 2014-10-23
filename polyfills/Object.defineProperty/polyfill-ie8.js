(function (nativeDefineProperty) {
	Object.defineProperty = function defineProperty(object, property, descriptor) {
		if (
			object === Window.prototype || object instanceof Window ||
			object === HTMLDocument.prototype || object instanceof HTMLDocument ||
			object === Element.prototype || object instanceof Element
		) {
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
