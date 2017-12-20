/* eslint-env mocha */
'use strict';

module.exports = itDoesNotRespondWithHeader;

function itDoesNotRespondWithHeader(header) {
	it(`does not respond with a ${header}`, function(done) {
		this.request.expect((response) => {
			if(response.headers[header.toLowerCase()]) {
				throw new Error(`Expected header ${header} to not be set`);
			}
		}).end(done);
	});
}
