/* global CreateMethodProperty */
// 20.2.2.22. Math.log10 ( x )
CreateMethodProperty(Math, 'log10', function log10(x) {
	return Math.log(x) / Math.LN10;
});
