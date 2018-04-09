// 10.1.1. Static Semantics: UTF16Encoding ( cp )
function UTF16Encoding(cp) { // eslint-disable-line no-unused-vars
	// 1. Assert: 0 ≤ cp ≤ 0x10FFFF.
	// 2. If cp ≤ 0xFFFF, return cp.
	if (cp <= 0xFFFF) {
		return cp;
	} else {
		// 3. Let cu1 be floor((cp - 0x10000) / 0x400) + 0xD800.
		var cu1 = Math.floor((cp - 0x10000) / 0x400) + 0xD800;
		// 4. Let cu2 be ((cp - 0x10000) modulo 0x400) + 0xDC00.
		var cu2 = ((cp - 0x10000) % 0x400) + 0xDC00;
		// 5. Return the code unit sequence consisting of cu1 followed by cu2.
		return [cu1, cu2];
	}
}
