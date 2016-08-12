/* eslint-env mocha, browser*/
/* global proclaim, it */

before(function(done) {
  var head = head = document.head || document.getElementsByTagName('head')[0];
  var scriptEl = document.createElement('script');
  var readywait = null;
  scriptEl.src = 'https://cdnjs.cloudflare.com/ajax/libs/sinon.js/1.15.4/sinon.min.js';
  scriptEl.onload = function() {
    clearTimeout(readywait);
    done();
  };
  readywait = setInterval(function() {
    if ('sinon' in window) {
      clearTimeout(readywait);
      done();
    }
  }, 500);
  head.appendChild(scriptEl);
});

this.timeout(10000);

/*  The following copy-paste from https://raw.githubusercontent.com/philipwalton/IntersectionObserver/ddc47f358db7624ac52a524451ef9f2a3d5ce8f7/polyfill/intersection-observer-test.js */


/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


// Sets the timeout to three times the poll interval to ensure all updates
// happen (especially in slower browsers). Native implementations get the
// standard 100ms timeout defined in the spec.
var ASYNC_TIMEOUT = IntersectionObserver.prototype.THROTTLE_TIMEOUT * 3 || 100;


var io;
var noop = function() {};


// References to DOM elements, which are accessible to any test
// and reset prior to each test so state isn't shared.
var rootEl;
var grandParentEl;
var parentEl;
var targetEl1;
var targetEl2;
var targetEl3;
var targetEl4;


describe('IntersectionObserver', function() {

  before(function() {
    // If the browser running the tests doesn't support MutationObserver,
    // fall back to polling.
    if (!('MutationObserver' in window)) {
      IntersectionObserver.prototype.POLL_INTERVAL =
          IntersectionObserver.prototype.THROTTLE_TIMEOUT || 100;
    }
  });


  beforeEach(function() {
    addStyles();
    addFixtures();
  });


  afterEach(function() {
    if (io && 'disconnect' in io) io.disconnect();
    io = null;

    removeStyles();
    removeFixtures();
  });


  describe('constructor', function() {

    it('throws when callback is not a function', function() {
      proclaim.throws(function() {
        io = new IntersectionObserver(null);
      }, /function/i);
    });


    it('instantiates root correctly', function() {
      io = new IntersectionObserver(noop);
      proclaim.equal(io.root, null);

      io = new IntersectionObserver(noop, {root: rootEl});
      proclaim.equal(io.root, rootEl);
    });


    it('throws when root is not an Element', function() {
      proclaim.throws(function() {
        io = new IntersectionObserver(noop, {root: 'foo'});
      }, /element/i);
    });


    it('instantiates rootMargin correctly', function() {
      io = new IntersectionObserver(noop, {rootMargin: '10px'});
      proclaim.equal(io.rootMargin, '10px 10px 10px 10px');

      io = new IntersectionObserver(noop, {rootMargin: '10px -5%'});
      proclaim.equal(io.rootMargin, '10px -5% 10px -5%');

      io = new IntersectionObserver(noop, {rootMargin: '10px 20% 0px'});
      proclaim.equal(io.rootMargin, '10px 20% 0px 20%');

      io = new IntersectionObserver(noop, {rootMargin: '0px 0px -5% 5px'});
      proclaim.equal(io.rootMargin, '0px 0px -5% 5px');

      // TODO(philipwalton): the polyfill supports fractional pixel and
      // percentage values, but the native Chrome implementation does not,
      // at least not in what it reports `rootMargin` to be.
      if (!supportsNativeIntersectionObserver()) {
        io = new IntersectionObserver(noop, {rootMargin: '-2.5% -8.5px'});
        proclaim.equal(io.rootMargin, '-2.5% -8.5px -2.5% -8.5px');
      }
    });


    it('throws when rootMargin is not in pixels or pecernt', function() {
      proclaim.throws(function() {
        io = new IntersectionObserver(noop, {rootMargin: '0'});
      }, /pixels.*percent/i);
    });


    // Chrome's implementation in version 51 doesn't include the thresholds
    // property, but versions 52+ do.
    if ('thresholds' in IntersectionObserver.prototype) {
      it('instantiates thresholds correctly', function() {
        io = new IntersectionObserver(noop);
        proclaim.deepEqual(io.thresholds, [0]);

        io = new IntersectionObserver(noop, {threshold: 0.5});
        proclaim.deepEqual(io.thresholds, [0.5]);

        io = new IntersectionObserver(noop, {threshold: [0.25, 0.5, 0.75]});
        proclaim.deepEqual(io.thresholds, [0.25, 0.5, 0.75]);

        io = new IntersectionObserver(noop, {threshold: [1, .5, 0]});
        proclaim.deepEqual(io.thresholds, [0, .5, 1]);
      });
    }


    it('throws when a threshold value is not between 0 and 1', function() {
      proclaim.throws(function() {
        io = new IntersectionObserver(noop, {threshold: [0, -1]});
      }, /threshold/i);
    });

  });


  describe('observe', function() {

    it('throws when target is not an Element', function() {
      proclaim.throws(function() {
        io = new IntersectionObserver(noop);
        io.observe(null);
      }, /element/i);
    });


    it('triggers if target intersects when observing begins', function(done) {
      io = new IntersectionObserver(function(records) {
        proclaim.equal(records.length, 1);
        proclaim.equal(records[0].intersectionRatio, 1);
        done();
      }, {root: rootEl});
      io.observe(targetEl1);
    });


    it('triggers with the correct arguments', function(done) {
      io = new IntersectionObserver(function(records, observer) {
        proclaim.equal(records.length, 1);
        proclaim.isInstanceOf(records[0], IntersectionObserverEntry);
        proclaim.equal(observer, io);
        proclaim.equal(this, io);
        done();
      }, {root: rootEl});
      io.observe(targetEl1);
    });


    it('does not trigger if target does not intersect when observing begins',
        function(done) {

      var spy = sinon.spy();
      io = new IntersectionObserver(spy, {root: rootEl});

      targetEl2.style.top = '-40px';
      io.observe(targetEl2);
      setTimeout(function() {
        proclaim.equal(spy.callCount, 0);
        done();
      }, ASYNC_TIMEOUT);
    });


    it('handles container elements with non-visible overflow',
        function(done) {

      var spy = sinon.spy();
      io = new IntersectionObserver(spy, {root: rootEl});

      runSequence([
        function(done) {
          io.observe(targetEl1);
          setTimeout(function() {
            proclaim.equal(spy.callCount, 1);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 1);
            proclaim.equal(records[0].intersectionRatio, 1);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          targetEl1.style.left = '-40px';
          setTimeout(function() {
            proclaim.equal(spy.callCount, 2);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 1);
            proclaim.equal(records[0].intersectionRatio, 0);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          parentEl.style.overflow = 'visible';
          setTimeout(function() {
            proclaim.equal(spy.callCount, 3);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 1);
            proclaim.equal(records[0].intersectionRatio, 1);
            done();
          }, ASYNC_TIMEOUT);
        }
      ], done);
    });


    it('observes one target at a single threshold correctly', function(done) {

      var spy = sinon.spy();
      io = new IntersectionObserver(spy, {root: rootEl, threshold: 0.5});

      runSequence([
        function(done) {
          targetEl1.style.left = '-5px';
          io.observe(targetEl1);
          setTimeout(function() {
            proclaim.equal(spy.callCount, 1);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 1);
            proclaim.greaterThan(records[0].intersectionRatio, 0.5);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          targetEl1.style.left = '-15px';
          setTimeout(function() {
            proclaim.equal(spy.callCount, 2);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 1);
            proclaim.lessThan(records[0].intersectionRatio, 0.5);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          targetEl1.style.left = '-25px';
          setTimeout(function() {
            proclaim.equal(spy.callCount, 2);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          targetEl1.style.left = '-10px';
          setTimeout(function() {
            proclaim.equal(spy.callCount, 3);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 1);
            proclaim.equal(records[0].intersectionRatio, 0.5);
            done();
          }, ASYNC_TIMEOUT);
        }
      ], done);

    });


    it('observes multiple targets at multiple thresholds correctly',
        function(done) {

      var spy = sinon.spy();
      io = new IntersectionObserver(spy, {
        root: rootEl,
        threshold: [1, 0.5, 0]
      });

      runSequence([
        function(done) {
          targetEl1.style.top = '0px';
          targetEl1.style.left = '-15px';
          targetEl2.style.top = '-5px';
          targetEl2.style.left = '0px';
          targetEl3.style.top = '0px';
          targetEl3.style.left = '205px';
          io.observe(targetEl1);
          io.observe(targetEl2);
          io.observe(targetEl3);
          setTimeout(function() {
            proclaim.equal(spy.callCount, 1);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 2);
            proclaim.equal(records[0].target, targetEl1);
            proclaim.equal(records[0].intersectionRatio, 0.25);
            proclaim.equal(records[1].target, targetEl2);
            proclaim.equal(records[1].intersectionRatio, 0.75);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          targetEl1.style.top = '0px';
          targetEl1.style.left = '-5px';
          targetEl2.style.top = '-15px';
          targetEl2.style.left = '0px';
          targetEl3.style.top = '0px';
          targetEl3.style.left = '195px';
          setTimeout(function() {
            proclaim.equal(spy.callCount, 2);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 3);
            proclaim.equal(records[0].target, targetEl1);
            proclaim.equal(records[0].intersectionRatio, 0.75);
            proclaim.equal(records[1].target, targetEl2);
            proclaim.equal(records[1].intersectionRatio, 0.25);
            proclaim.equal(records[2].target, targetEl3);
            proclaim.equal(records[2].intersectionRatio, 0.25);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          targetEl1.style.top = '0px';
          targetEl1.style.left = '5px';
          targetEl2.style.top = '-25px';
          targetEl2.style.left = '0px';
          targetEl3.style.top = '0px';
          targetEl3.style.left = '185px';
          setTimeout(function() {
            proclaim.equal(spy.callCount, 3);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 3);
            proclaim.equal(records[0].target, targetEl1);
            proclaim.equal(records[0].intersectionRatio, 1);
            proclaim.equal(records[1].target, targetEl2);
            proclaim.equal(records[1].intersectionRatio, 0);
            proclaim.equal(records[2].target, targetEl3);
            proclaim.equal(records[2].intersectionRatio, 0.75);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          targetEl1.style.top = '0px';
          targetEl1.style.left = '15px';
          targetEl2.style.top = '-35px';
          targetEl2.style.left = '0px';
          targetEl3.style.top = '0px';
          targetEl3.style.left = '175px';
          setTimeout(function() {
            proclaim.equal(spy.callCount, 4);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 1);
            proclaim.equal(records[0].target, targetEl3);
            proclaim.equal(records[0].intersectionRatio, 1);
            done();
          }, ASYNC_TIMEOUT);
        }
      ], done);
    });


    it('handles rootMargin properly', function(done) {

      parentEl.style.overflow = 'visible';
      targetEl1.style.top = '0px';
      targetEl1.style.left = '-20px';
      targetEl2.style.top = '-20px';
      targetEl2.style.left = '0px';
      targetEl3.style.top = '0px';
      targetEl3.style.left = '200px';
      targetEl4.style.top = '180px';
      targetEl4.style.left = '180px';

      runSequence([
        function(done) {
          io = new IntersectionObserver(function(records) {
            records = sortRecords(records);
            proclaim.equal(records.length, 4);
            proclaim.equal(records[0].target, targetEl1);
            proclaim.equal(records[0].intersectionRatio, 1);
            proclaim.equal(records[1].target, targetEl2);
            proclaim.equal(records[1].intersectionRatio, .5);
            proclaim.equal(records[2].target, targetEl3);
            proclaim.equal(records[2].intersectionRatio, .5);
            proclaim.equal(records[3].target, targetEl4);
            proclaim.equal(records[3].intersectionRatio, 1);
            io.disconnect();
            done();
          }, {root: rootEl, rootMargin: '10px'});

          io.observe(targetEl1);
          io.observe(targetEl2);
          io.observe(targetEl3);
          io.observe(targetEl4);

          // Force a new frame to fix https://crbug.com/612323
          window.requestAnimationFrame && requestAnimationFrame(function(){});
        },
        function(done) {
          io = new IntersectionObserver(function(records) {
            records = sortRecords(records);
            proclaim.equal(records.length, 3);
            proclaim.equal(records[0].target, targetEl1);
            proclaim.equal(records[0].intersectionRatio, 0.5);
            proclaim.equal(records[1].target, targetEl3);
            proclaim.equal(records[1].intersectionRatio, 0.5);
            proclaim.equal(records[2].target, targetEl4);
            proclaim.equal(records[2].intersectionRatio, 0.5);
            io.disconnect();
            done();
          }, {root: rootEl, rootMargin: '-10px 10%'});

          io.observe(targetEl1);
          io.observe(targetEl2);
          io.observe(targetEl3);
          io.observe(targetEl4);

          // Force a new frame to fix https://crbug.com/612323
          window.requestAnimationFrame && requestAnimationFrame(function(){});
        },
        function(done) {
          io = new IntersectionObserver(function(records) {
            records = sortRecords(records);
            proclaim.equal(records.length, 2);
            proclaim.equal(records[0].target, targetEl1);
            proclaim.equal(records[0].intersectionRatio, 0.5);
            proclaim.equal(records[1].target, targetEl4);
            proclaim.equal(records[1].intersectionRatio, 0.5);
            io.disconnect();
            done();
          }, {root: rootEl, rootMargin: '-5% -2.5% 0px'});

          io.observe(targetEl1);
          io.observe(targetEl2);
          io.observe(targetEl3);
          io.observe(targetEl4);

          // Force a new frame to fix https://crbug.com/612323
          window.requestAnimationFrame && requestAnimationFrame(function(){});
        },
        function(done) {
          io = new IntersectionObserver(function(records) {
            records = sortRecords(records);
            proclaim.equal(records.length, 3);
            proclaim.equal(records[0].target, targetEl1);
            proclaim.equal(records[0].intersectionRatio, 0.5);
            proclaim.equal(records[1].target, targetEl2);
            proclaim.equal(records[1].intersectionRatio, 0.5);
            proclaim.equal(records[2].target, targetEl4);
            proclaim.equal(records[2].intersectionRatio, 0.25);
            io.disconnect();
            done();
          }, {root: rootEl, rootMargin: '5% -2.5% -10px -190px'});

          io.observe(targetEl1);
          io.observe(targetEl2);
          io.observe(targetEl3);
          io.observe(targetEl4);

          // Force a new frame to fix https://crbug.com/612323
          window.requestAnimationFrame && requestAnimationFrame(function(){});
        }
      ], done);
    });


    it('handles targets on the boundary of root', function(done) {

      var spy = sinon.spy();
      io = new IntersectionObserver(spy, {root: rootEl});

      runSequence([
        function(done) {
          targetEl1.style.top = '0px';
          targetEl1.style.left = '-21px';
          targetEl2.style.top = '-20px';
          targetEl2.style.left = '0px';
          io.observe(targetEl1);
          io.observe(targetEl2);
          setTimeout(function() {
            proclaim.equal(spy.callCount, 1);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 1);
            proclaim.equal(records[0].intersectionRatio, 0);
            proclaim.equal(records[0].target, targetEl2);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          targetEl1.style.top = '0px';
          targetEl1.style.left = '-20px';
          targetEl2.style.top = '-21px';
          targetEl2.style.left = '0px';
          setTimeout(function() {
            proclaim.equal(spy.callCount, 2);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 2);
            proclaim.equal(records[0].intersectionRatio, 0);
            proclaim.equal(records[0].target, targetEl1);
            proclaim.equal(records[1].intersectionRatio, 0);
            proclaim.equal(records[1].target, targetEl2);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          targetEl1.style.top = '-20px';
          targetEl1.style.left = '200px';
          targetEl2.style.top = '200px';
          targetEl2.style.left = '200px';

          setTimeout(function() {
            proclaim.equal(spy.callCount, 3);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 1);
            proclaim.equal(records[0].intersectionRatio, 0);
            proclaim.equal(records[0].target, targetEl2);
            done();
          }, ASYNC_TIMEOUT);
        }
      ], done);

    });


    it('handles zero-size targets within the root coordinate space',
        function(done) {

      io = new IntersectionObserver(function(records) {
        proclaim.equal(records.length, 1);
        proclaim.equal(records[0].intersectionRatio, 0);
        done();
      }, {root: rootEl});

      targetEl1.style.top = '0px';
      targetEl1.style.left = '0px';
      targetEl1.style.width = '0px';
      targetEl1.style.height = '0px';
      io.observe(targetEl1);
    });


    it('handles root/target elements not yet in the DOM', function(done) {

      rootEl.parentNode.removeChild(rootEl);
      targetEl1.parentNode.removeChild(targetEl1);

      var spy = sinon.spy();
      io = new IntersectionObserver(spy, {root: rootEl});

      runSequence([
        function(done) {
          io.observe(targetEl1);
          setTimeout(done, 0);
        },
        function(done) {
          document.getElementById('fixtures').appendChild(rootEl);
          setTimeout(function() {
            proclaim.equal(spy.callCount, 0);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          parentEl.insertBefore(targetEl1, targetEl2);
          setTimeout(function() {
            proclaim.equal(spy.callCount, 1);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 1);
            proclaim.equal(records[0].intersectionRatio, 1);
            proclaim.equal(records[0].target, targetEl1);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          grandParentEl.parentNode.removeChild(grandParentEl);
          setTimeout(function() {
            proclaim.equal(spy.callCount, 2);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 1);
            proclaim.equal(records[0].intersectionRatio, 0);
            proclaim.equal(records[0].target, targetEl1);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          rootEl.appendChild(targetEl1);
          setTimeout(function() {
            proclaim.equal(spy.callCount, 3);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 1);
            proclaim.equal(records[0].intersectionRatio, 1);
            proclaim.equal(records[0].target, targetEl1);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          rootEl.parentNode.removeChild(rootEl);
          setTimeout(function() {
            proclaim.equal(spy.callCount, 4);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 1);
            proclaim.equal(records[0].intersectionRatio, 0);
            proclaim.equal(records[0].target, targetEl1);
            done();
          }, ASYNC_TIMEOUT);
        }
      ], done);
    });


    it('handles sub-root element scrolling', function(done) {
      io = new IntersectionObserver(function(records) {
        proclaim.equal(records.length, 1);
        proclaim.equal(records[0].intersectionRatio, 1);
        done();
      }, {root: rootEl});

      io.observe(targetEl3);
      setTimeout(function() {
        parentEl.scrollLeft = 40;
      }, 0);
    });


    // Only run this test in browsers that support CSS transitions.
    if ('transform' in document.documentElement.style &&
        'transform' in document.documentElement.style) {

      it('supports CSS transitions and transforms', function(done) {

        targetEl1.style.top = '220px';
        targetEl1.style.left = '220px';

        io = new IntersectionObserver(function(records) {
          proclaim.equal(records.length, 1);
          // Chrome's native implementation sometimes incorrectly reports
          // the intersection ratio as a number > 1.
          proclaim.lessThanOrEqual(records[0].intersectionRatio, 1);
          done();
        }, {root: rootEl, threshold: [1]});

        // CSS transitions that are slower than the default throttle timeout
        // require polling to detect, which can be set on a per-instance basis.
        if (!supportsNativeIntersectionObserver()) {
          io.POLL_INTERVAL = 100;
        }

        io.observe(targetEl1);
        setTimeout(function() {
          targetEl1.style.transform = 'translateX(-40px) translateY(-40px)';
        }, 0);
      });
    }


    it('uses the viewport when no root is specified', function(done) {
      io = new IntersectionObserver(function(records) {
        var viewportWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var viewportHeight = document.documentElement.clientHeight || document.body.clientHeight;

        proclaim.equal(records.length, 1);
        proclaim.equal(records[0].rootBounds.top, 0);
        proclaim.equal(records[0].rootBounds.left, 0);
        proclaim.equal(records[0].rootBounds.right, viewportWidth);
        proclaim.equal(records[0].rootBounds.width, viewportWidth);
        proclaim.equal(records[0].rootBounds.bottom, viewportHeight);
        proclaim.equal(records[0].rootBounds.height, viewportHeight);
        done();
      });

      // Ensures targetEl1 is visible in the viewport before observing.
      window.scrollTo(0, 0);
      rootEl.style.position = 'absolute';
      rootEl.style.top = '0px';
      rootEl.style.left = '0px';

      io.observe(targetEl1);
    });

  });


  describe('takeRecords', function() {

    it('supports getting records before the callback is invoked',
        function(done) {

      var lastestRecords = [];
      io = new IntersectionObserver(function(records) {
        lastestRecords = lastestRecords.concat(records);
      }, {root: rootEl});
      io.observe(targetEl1);

      window.requestAnimationFrame && requestAnimationFrame(function() {
        lastestRecords = lastestRecords.concat(io.takeRecords());
      });

      setTimeout(function() {
        proclaim.equal(lastestRecords.length, 1);
        proclaim.equal(lastestRecords[0].intersectionRatio, 1);
        done();
      }, ASYNC_TIMEOUT);
    });

  });


  describe('unobserve', function() {

    it('removes targets from the internal store', function(done) {

      var spy = sinon.spy();
      io = new IntersectionObserver(spy, {root: rootEl});

      runSequence([
        function(done) {
          targetEl1.style.top = targetEl2.style.top = '0px';
          targetEl1.style.left = targetEl2.style.left = '0px';
          io.observe(targetEl1);
          io.observe(targetEl2);
          setTimeout(function() {
            proclaim.equal(spy.callCount, 1);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 2);
            proclaim.equal(records[0].target, targetEl1);
            proclaim.equal(records[0].intersectionRatio, 1);
            proclaim.equal(records[1].target, targetEl2);
            proclaim.equal(records[1].intersectionRatio, 1);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          io.unobserve(targetEl1);
          targetEl1.style.top = targetEl2.style.top = '0px';
          targetEl1.style.left = targetEl2.style.left = '-40px';
          setTimeout(function() {
            proclaim.equal(spy.callCount, 2);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 1);
            proclaim.equal(records[0].target, targetEl2);
            proclaim.equal(records[0].intersectionRatio, 0);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          io.unobserve(targetEl2);
          targetEl1.style.top = targetEl2.style.top = '0px';
          targetEl1.style.left = targetEl2.style.left = '0px';
          setTimeout(function() {
            proclaim.equal(spy.callCount, 2);
            done();
          }, ASYNC_TIMEOUT);
        }
      ], done);

    });

  });

  describe('disconnect', function() {

    it('removes all targets and stops listening for changes', function(done) {

      var spy = sinon.spy();
      io = new IntersectionObserver(spy, {root: rootEl});

      runSequence([
        function(done) {
          targetEl1.style.top = targetEl2.style.top = '0px';
          targetEl1.style.left = targetEl2.style.left = '0px';
          io.observe(targetEl1);
          io.observe(targetEl2);
          setTimeout(function() {
            proclaim.equal(spy.callCount, 1);
            var records = sortRecords(spy.lastCall.args[0]);
            proclaim.equal(records.length, 2);
            proclaim.equal(records[0].target, targetEl1);
            proclaim.equal(records[0].intersectionRatio, 1);
            proclaim.equal(records[1].target, targetEl2);
            proclaim.equal(records[1].intersectionRatio, 1);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          io.disconnect();
          targetEl1.style.top = targetEl2.style.top = '0px';
          targetEl1.style.left = targetEl2.style.left = '-40px';
          setTimeout(function() {
            proclaim.equal(spy.callCount, 1);
            done();
          }, ASYNC_TIMEOUT);
        }
      ], done);

    });

  });

});


/**
 * Runs a sequence of function and when finished invokes the done callback.
 * Each function in the sequence is invoked with its own done function and
 * it should call that function once it's complete.
 * @param {Array<Function>} functions An array of async functions.
 * @param {Function} done A final callback to be invoked once all function
 *     have run.
 */
function runSequence(functions, done) {
  var next = functions.shift();
  if (next) {
    next(function() {
      runSequence(functions, done);
    });
  } else {
    done && done();
  }
}


/**
 * Returns whether or not the current browser has native support for
 * IntersectionObserver.
 * @return {boolean} True if native support is detected.
 */
function supportsNativeIntersectionObserver() {
  return 'IntersectionObserver' in window &&
      window.IntersectionObserver.toString().indexOf('[native code]') > -1;
}


/**
 * Sorts an array of records alphebetically by ascending ID. Since the current
 * native implementation doesn't sort change entries by `observe` order, we do
 * that ourselves for the non-polyfill case. Since all tests call observe
 * on targets in sequential order, this should always match.
 * https://crbug.com/613679
 * @param {Array<IntersectionObserverEntry>} entries The entries to sort.
 * @return {Array<IntersectionObserverEntry>} The sorted array.
 */
function sortRecords(entries) {
  if (supportsNativeIntersectionObserver()) {
    entries = entries.sort(function(a, b) {
      return a.target.id < b.target.id ? -1 : 1;
    });
  }
  return entries;
}


/**
 * Adds the common styles used by all tests to the page.
 */
function addStyles() {
  var styles = document.createElement('style');
  styles.id = 'styles';
  document.documentElement.appendChild(styles);

  var cssText =
      '#root {' +
      '  position: relative;' +
      '  width: 400px;' +
      '  height: 200px;' +
      '  background: #eee' +
      '}' +
      '#grand-parent {' +
      '  position: relative;' +
      '  width: 200px;' +
      '  height: 200px;' +
      '}' +
      '#parent {' +
      '  position: absolute;' +
      '  top: 0px;' +
      '  left: 200px;' +
      '  overflow: hidden;' +
      '  width: 200px;' +
      '  height: 200px;' +
      '  background: #ddd;' +
      '}' +
      '#target1, #target2, #target3, #target4 {' +
      '  position: absolute;' +
      '  top: 0px;' +
      '  left: 0px;' +
      '  width: 20px;' +
      '  height: 20px;' +
      '  transform: translateX(0px) translateY(0px);' +
      '  transition: transform .5s;' +
      '  background: #f00;' +
      '}';

  // IE8 doesn't allow setting innerHTML on a <style> element.
  if (styles.styleSheet) {
    styles.styleSheet.cssText = cssText;
  }
  else {
    styles.innerHTML = cssText;
  }
}


/**
 * Adds the DOM fixtures used by all tests to the page and assigns them to
 * global variables so they can be referenced within the tests.
 */
function addFixtures() {
  var fixtures = document.createElement('div');
  fixtures.id = 'fixtures';

  fixtures.innerHTML =
      '<div id="root">' +
      '  <div id="grand-parent">' +
      '    <div id="parent">' +
      '      <div id="target1"></div>' +
      '      <div id="target2"></div>' +
      '      <div id="target3"></div>' +
      '      <div id="target4"></div>' +
      '    </div>' +
      '  </div>' +
      '</div>';

  document.body.appendChild(fixtures);

  rootEl = document.getElementById('root');
  grandParentEl = document.getElementById('grand-parent');
  parentEl = document.getElementById('parent');
  targetEl1 = document.getElementById('target1');
  targetEl2 = document.getElementById('target2');
  targetEl3 = document.getElementById('target3');
  targetEl4 = document.getElementById('target4');
}


/**
 * Removes the common styles from the page.
 */
function removeStyles() {
  var styles = document.getElementById('styles');
  styles.parentNode.removeChild(styles);
}


/**
 * Removes the DOM fixtures from the page and resets the global references.
 */
function removeFixtures() {
  var fixtures = document.getElementById('fixtures');
  fixtures.parentNode.removeChild(fixtures);

  rootEl = null;
  grandParentEl = null;
  parentEl = null;
  targetEl1 = null;
  targetEl2 = null;
  targetEl3 = null;
  targetEl4 = null;
}
