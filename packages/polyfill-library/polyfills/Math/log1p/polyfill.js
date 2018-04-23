/* global CreateMethodProperty */
// 20.2.2.21. Math.log1p ( x )
CreateMethodProperty(Math, 'log1p', function log1p(x) {
	return Math.log(1 + x);
});
