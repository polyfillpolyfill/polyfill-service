// Array.prototype.reduceRight
Array.prototype.reduceRight = function reduceRight(callback, initialValue) {
	var array = this, previousValue = initialValue || 0;

	for (var index = array.length - 1; index > -1; --index) {
		previousValue = callback.call(window, previousValue, array[index], index, array);
	}

	return previousValue;
};
