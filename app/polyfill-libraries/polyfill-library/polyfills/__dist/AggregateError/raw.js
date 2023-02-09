
// AggregateError
/* global CreateDataPropertyOrThrow, IterableToList */
(function () {
	function AggregateError (errors, message) {
		var temp = typeof message === 'undefined' ? new Error() : new Error(message);

		CreateDataPropertyOrThrow(this, 'name', 'AggregateError');
		CreateDataPropertyOrThrow(this, 'message', temp.message);
		CreateDataPropertyOrThrow(this, 'stack', temp.stack);

		var errorsList;
		if (Array.isArray(errors)) {
			errorsList = errors.slice();
		} else {
			try {
				errorsList = IterableToList(errors);
			} catch (_error) {
				throw new TypeError('Argument is not iterable');
			}
		}

		CreateDataPropertyOrThrow(this, 'errors', errorsList);
	}

	AggregateError.prototype = Object.create(Error.prototype);
	AggregateError.prototype.constructor = AggregateError;

	self.AggregateError = AggregateError;
})();
