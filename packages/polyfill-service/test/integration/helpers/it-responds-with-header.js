/* eslint-env mocha */
'use strict';

module.exports = itRespondsWithHeader;

function itRespondsWithHeader(header, value) {
	it(`responds with a ${header} of "${value}"`, function(done) {
		this.request.expect(header, value).end(done);
	});
}
