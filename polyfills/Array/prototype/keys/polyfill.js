(function () {
	var ArrayIterator = require('es6-iterator/array');
	Array.prototype.keys = function keys () {
	  return new ArrayIterator(this, 'key');
	};
})();

