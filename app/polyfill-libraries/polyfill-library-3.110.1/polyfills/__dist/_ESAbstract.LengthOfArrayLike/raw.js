
// _ESAbstract.LengthOfArrayLike
/* global Get, ToLength */
// 7.3.19. LengthOfArrayLike ( obj )
function LengthOfArrayLike(obj) { // eslint-disable-line no-unused-vars
	// 1. Return ℝ(? ToLength(? Get(obj, "length"))).
	return ToLength(Get(obj, 'length'));
}
