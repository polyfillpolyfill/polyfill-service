
// _ESAbstract.TrimString
/* eslint-disable no-control-regex */
/* global RequireObjectCoercible, ToString */
// TrimString ( string, where )
function TrimString(string, where) { // eslint-disable-line no-unused-vars
	// 1. Let str be ? RequireObjectCoercible(string).
	var str = RequireObjectCoercible(string);
	// 2. Let S be ? ToString(str).
	var S = ToString(str);
	// 3. If where is "start", let T be a String value that is a copy of S with leading white space removed.
	// The definition of white space is the union of WhiteSpace and LineTerminator. When determining whether a Unicode code point is in Unicode general category “Space_Separator” (“Zs”), code unit sequences are interpreted as UTF-16 encoded code point sequences as specified in 6.1.4.
	var whitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/.source;
	if (where === 'start') {
		var T = String.prototype.replace.call(S, new RegExp('^' + whitespace, 'g'), '');
		// 4. Else if where is "end", let T be a String value that is a copy of S with trailing white space removed.
	} else if (where === "end") {
		T = String.prototype.replace.call(S, new RegExp(whitespace + '$', 'g'), '');
		// 5. Else,
	} else {
		// a. Assert: where is "start+end".
		// b. Let T be a String value that is a copy of S with both leading and trailing white space removed.
		T = String.prototype.replace.call(S, new RegExp('^' + whitespace + '|' + whitespace + '$', 'g'), '');
	}
	// 6. Return T.
	return T;
}
