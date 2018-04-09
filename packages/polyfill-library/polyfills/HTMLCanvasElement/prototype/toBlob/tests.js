/* eslint-env mocha, browser */
/* global proclaim */

it('should output a PNG blob', function() {
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.height = 10;
	canvas.width = 10;
	ctx.fillRect(0, 0, 10, 10);
	canvas.toBlob(function(blob) {
		proclaim.greaterThan(blob.size, 0);
		proclaim.equal(blob.type, 'image/png');
	});
});

it('should output a JPG blob', function() {
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.height = 10;
	canvas.width = 10;
	ctx.fillRect(0, 0, 10, 10);

	canvas.toBlob(function(blob) {
		proclaim.equal(blob.type, 'image/jpeg');
	}, 'image/jpeg');
});
