/* global CreateMethodProperty, ToUint32 */
// 20.2.2.19. Math.imul ( x, y )
CreateMethodProperty(Math, 'imul', function imul(x, y) {
	// 1. Let a be ToUint32(x).
	var a = ToUint32(x);
	// 2. Let b be ToUint32(y).
	var b = ToUint32(y);
	// 3. Let product be (a × b) modulo 2^32.
	var product = (a * b) % Math.pow(2, 32);
	// 4. If product ≥ 2^31, return product - 2^32; otherwise return product.
	return (product >= Math.pow(2, 31)) ? product - Math.pow(2, 32) : product;
});
