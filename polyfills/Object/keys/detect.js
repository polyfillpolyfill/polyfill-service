'keys' in Object && (function () {
	// Safari 5.0 bug where Object.keys doesn't work with arguments
	return (Object.keys(arguments)).length === 2;
}(1, 2)) && (function () {
	try {
		// In ES6 Object.keys works on all object except `null` and `undefined`.
		Object.keys('');
		return true;
	} catch (e) {
		return false;
	}
}())
