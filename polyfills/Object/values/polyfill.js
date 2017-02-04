Object.values = function values(object) {
	return Object.keys(object).map(function (key) {
		return object[key];
	});
};
