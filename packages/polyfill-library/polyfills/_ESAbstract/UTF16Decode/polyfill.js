// 10.1.2. Static Semantics: UTF16Decode( lead, trail )
function UTF16Decode(lead, trail) { // eslint-disable-line no-unused-vars
	// 1. Assert: 0xD800 ≤ lead ≤ 0xDBFF and 0xDC00 ≤ trail ≤ 0xDFFF.
	// 2. Let cp be (lead - 0xD800) × 0x400 + (trail - 0xDC00) + 0x10000.
	var cp = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
	// 3. Return the code point cp.
	return cp;
}
