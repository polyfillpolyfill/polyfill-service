Object.defineProperty = function defineProperty(object, property, descriptor) {
	if (object !== Object(object)) {
		throw new TypeError('Object.defineProperty called on non-object');
	}

	var propertyValue = object[property];

	function onPropertyChange(event) {
		if (event.propertyName == property) {
			// temporarily remove the event so it doesn't fire again and create a loop
			object.detachEvent('onpropertychange', onPropertyChange);

			// set the value using the setter
			if (descriptor.set) {
				propertyValue = descriptor.set.call(object, object[property]);
			}

			// restore the getter
			object[property] = String(propertyValue);

			object[property].toString = function () {
				return descriptor.get.call(object);
			};

			// restore the event
			object.attachEvent('onpropertychange', onPropertyChange);
		}
	}

	// assign the getter
	object[property] = String(propertyValue);

	object[property].toString = function () {
		return descriptor.get.call(object);
	};

	// assign the event
	object.attachEvent('onpropertychange', onPropertyChange);

	// return the object
	return object;
};
