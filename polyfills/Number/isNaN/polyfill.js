// 20.1.2.4. Number.isNaN ( number )
CreateMethodProperty(Number, 'isNaN', function (number) {
	// 1. If Type(number) is not Number, return false.
	if (Type(number) !== 'number') {
		return false;
	}
	// 2. If number is NaN, return true.
	if (isNaN(number)) {
		return true;
	}
	// 3. Otherwise, return false.
	return false;
});
