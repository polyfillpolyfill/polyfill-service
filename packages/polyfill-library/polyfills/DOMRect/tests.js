/* eslint-env mocha, browser */
/* global proclaim */

describe('constructor', function () {
	it('should create DOMRect with specified x, y, width, and height properties', function () {
		var domRect = new DOMRect(12, 34, 56, 78);
		proclaim.strictEqual(domRect.x, 12);
		proclaim.strictEqual(domRect.y, 34);
		proclaim.strictEqual(domRect.width, 56);
		proclaim.strictEqual(domRect.height, 78);
	});
	it('should default undefined arguments to zero', function () {
		var domRect = new DOMRect();
		proclaim.strictEqual(domRect.x, 0);
		proclaim.strictEqual(domRect.y, 0);
		proclaim.strictEqual(domRect.width, 0);
		proclaim.strictEqual(domRect.height, 0);
	});
	it('should interpret non-numeric arguments as NaN', function () {
		var domRect = new DOMRect('text', 34, 56, 78);
		proclaim.isTrue(isNaN(domRect.x));
		proclaim.strictEqual(domRect.y, 34);
		proclaim.strictEqual(domRect.width, 56);
		proclaim.strictEqual(domRect.height, 78);
		domRect = new DOMRect(12, 'text', 56, 78);
		proclaim.strictEqual(domRect.x, 12);
		proclaim.isTrue(isNaN(domRect.y));
		proclaim.strictEqual(domRect.width, 56);
		proclaim.strictEqual(domRect.height, 78);
		domRect = new DOMRect(12, 34, 'text', 78);
		proclaim.strictEqual(domRect.x, 12);
		proclaim.strictEqual(domRect.y, 34);
		proclaim.isTrue(isNaN(domRect.width));
		proclaim.strictEqual(domRect.height, 78);
		domRect = new DOMRect(12, 34, 56, 'text');
		proclaim.strictEqual(domRect.x, 12);
		proclaim.strictEqual(domRect.y, 34);
		proclaim.strictEqual(domRect.width, 56);
		proclaim.isTrue(isNaN(domRect.height));
	});
});

describe('writable properties', function () {
	it('should define `x` as writable', function () {
		var domRect = new DOMRect();
		domRect.x = 321;
		proclaim.strictEqual(domRect.x, 321);
	});

	it('should define `y` as writable', function () {
		var domRect = new DOMRect();
		domRect.y = 321;
		proclaim.strictEqual(domRect.y, 321);
	});

	it('should define `width` as writable', function () {
		var domRect = new DOMRect();
		domRect.width = 321;
		proclaim.strictEqual(domRect.width, 321);
	});

	it('should define `height` as writable', function () {
		var domRect = new DOMRect();
		domRect.height = 321;
		proclaim.strictEqual(domRect.height, 321);
	});
});

describe('readonly properties', function () {
	it('should define `left` as readonly', function () {
		var domRect = new DOMRect(10, 20, 30, 40);
		domRect.left = 321;
		proclaim.strictEqual(domRect.left, /* x */ 10);
	});

	it('should define `right` as readonly', function () {
		var domRect = new DOMRect(10, 20, 30, 40);
		domRect.right = 321;
		proclaim.strictEqual(domRect.right, /* x + width */ 40);
	});

	it('should define `top` as readonly', function () {
		var domRect = new DOMRect(10, 20, 30, 40);
		domRect.top = 321;
		proclaim.strictEqual(domRect.top, /* y */ 20);
	});

	it('should define `bottom` as readonly', function () {
		var domRect = new DOMRect(10, 20, 30, 40);
		domRect.bottom = 321;
		proclaim.strictEqual(domRect.bottom, /* y + height */ 60);
	});

	it('should have correct `left` and `right` when `width` is positive', function () {
		var domRect = new DOMRect(100, 0, 200, 0);
		proclaim.strictEqual(domRect.left, /* x */ 100);
		proclaim.strictEqual(domRect.right, /* x + width */ 300);
	});

	it('should have correct `left` and `right` when `width` is negative', function () {
		var domRect = new DOMRect(100, 0, -200, 0);
		proclaim.strictEqual(domRect.left, /* x + width */ -100);
		proclaim.strictEqual(domRect.right, /* x */ 100);
	});

	it('should have correct `top` and `bottom` when `height` is positive', function () {
		var domRect = new DOMRect(0, 100, 0, 200);
		proclaim.strictEqual(domRect.top, /* y */ 100);
		proclaim.strictEqual(domRect.bottom, /* y + height */ 300);
	});

	it('should have correct `top` and `bottom` when `height` is negative', function () {
		var domRect = new DOMRect(0, 100, 0, -200);
		proclaim.strictEqual(domRect.top, /* y + height */ -100);
		proclaim.strictEqual(domRect.bottom, /* y */ 100);
	});

	it('should have correct `left` and `right` when `x` is changed', function () {
		var domRect = new DOMRect(100, 0, 200, 0);
		domRect.x = 50;
		proclaim.strictEqual(domRect.left, /* x */ 50);
		proclaim.strictEqual(domRect.right, /* x + width */ 250);
	});

	it('should have correct `left` and `right` when `width` is changed', function () {
		var domRect = new DOMRect(100, 0, 200, 0);
		domRect.width = 300;
		proclaim.strictEqual(domRect.left, /* x */ 100);
		proclaim.strictEqual(domRect.right, /* x + width */ 400);
	});

	it('should have correct `top` and `bottom` when `y` is changed', function () {
		var domRect = new DOMRect(0, 100, 0, 200);
		domRect.y = 50;
		proclaim.strictEqual(domRect.top, /* y */ 50);
		proclaim.strictEqual(domRect.bottom, /* y + height */ 250);
	});

	it('should have correct `top` and `bottom` when `height` is changed', function () {
		var domRect = new DOMRect(0, 100, 0, 200);
		domRect.height = 300;
		proclaim.strictEqual(domRect.top, /* y */ 100);
		proclaim.strictEqual(domRect.bottom, /* y + height */ 400);
	});
});
