/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Number.parseInt);
});

it('has correct arity', function () {
	proclaim.arity(Number.parseInt, 2);
});

it('has correct name', function () {
	proclaim.hasName(Number.parseInt, 'parseInt');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Number, 'parseInt');
});

it('returns NaN with NaN values', function () {
	proclaim.equal(Number.parseInt('Hello', 8).toString(), NaN.toString());
	proclaim.equal(Number.parseInt('546', 2).toString(), NaN.toString());
});

it('returns 15 for valid numbers and non-number data types', function () {
	proclaim.equal(Number.parseInt(15, 10), 15);
	proclaim.equal(Number.parseInt("15", 10), 15);
  proclaim.equal(Number.parseInt("15"), 15);
  proclaim.equal(Number.parseInt("15px"), 15);
  proclaim.equal(Number.parseInt("15.2"), 15);
  proclaim.equal(Number.parseInt("0xf"), 15);
});
it('works as expected', function () {
	// TODO: Make this test pass
	// proclaim.equal(Number.parseInt, parseInt);
	proclaim.equal(Number.parseInt('10', 2), 2);
	proclaim.equal(Number.parseInt('10', 3), 3);
	proclaim.equal(Number.parseInt('10', 4), 4);
	proclaim.equal(Number.parseInt('10', 5), 5);
	proclaim.equal(Number.parseInt('10', 6), 6);
	proclaim.equal(Number.parseInt('10', 7), 7);
	proclaim.equal(Number.parseInt('10', 8), 8);
	proclaim.equal(Number.parseInt('10', 9), 9);
	proclaim.equal(Number.parseInt('10', 10), 10);
	proclaim.equal(Number.parseInt('10', 11), 11);
	proclaim.equal(Number.parseInt('10', 12), 12);
	proclaim.equal(Number.parseInt('10', 13), 13);
	proclaim.equal(Number.parseInt('10', 14), 14);
	proclaim.equal(Number.parseInt('10', 15), 15);
	proclaim.equal(Number.parseInt('10', 16), 16);
	proclaim.equal(Number.parseInt('10', 17), 17);
	proclaim.equal(Number.parseInt('10', 18), 18);
	proclaim.equal(Number.parseInt('10', 19), 19);
	proclaim.equal(Number.parseInt('10', 20), 20);
	proclaim.equal(Number.parseInt('10', 21), 21);
	proclaim.equal(Number.parseInt('10', 22), 22);
	proclaim.equal(Number.parseInt('10', 23), 23);
	proclaim.equal(Number.parseInt('10', 24), 24);
	proclaim.equal(Number.parseInt('10', 25), 25);
	proclaim.equal(Number.parseInt('10', 26), 26);
	proclaim.equal(Number.parseInt('10', 27), 27);
	proclaim.equal(Number.parseInt('10', 28), 28);
	proclaim.equal(Number.parseInt('10', 29), 29);
	proclaim.equal(Number.parseInt('10', 30), 30);
	proclaim.equal(Number.parseInt('10', 31), 31);
	proclaim.equal(Number.parseInt('10', 32), 32);
	proclaim.equal(Number.parseInt('10', 33), 33);
	proclaim.equal(Number.parseInt('10', 34), 34);
	proclaim.equal(Number.parseInt('10', 35), 35);
	proclaim.equal(Number.parseInt('10', 36), 36);
	proclaim.equal(Number.parseInt('01'), Number.parseInt('01', 10));
	proclaim.equal(Number.parseInt('08'), Number.parseInt('08', 10));
	proclaim.equal(Number.parseInt('10'), Number.parseInt('10', 10));
	proclaim.equal(Number.parseInt('42'), Number.parseInt('42', 10));
	proclaim.equal(Number.parseInt('0x16'), Number.parseInt('0x16', 16));
	var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
	proclaim.equal(Number.parseInt('  0x16'), Number.parseInt('0x16', 16));
	proclaim.equal(Number.parseInt('  42'), Number.parseInt('42', 10));
	proclaim.equal(Number.parseInt('  08'), Number.parseInt('08', 10));
	proclaim.equal(Number.parseInt(ws + '08'), Number.parseInt('08', 10));
	proclaim.equal(Number.parseInt(ws + '0x16'), Number.parseInt('0x16', 16));
	var fakeZero = {
		valueOf: function () {
			return 0;
		}
	};
	proclaim.equal(Number.parseInt('08', fakeZero), Number.parseInt('08', 10));
	proclaim.equal(Number.parseInt('0x16', fakeZero), Number.parseInt('0x16', 16));
	proclaim.equal(Number.parseInt('-0xF'), -15);
	proclaim.equal(Number.parseInt('-0xF', 16), -15);
	proclaim.equal(Number.parseInt('+0xF'), 15);
	proclaim.equal(Number.parseInt('+0xF', 16), 15);
	proclaim.equal(Number.parseInt('10', -4294967294), 2);
	proclaim.isTrue(isNaN(Number.parseInt(null)));
	proclaim.isTrue(isNaN(Number.parseInt(undefined)));
});
