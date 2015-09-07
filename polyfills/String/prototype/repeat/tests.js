it('has correct instance', function () {
	expect(String.prototype.repeat).to.be.a(Function);
});

it('has correct argument length', function () {
	expect(String.prototype.repeat.length).to.be(1);
});

// excellent tests provided by https://github.com/mathiasbynens/String.prototype.repeat

it('works with strings', function () {
	expect('abc'.repeat()).to.be('');
	expect('abc'.repeat(undefined)).to.be('');
	expect('abc'.repeat(null)).to.be('');
	expect('abc'.repeat(false)).to.be('');
	expect('abc'.repeat(NaN)).to.be('');
	expect('abc'.repeat('abc')).to.be('');
	expect('abc'.repeat(-0)).to.be('');
	expect('abc'.repeat(+0)).to.be('');
	expect('abc'.repeat(1)).to.be('abc');
	expect('abc'.repeat(2)).to.be('abcabc');
	expect('abc'.repeat(3)).to.be('abcabcabc');
	expect('abc'.repeat(4)).to.be('abcabcabcabc');
});

it('throws invalid counts', function () {
	expect(function () {
		'abc'.repeat(-Infinity);
	}).to.throwError();

	expect(function () {
		'abc'.repeat(-1);
	}).to.throwError();

	expect(function() {
		'abc'.repeat(+Infinity);
	}).to.throwError();
});

it('works with coercible objects', function () {
	expect(String.prototype.repeat.call(42, 4)).to.be('42424242');

	expect(String.prototype.repeat.call({
		toString: function () {
			return 'abc';
		}
	}, 2)).to.be('abcabc');

	expect(String.prototype.repeat.apply(42, [4])).to.be('42424242');

	expect(String.prototype.repeat.apply({
		toString: function () {
			return 'abc';
		}
	}, [2])).to.be('abcabc');
});

var
supportsStrictModeTests = (function () {
	'use strict';

	return this === undefined;
}).call(undefined);

if (supportsStrictModeTests) {
	it('throws incoercible objects', function () {
		expect(function () {
			String.prototype.repeat.call(undefined);
		}).to.throwError();

		expect(function () {
			String.prototype.repeat.call(undefined, 4);
		}).to.throwError();

		expect(function () {
			String.prototype.repeat.call(null);
		}).to.throwError();

		expect(function () {
			String.prototype.repeat.call(null, 4);
		}).to.throwError();

		expect(function () {
			String.prototype.repeat.apply(undefined);
		}).to.throwError();

		expect(function () {
			String.prototype.repeat.apply(undefined, [4]);
		}).to.throwError();

		expect(function () {
			String.prototype.repeat.apply(null);
		}).to.throwError();

		expect(function () {
			String.prototype.repeat.apply(null, [4]);
		}).to.throwError();
	});
}
