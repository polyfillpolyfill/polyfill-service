'copyWithin' in Array.prototype && (function () {
	try {
		var Parent = function Parent() {};
		Parent.prototype[0] = 'foo';
		var sparse = new Parent();
		sparse[1] = 1;
		sparse[2] = 2;
		sparse.length = 3;
		var result = Array.prototype.copyWithin.call(sparse, 1, 0);
		if (result['0'] && !Object.prototype.hasOwnProperty.call(result, '0') && Object.prototype.hasOwnProperty.call(result, '1') && result[0] === 'foo' && result[1] === 'foo' && result[2] === 1 && result.length === 3) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		return false;
	}
}())
