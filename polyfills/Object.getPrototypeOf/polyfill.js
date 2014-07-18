// Object.getPrototypeOf
Object.getPrototypeOf = function getPrototypeOf(object) {
	return object && object.constructor && object.constructor.prototype || null;
};
