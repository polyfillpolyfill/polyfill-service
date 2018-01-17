// 22.1.3.6. Array.prototype.fill ( value [ , start [ , end ] ] )
CreateMethodProperty(Array.prototype, 'fill', function fill(value /* [ , start [ , end ] ] */) {
	var start = arguments[1];
	var end = arguments[2];
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Let len be ? ToLength(? Get(O, "length")).
	var len = ToLength(Get(O, "length"));
	// 3. Let relativeStart be ? ToInteger(start).
	var relativeStart = ToInteger(start);
	// 4. If relativeStart < 0, let k be max((len + relativeStart), 0); else let k be min(relativeStart, len)
	var k = relativeStart < 0 ? Math.max((len + relativeStart), 0) : Math.min(relativeStart, len);
	// 5. If end is undefined, let relativeEnd be len; else let relativeEnd be ? ToInteger(end).
	var relativeEnd = end === undefined ? len : ToInteger(end);
	// 6. If relativeEnd < 0, let final be max((len + relativeEnd), 0); else let final be min(relativeEnd, len).
	var final = relativeEnd < 0 ? Math.max((len + relativeEnd), 0) : Math.min(relativeEnd, len);
	// 7. Repeat, while k < final
	while (k < final) {
		// a. Let Pk be ! ToString(k).
		var Pk = ToString(k);
		// b. Perform ? Set(O, Pk, value, true).
		O[Pk] = value;
		// c. Increase k by 1.
		k = k + 1;
	}
	// 8. Return O.
	return O;
});
