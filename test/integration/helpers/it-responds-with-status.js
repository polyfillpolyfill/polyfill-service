/* eslint-env mocha */
'use strict';

module.exports = itRespondsWithStatus;

function itRespondsWithStatus(status) {
	it(`responds with a ${status} status`, function(done) {
		this.request.expect(status).end(done);
	});
}
