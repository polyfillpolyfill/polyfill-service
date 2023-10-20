
// Number.isSafeInteger
Object.defineProperty(Number, 'isSafeInteger', {
	enumerable: false,
	configurable: true,
	writable: true,
	value: function (number) {
		if (typeof number !== 'number') {
			return false;
		}
		if (isNaN(number) || number === +Infinity || number === -Infinity) {
			return false;
		}
		var integer = parseInt(number, 10);
		if (integer !== number) return false;
		if (Math.abs(integer) <= (Math.pow(2, 53) - 1)) {
			return true;
		}
		return false;
	}
});
