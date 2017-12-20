/* eslint-env mocha, browser */
/* global proclaim */

var perf = window.performance;

describe("mark()", function() {
    beforeEach(function() {
        perf.clearMarks();
        perf.clearMeasures();
    });

    it("should handle a simple mark", function() {
        perf.mark("foo");

        var entries = perf.getEntriesByType("mark");

        proclaim.equal(entries.length, 1);
        proclaim.equal(entries[0].name, "foo");
        proclaim.greaterThan(entries[0].startTime, 0);
    });

    it("should throw an exception when a null argument is given", function() {
        proclaim.throws(perf.mark);
    });

    it("should throw an exception when passing in a NavigationTiming mark", function() {
        // NOTE we can only test this if NT exists
        if (typeof window !== "undefined" &&
            typeof window.performance !== "undefined" &&
            typeof window.performance.timing !== "undefined" &&
            window.performance.timing.navigationStart) {
            proclaim.throws(function() {
                perf.mark("navigationStart");
            });
        }
    });

    // create a bunch of marks, then ensure all of the marks's times are
    // greater than or equal to the last mark (i.e. in chronological order)
    it("should mark timestamps that incremenet (or equal) each previous mark", function() {
        for (var i = 0; i < 100; i++) {
            perf.mark("foo");
        }

        // make sure we have the same amount of marks
        var marks = perf.getEntriesByType("mark");
        proclaim.equal(marks.length, 100);

        // ensure chronological order
        var lastTime = 0;
        for (i = 0; i < marks.length; i++) {
            proclaim.greaterThan(marks[i].startTime, 0);
            proclaim.ok(marks[i].startTime >= lastTime);
            lastTime = marks[i].startTime;
        }
    });
});

describe("clearMarks()", function() {
    beforeEach(function() {
        perf.clearMarks();
        perf.clearMeasures();
    });

    it("should work for a single mark when called without arguments", function() {
        perf.mark("foo");
        proclaim.equal(perf.getEntriesByType("mark").length, 1);

        perf.clearMarks();
        proclaim.equal(perf.getEntriesByType("mark").length, 0);
    });

    it("should work OK before any marks are called", function() {
        proclaim.equal(perf.getEntriesByType("mark").length, 0);
        perf.clearMarks();
        proclaim.equal(perf.getEntriesByType("mark").length, 0);
    });

    it("should work OK if there are no marks of that name", function() {
        perf.mark("1");
        proclaim.equal(perf.getEntriesByType("mark").length, 1);
        perf.clearMarks("2");
        proclaim.equal(perf.getEntriesByType("mark").length, 1);
    });

    it("should clear marks of a specified name", function() {
        perf.mark("foo1");
        perf.mark("foo2");
        proclaim.equal(perf.getEntriesByType("mark").length, 2);

        // clear, shouldn't have removed foo2
        perf.clearMarks("foo1");
        proclaim.equal(perf.getEntriesByType("mark").length, 1);

        perf.clearMarks("foo2");

        // foo2 should now be removed
        proclaim.equal(perf.getEntriesByType("mark").length, 0);
    });

    it("should only remove marks, not measures", function() {
        perf.mark("foo");
        proclaim.equal(perf.getEntriesByType("mark").length, 1);

        // measure something
        perf.measure("foo");
        perf.measure("foo");

        // clear
        perf.clearMarks();
        proclaim.equal(perf.getEntriesByType("mark").length, 0);
        proclaim.equal(perf.getEntriesByType("measure").length, 2);

    });
});

describe("PerformanceTimeline", function() {
    beforeEach(function() {
        perf.clearMarks();
        perf.clearMeasures();
    });

    describe("getEntries()", function() {
        it("should work when called without arguments and nothing had been called before it", function() {
            var entries = perf.getEntries();

            // can't guarantee there aren't other entries from the PT if the PT is natively supported
            proclaim.ok(entries.length >= 0);
        });

        it("should work when called without arguments and at least one mark had been logged", function() {
            perf.mark("1");

            var entries = perf.getEntries();

            // can't guarantee there aren't other entries from the PT if the PT is natively supported
            proclaim.greaterThan(entries.length, 0);
        });

        it("should sort entries", function() {
            // measures can be inserted out of order, because they're sorted by startTime which can be
            // specified as part of the measure
            perf.mark("1");

            // startTime will be "now", i.e. non-0
            perf.measure("1", "1");

            // measure from navStart, which will be startTime=0
            perf.measure("0");

            var entries = perf.getEntriesByType("measure");
            proclaim.isInstanceOf(entries, Array);
            proclaim.equal(entries[0].startTime, 0);
            proclaim.equal(entries[0].name, "0");
            proclaim.equal(entries[1].name, "1");
        });
    });

    describe("getEntriesByType()", function() {
        it("should work when nothing has been logged", function() {
            var entries = perf.getEntriesByType("mark");
            proclaim.equal(entries.length, 0);
        });

        it("should work with marks", function() {
            perf.mark("mark1");
            perf.measure("measure1");

            var entries = perf.getEntriesByType("mark");
            proclaim.equal(entries.length, 1);
            proclaim.equal(entries[0].name, "mark1");
            proclaim.greaterThan(entries[0].startTime, 0);
        });

        it("should work with marks when none had been logged", function() {
            perf.measure("measure1");

            var entries = perf.getEntriesByType("mark");
            proclaim.equal(entries.length, 0);
        });

        it("should work with measures", function() {
            perf.mark("mark1");
            perf.measure("measure1");

            var entries = perf.getEntriesByType("measure");
            proclaim.equal(entries.length, 1);
            proclaim.equal(entries[0].name, "measure1");
            proclaim.ok(entries[0].startTime >= 0);
        });

        it("should work with measures when none had been logged", function() {
            perf.mark("mark1");

            var entries = perf.getEntriesByType("measure");
            proclaim.equal(entries.length, 0);
        });

        it("should return an empty array if given a bad type", function() {
            // ensure the source array wasn"t modified
            var entries = perf.getEntriesByType("BAD_TYPE!!!");
            proclaim.isInstanceOf(entries, Array);
            proclaim.equal(entries.length, 0);
        });
    });

    describe("getEntriesByName()", function() {
        it("should work when nothing has been logged", function() {
            var entries = perf.getEntriesByName("mark");
            proclaim.equal(entries.length, 0);
        });

        it("should work when a mark and measure share the same name", function() {
            perf.mark("1");
            perf.measure("1");

            var entries = perf.getEntriesByName("1");
            proclaim.equal(entries.length, 2);
            proclaim.equal(entries[0].name, "1");
            proclaim.equal(entries[1].name, "1");
        });
    });
});

describe("now()", function() {
    it("should return a number greater than zero", function() {
        proclaim.greaterThan(perf.now(), 0);
    });

    it("should return sequential numbers", function() {
        var time1 = perf.now();
        var time2 = perf.now();
        proclaim.ok(time2 >= time1);
    });

    it("should be offset by navigationStart, not in Unix epoch format", function() {
        // now() shouldn"t be over 1000000000000, because the test would be running for >40 years
        // to get to that point
        proclaim.lessThan(perf.now(), 1000000000000);
    });
});

describe("measure()", function() {
    beforeEach(function() {
        perf.clearMarks();
        perf.clearMeasures();
    });

    it("should work even when there are no existing marks", function() {
        perf.measure("foo");

        var entries = perf.getEntriesByType("measure");

        proclaim.equal(entries.length, 1);
        proclaim.equal(entries[0].name, "foo");
        proclaim.equal(entries[0].startTime, 0);
    });

    it("should work when given a start mark as an argument", function() {
        perf.mark("1");

        perf.measure("1", "1");

        var entries = perf.getEntriesByType("measure");

        proclaim.equal(entries.length, 1);
        proclaim.equal(entries[0].name, "1");
        proclaim.greaterThan(entries[0].startTime, "0");
        proclaim.ok(entries[0].duration >= 0);
    });

    it("should work when given a start and end mark", function() {
        perf.mark("1");
        perf.mark("2");

        perf.measure("1", "1", "2");

        var entries = perf.getEntriesByType("measure");

        proclaim.equal(entries.length, 1);
        proclaim.equal(entries[0].name, "1");
        proclaim.greaterThan(entries[0].startTime, "0");
        proclaim.ok(entries[0].duration >= 0);

        // likely didn"t take 10 seconds
        proclaim.ok(entries[0].duration < 10000);
    });

    it("should throw an error if not given a name", function() {
        proclaim.throws(perf.measure);
    });

    it("should throw an error if not given a name", function() {
        proclaim.throws(perf.measure);
    });

    it("should throw an exception if the start mark name is not found", function() {
        proclaim.throws(function() {
            perf.measure("foo", "BAD_MARK!");
        }, Error);
    });

    it("should throw an exception if the end mark name is not found", function() {
        perf.mark("1");
        proclaim.throws(function() {
            perf.measure("foo", "1", "BAD_MARK!");
        }, Error);
    });
});

describe("clearMeasures()", function() {
    beforeEach(function() {
        perf.clearMarks();
        perf.clearMeasures();
    });

    it("should work when no measures had already been logged", function() {
        proclaim.equal(perf.getEntriesByType("measure").length, 0);
        perf.clearMeasures();
        proclaim.equal(0, perf.getEntriesByType("measure").length, 0);
    });

    it("should work when a single measure had already been logged", function() {
        perf.measure("foo");
        proclaim.equal(perf.getEntriesByType("measure").length, 1);

        perf.clearMeasures();
        proclaim.equal(0, perf.getEntriesByType("measure").length, 0);
    });

    it("should clear measures of the specified name", function() {
        perf.measure("foo1");
        perf.measure("foo2");
        proclaim.equal(perf.getEntriesByType("measure").length, 2);

        // clear, shouldn"t have removed foo2
        perf.clearMeasures("foo1");
        proclaim.equal(perf.getEntriesByType("measure").length, 1);

        perf.clearMeasures("foo2");

        // foo2 should now be removed
        proclaim.equal(perf.getEntriesByType("measure").length, 0);
    });

    it("should work OK if there are no marks of that name", function() {
        perf.measure("foo1");
        proclaim.equal(perf.getEntriesByType("measure").length, 1);
        perf.clearMeasures("foo2");
        proclaim.equal(perf.getEntriesByType("measure").length, 1);
    });
});
