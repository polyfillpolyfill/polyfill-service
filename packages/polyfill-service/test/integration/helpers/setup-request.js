/* eslint-env mocha */

'use strict';

module.exports = setupRequest;

function setupRequest(method, endpoint, headers) {
	method = method.toLowerCase();
	beforeEach(function () {
		this.request = this.agent[method](endpoint);
		if (headers) {
			Object.keys(headers).forEach(header => {
				this.request.set(header, headers[header]);
			});
		}
	});
}
