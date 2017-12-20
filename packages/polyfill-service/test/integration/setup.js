/* eslint-env mocha */

'use strict';

process.env.NODE_ENV = 'ci';

const startService = require('../../service');
const supertest = require('supertest');

before(function(done) {
	startService(3000, (error, app) => {
		if (error) {
			done(error);
		} else {

			this.agent = supertest.agent(app);
			this.app = app;
			done();
		}
	});
});

after(function () {
	this.app.server.close();
});
