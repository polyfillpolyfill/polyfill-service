(function () {
	var ArrayIterator = require('es6-iterator/array')
	Array.protoype.entries = function entries () {
	  return new ArrayIterator(this, 'key+value');
	};
})();
