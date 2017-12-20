/* eslint-env mocha */
'use strict';

module.exports = itRespondsWithContentType;

function itRespondsWithContentType(contentType) {
	it(`responds with a Content-Type of "${contentType}"`, function(done) {
		const regexp = new RegExp(`${contentType}`.replace('+', '\\+'), 'i');
		this.request.expect('Content-Type', regexp).end(done);
	});
}
