describe('console', function () {

	it('should expose itself on the global Object', function () {
		expect(console).to.be.ok;
	});

	describe('[properties]', function () {

		it('memory', function () {
			expect(console.memory).to.be.ok;
		});

	});

	describe('[methods]', function () {

		it('assert()', function () {
			expect(function () {
				console.assert();
			}).not.to.throw();
		});

		it('cd()', function () {
			expect(function () {
				console.cd();
			}).not.to.throw();
		});

		it('clear()', function () {
			expect(function () {
				console.clear();
			}).not.to.throw();
		});

		it('count()', function () {
			expect(function () {
				console.count();
			}).not.to.throw();
		});

		it('debug()', function () {
			expect(function () {
				console.debug();
			}).not.to.throw();
		});

		it('dir()', function () {
			expect(function () {
				console.dir();
			}).not.to.throw();
		});

		it('dirxml()', function () {
			expect(function () {
				console.dirxml();
			}).not.to.throw();
		});

		it('error()', function () {
			expect(function () {
				console.error();
			}).not.to.throw();
		});

		it('exception()', function () {
			expect(function () {
				console.exception();
			}).not.to.throw();
		});

		it('group()', function () {
			expect(function () {
				console.group();
			}).not.to.throw();
		});

		it('groupCollapsed()', function () {
			expect(function () {
				console.groupCollapsed();
			}).not.to.throw();
		});

		it('groupEnd()', function () {
			expect(function () {
				console.groupEnd();
			}).not.to.throw();
		});

		it('info()', function () {
			expect(function () {
				console.info();
			}).not.to.throw();
		});

		it('log()', function () {
			expect(function () {
				console.log();
			}).not.to.throw();
		});

		it('markTimeline()', function () {
			expect(function () {
				console.markTimeline();
			}).not.to.throw();
		});

		it('profile()', function () {
			expect(function () {
				console.profile();
			}).not.to.throw();
		});

		it('profileEnd()', function () {
			expect(function () {
				console.profileEnd();
			}).not.to.throw();
		});

		it('profiles()', function () {
			expect(function () {
				console.profiles();
			}).not.to.throw();
		});

		it('show()', function () {
			expect(function () {
				console.show();
			}).not.to.throw();
		});

		it('table()', function () {
			expect(function () {
				console.table();
			}).not.to.throw();
		});

		it('time()', function () {
			expect(function () {
				console.time();
			}).not.to.throw();
		});

		it('timeEnd()', function () {
			expect(function () {
				console.timeEnd();
			}).not.to.throw();
		});

		it('timeStamp()', function () {
			expect(function () {
				console.timeStamp();
			}).not.to.throw();
		});

		it('timeline()', function () {
			expect(function () {
				console.timeline();
			}).not.to.throw();
		});

		it('timelineEnd()', function () {
			expect(function () {
				console.timelineEnd();
			}).not.to.throw();
		});

		it('trace()', function () {
			expect(function () {
				console.trace();
			}).not.to.throw();
		});

		it('warn()', function () {
			expect(function () {
				console.warn();
			}).not.to.throw();
		});

	});

});
