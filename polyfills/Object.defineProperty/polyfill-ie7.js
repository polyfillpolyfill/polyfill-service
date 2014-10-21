Object.defineProperty = function defineProperty(object, property, descriptor) {
	if (object !== Object(object)) {
		throw new TypeError('Object.defineProperty called on non-object');
	}

	if ('value' in descriptor) {
		object[property] = descriptor.value;
	} else {
		if ('get' in descriptor) {
			object[property] = descriptor.get.call(object);
		}

		if ('set' in descriptor && 'attachEvent' in object) {
			object.attachEvent('onpropertychange', function (event) {
				var
				callee = arguments.callee;

				object.detachEvent('onpropertychange', callee);

				if (event.propertyName === property) {
					object[property] = descriptor.set.call(object, object[property]);
				}

				object.attachEvent('onpropertychange', callee);
			});
		}
	}

	return object;
};
