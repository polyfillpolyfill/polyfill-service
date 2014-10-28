Object.defineProperty = function defineProperty(object, property, descriptor) {
	// handle object
	if (object === null || typeof object !== 'object') {
		throw new TypeError('Object must be an object');
	}

	// handle descriptor
	if (descriptor === null || typeof descriptor !== 'object') {
		throw new TypeError('Descriptor must be an object');
	}

	var
	propertyString = String(property),
	Element = window.Element || {};

	// handle descriptor.get
	if ('get' in descriptor) {
		object[propertyString] = object === Element.prototype ? new Element.__getter__(descriptor.get) : descriptor.get.call(object);
	}
	// handle descriptor.value
	else {
		object[propertyString] = descriptor.value;
	}

	// handle descriptor.set
	if ('set' in descriptor && object.constructor === Element) {
		object.attachEvent('onpropertychange', function callee(event) {
			object.detachEvent('onpropertychange', callee);

			if (event.propertyName === propertyString) {
				object[propertyString] = descriptor.set.call(object, object[propertyString]);
			}

			object.attachEvent('onpropertychange', callee);
		});
	}

	// return object
	return object;
};
