'Map' in this && (function() {
	try {
		return (new Map([[1,1], [2,2]])).size === 2;
	} catch (e) {
		return false;
	}
}())
