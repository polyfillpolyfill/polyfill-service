
// String.prototype.codePointAt
(function () {
	function toInteger(n) {
		// 7.1.4.1 Let number be ? ToNumber(argument).
		n = Number(n);

		// 7.1.4.2 If number is NaN, return +0.
		if (isNaN(n)) {
			return 0;
		}

		// 7.1.4.3 If number is +0, -0, +∞, or -∞, return number.
		if (n === 0 || n === Infinity || n === -Infinity) {
			return n;
		}

		// 7.1.4.4 Return the number value that is the same sign as number and whose magnitude is floor(abs(number)).
		return ((n < 0) ? -1 : 1) * Math.floor(Math.abs(n));
	}

	Object.defineProperty(String.prototype, 'codePointAt', {
		value: function (pos) {
			// 21.1.3.3.1 Let O be ? RequireObjectCoercible(this value).
			var o;
			if (this === null || this === undefined) {
				throw new TypeError('Cannot call String.prototype.codePointAt on ' + this);
			} else {
				o = this;
			}

			// 21.1.3.3.2 Let S be ? ToString(O).
			var s = String(o);

			// 21.1.3.3.3 Let position be ? ToInteger(pos).
			var position = toInteger(pos);

			// 21.1.3.3.4 Let size be the length of S.
			var size = s.length;

			// 21.1.3.3.5 If position < 0 or position ≥ size, return undefined.
			if (position < 0 || position >= size) return undefined;

			// 21.1.3.3.6 Let first be the numeric value of the code unit at index position within the String S.
			var first = s.charCodeAt(position);

			// 21.1.3.3.7 If first < 0xD800 or first > 0xDBFF or position+1 = size, return first.
			if (first < 0xD800 || first > 0xDBFF || position + 1 === size) return first;

			// 21.1.3.3.8 Let second be the numeric value of the code unit at index position+1 within the String S.
			var second = s.charCodeAt(position + 1);

			// 21.1.3.3.9 If second < 0xDC00 or second > 0xDFFF, return first.
			if (second < 0xDC00 || second > 0xDFFF) return first;

			// 21.1.3.3.10 Return UTF16Decode(first, second).
			return ((first - 0xD800) * 1024) + (second - 0xDC00) + 0x10000;
		}
	});
}());
