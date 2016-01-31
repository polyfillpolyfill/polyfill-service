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
			}).not.to.throwException();
		});

		it('cd()', function () {
			expect(function () {
				console.cd();
			}).not.to.throwException();
		});

		it('clear()', function () {
			expect(function () {
				console.clear();
			}).not.to.throwException();
		});

		it('count()', function () {
			expect(function () {
				console.count();
			}).not.to.throwException();
		});

		it('debug()', function () {
			expect(function () {
				console.debug();
			}).not.to.throwException();
		});

		it('dir()', function () {
			expect(function () {
				console.dir();
			}).not.to.throwException();
		});

		it('error()', function () {
			expect(function () {
				console.error();
			}).not.to.throwException();
		});

		it('exception()', function () {
			expect(function () {
				console.exception();
			}).not.to.throwException();
		});

		it('group()', function () {
			expect(function () {
				console.group();
			}).not.to.throwException();
		});

		it('groupCollapsed()', function () {
			expect(function () {
				console.groupCollapsed();
			}).not.to.throwException();
		});

		it('groupEnd()', function () {
			expect(function () {
				console.groupEnd();
			}).not.to.throwException();
		});

		it('info()', function () {
			expect(function () {
				console.info();
			}).not.to.throwException();
		});

		it('log()', function () {
			expect(function () {
				console.log();
			}).not.to.throwException();
		});

		it('markTimeline()', function () {
			expect(function () {
				console.markTimeline();
			}).not.to.throwException();
		});

		it('profile()', function () {
			expect(function () {
				console.profile();
			}).not.to.throwException();
		});

		it('profileEnd()', function () {
			expect(function () {
				console.profileEnd();
			}).not.to.throwException();
		});

		it('profiles()', function () {
			expect(function () {
				console.profiles();
			}).not.to.throwException();
		});

		it('show()', function () {
			expect(function () {
				console.show();
			}).not.to.throwException();
		});

		it('table()', function () {
			expect(function () {
				console.table();
			}).not.to.throwException();
		});

		it('time()', function () {
			expect(function () {
				console.time();
			}).not.to.throwException();
		});

		it('timeEnd()', function () {
			expect(function () {
				console.timeEnd();
			}).not.to.throwException();
		});

		it('timeStamp()', function () {
			expect(function () {
				console.timeStamp();
			}).not.to.throwException();
		});

		it('timeline()', function () {
			expect(function () {
				console.timeline();
			}).not.to.throwException();
		});

		it('timelineEnd()', function () {
			expect(function () {
				console.timelineEnd();
			}).not.to.throwException();
		});

		it('trace()', function () {
			expect(function () {
				console.trace();
			}).not.to.throwException();
		});

		it('warn()', function () {
			expect(function () {
				console.warn();
			}).not.to.throwException();
		});

	});

});
