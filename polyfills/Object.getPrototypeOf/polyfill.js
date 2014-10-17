Object.getPrototypeOf = function getPrototypeOf(object) {
	if (object !== Object(object)) {
		throw new TypeError('Object.getPrototypeOf called on non-object');
	}

	return object.constructor ? object.constructor.prototype : null;
};
