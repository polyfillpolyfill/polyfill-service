/* global CreateMethodProperty */
CreateMethodProperty(Math, 'trunc', function trunc(x) {
	return x < 0 ? Math.ceil(x) : Math.floor(x);
});
