
// Math.tanh
/* global CreateMethodProperty */
// 20.2.2.34. Math.tanh ( x )
CreateMethodProperty(Math, 'tanh', function tanh(x) {
	var y;

	return x === Infinity ? 1 : x === -Infinity ? -1 : (y = Math.exp(2 * x), (y - 1) / (y + 1));
});
