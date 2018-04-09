// 20.2.2.23. Math.log2 ( x )
CreateMethodProperty(Math, 'log2', function log2(x) {
	return Math.log(x) / Math.LN2;
});
