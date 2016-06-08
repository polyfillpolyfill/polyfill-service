var fixturesEl = document.createElement('div');
fixturesEl.id = 'fixtures';
document.body.appendChild(fixturesEl);
var css = "#root { position: relative; width: 400px; height: 200px; background: #eee } #grand-parent { position: relative; width: 200px; height: 200px; } #parent { position: absolute; top: 0px; left: 200px; overflow: hidden; width: 200px; height: 200px; background: #ddd; } #target1, #target2, #target3, #target4 { position: absolute; top: 0px; left: 0px; width: 20px; height: 20px; transform: translateX(0px) translateY(0px); transition: transform .5s; background: #f00; }";
var head = head = document.head || document.getElementsByTagName('head')[0];
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
if (styleEl.styleSheet){
  styleEl.styleSheet.cssText = css;
} else {
  styleEl.appendChild(document.createTextNode(css));
}

head.appendChild(styleEl);


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
var ASYNC_TIMEOUT = IntersectionObserver.prototype.POLL_INTERVAL * 3 || 100;


var io;
var rootEl;
var grandParentEl;
var parentEl;
var targetEl1;
var targetEl2;
var targetEl3;
var targetEl4;
var noop = function() {};



describe('IntersectionObserver', function() {

  beforeEach(function() {
    document.getElementById('fixtures').innerHTML =
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

    rootEl = document.getElementById('root');
    grandParentEl = document.getElementById('grand-parent');
    parentEl = document.getElementById('parent');
    targetEl1 = document.getElementById('target1');
    targetEl2 = document.getElementById('target2');
    targetEl3 = document.getElementById('target3');
    targetEl4 = document.getElementById('target4');
  });


  afterEach(function() {
    if (io && 'disconnect' in io) io.disconnect();
    io = null;
    document.getElementById('fixtures').innerHTML = '';
  });


  describe('constructor', function() {

    it('throws when callback is not a function', function() {
      expect(function() {
        io = new IntersectionObserver(null);
      }).to.throwException(/function/i);
    });


    it('instantiates root correctly', function() {
      io = new IntersectionObserver(noop);
      expect(io.root).to.be(null);

      io = new IntersectionObserver(noop, {root: rootEl});
      expect(io.root).to.be(rootEl);
    });


    it('throws when root is not an Element', function() {
      expect(function() {
        io = new IntersectionObserver(noop, {root: 'foo'});
      }).to.throwException(/element/i);
    });


    it('instantiates rootMargin correctly', function() {
      io = new IntersectionObserver(noop, {rootMargin: '10px'});
      expect(io.rootMargin).to.be('10px 10px 10px 10px');

      io = new IntersectionObserver(noop, {rootMargin: '10px -5%'});
      expect(io.rootMargin).to.be('10px -5% 10px -5%');

      io = new IntersectionObserver(noop, {rootMargin: '10px 20% 0px'});
      expect(io.rootMargin).to.be('10px 20% 0px 20%');

      io = new IntersectionObserver(noop, {rootMargin: '0px 0px -5% 5px'});
      expect(io.rootMargin).to.be('0px 0px -5% 5px');

      // TODO(philipwalton): the polyfill supports fractional pixel and
      // percentage values, but the native Chrome implementation does not,
      // at least not in what it reports `rootMargin` to be.
      if (!supportsNativeIntersectionObserver()) {
        io = new IntersectionObserver(noop, {rootMargin: '-2.5% -8.5px'});
        expect(io.rootMargin).to.be('-2.5% -8.5px -2.5% -8.5px');
      }
    });


    it('throws when rootMargin is not in pixels or pecernt', function() {
      expect(function() {
        io = new IntersectionObserver(noop, {rootMargin: '0'});
      }).to.throwException(/pixels.*percent/i);
    });


    it('instantiates thresholds correctly', function() {
      io = new IntersectionObserver(noop);
      expect(io.thresholds).to.eql([0]);

      io = new IntersectionObserver(noop, {threshold: 0.5});
      expect(io.thresholds).to.eql([0.5]);

      io = new IntersectionObserver(noop, {threshold: [0.25, 0.5, 0.75]});
      expect(io.thresholds).to.eql([0.25, 0.5, 0.75]);

      io = new IntersectionObserver(noop, {threshold: [1, .5, 0]});
      expect(io.thresholds).to.eql([0, .5, 1]);
    });


    it('throws when a threshold value is not between 0 and 1', function() {
      expect(function() {
        io = new IntersectionObserver(noop, {threshold: [0, -1]});
      }).to.throwException(/threshold/i);
    });

  });


  describe('observe', function() {

    it('throws when target is not an Element', function() {
      expect(function() {
        io = new IntersectionObserver(noop);
        io.observe(null);
      }).to.throwException(/element/i);
    });


    it('triggers if target intersects when observing begins', function(done) {
      io = new IntersectionObserver(function(records) {
        expect(records.length).to.be(1);
        expect(records[0].intersectionRatio).to.be(1);
        done();
      }, {root: rootEl});
      io.observe(targetEl1);
    });


    it('triggers with the correct arguments', function(done) {
      io = new IntersectionObserver(function(records, observer) {
        expect(records.length).to.be(1);
        expect(records[0] instanceof IntersectionObserverEntry).to.be.ok();
        expect(observer).to.be(io);
        expect(this).to.be(io);
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
        expect(spy.callCount).to.be(0);
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
            expect(spy.callCount).to.be(1);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(1);
            expect(records[0].intersectionRatio).to.be(1);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          targetEl1.style.left = '-40px';
          setTimeout(function() {
            expect(spy.callCount).to.be(2);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(1);
            expect(records[0].intersectionRatio).to.be(0);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          parentEl.style.overflow = 'visible';
          setTimeout(function() {
            expect(spy.callCount).to.be(3);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(1);
            expect(records[0].intersectionRatio).to.be(1);
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
            expect(spy.callCount).to.be(1);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(1);
            expect(records[0].intersectionRatio).to.be.greaterThan(0.5);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          targetEl1.style.left = '-15px';
          setTimeout(function() {
            expect(spy.callCount).to.be(2);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(1);
            expect(records[0].intersectionRatio).to.be.lessThan(0.5);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          targetEl1.style.left = '-25px';
          setTimeout(function() {
            expect(spy.callCount).to.be(2);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          targetEl1.style.left = '-10px';
          setTimeout(function() {
            expect(spy.callCount).to.be(3);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(1);
            expect(records[0].intersectionRatio).to.be(0.5);
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
            expect(spy.callCount).to.be(1);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(2);
            expect(records[0].target).to.be(targetEl1);
            expect(records[0].intersectionRatio).to.be(0.25);
            expect(records[1].target).to.be(targetEl2);
            expect(records[1].intersectionRatio).to.be(0.75);
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
            expect(spy.callCount).to.be(2);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(3);
            expect(records[0].target).to.be(targetEl1);
            expect(records[0].intersectionRatio).to.be(0.75);
            expect(records[1].target).to.be(targetEl2);
            expect(records[1].intersectionRatio).to.be(0.25);
            expect(records[2].target).to.be(targetEl3);
            expect(records[2].intersectionRatio).to.be(0.25);
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
            expect(spy.callCount).to.be(3);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(3);
            expect(records[0].target).to.be(targetEl1);
            expect(records[0].intersectionRatio).to.be(1);
            expect(records[1].target).to.be(targetEl2);
            expect(records[1].intersectionRatio).to.be(0);
            expect(records[2].target).to.be(targetEl3);
            expect(records[2].intersectionRatio).to.be(0.75);
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
            expect(spy.callCount).to.be(4);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(1);
            expect(records[0].target).to.be(targetEl3);
            expect(records[0].intersectionRatio).to.be(1);
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
            expect(records.length).to.be(4);
            expect(records[0].target).to.be(targetEl1);
            expect(records[0].intersectionRatio).to.be(1);
            expect(records[1].target).to.be(targetEl2);
            expect(records[1].intersectionRatio).to.be(.5);
            expect(records[2].target).to.be(targetEl3);
            expect(records[2].intersectionRatio).to.be(.5);
            expect(records[3].target).to.be(targetEl4);
            expect(records[3].intersectionRatio).to.be(1);
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
            expect(records.length).to.be(3);
            expect(records[0].target).to.be(targetEl1);
            expect(records[0].intersectionRatio).to.be(0.5);
            expect(records[1].target).to.be(targetEl3);
            expect(records[1].intersectionRatio).to.be(0.5);
            expect(records[2].target).to.be(targetEl4);
            expect(records[2].intersectionRatio).to.be(0.5);
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
            expect(records.length).to.be(2);
            expect(records[0].target).to.be(targetEl1);
            expect(records[0].intersectionRatio).to.be(0.5);
            expect(records[1].target).to.be(targetEl4);
            expect(records[1].intersectionRatio).to.be(0.5);
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
            expect(records.length).to.be(3);
            expect(records[0].target).to.be(targetEl1);
            expect(records[0].intersectionRatio).to.be(0.5);
            expect(records[1].target).to.be(targetEl2);
            expect(records[1].intersectionRatio).to.be(0.5);
            expect(records[2].target).to.be(targetEl4);
            expect(records[2].intersectionRatio).to.be(0.25);
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
            expect(spy.callCount).to.be(1);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(1);
            expect(records[0].intersectionRatio).to.be(0);
            expect(records[0].target).to.be(targetEl2);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          targetEl1.style.top = '0px';
          targetEl1.style.left = '-20px';
          targetEl2.style.top = '-21px';
          targetEl2.style.left = '0px';
          setTimeout(function() {
            expect(spy.callCount).to.be(2);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(2);
            expect(records[0].intersectionRatio).to.be(0);
            expect(records[0].target).to.be(targetEl1);
            expect(records[1].intersectionRatio).to.be(0);
            expect(records[1].target).to.be(targetEl2);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          targetEl1.style.top = '-20px';
          targetEl1.style.left = '200px';
          targetEl2.style.top = '200px';
          targetEl2.style.left = '200px';

          setTimeout(function() {
            expect(spy.callCount).to.be(3);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(1);
            expect(records[0].intersectionRatio).to.be(0);
            expect(records[0].target).to.be(targetEl2);
            done();
          }, ASYNC_TIMEOUT);
        }
      ], done);

    });


    it('handles zero-size targets within the root coordinate space',
        function(done) {

      io = new IntersectionObserver(function(records) {
        expect(records.length).to.be(1);
        expect(records[0].intersectionRatio).to.be(0);
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
          setTimeout(function() {
            expect(spy.callCount).to.be(0);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          document.getElementById('fixtures').appendChild(rootEl);
          setTimeout(function() {
            expect(spy.callCount).to.be(0);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          parentEl.insertBefore(targetEl1, targetEl2);
          setTimeout(function() {
            expect(spy.callCount).to.be(1);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(1);
            expect(records[0].intersectionRatio).to.be(1);
            expect(records[0].target).to.be(targetEl1);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          grandParentEl.parentNode.removeChild(grandParentEl);
          setTimeout(function() {
            expect(spy.callCount).to.be(2);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(1);
            expect(records[0].intersectionRatio).to.be(0);
            expect(records[0].target).to.be(targetEl1);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          rootEl.appendChild(targetEl1);
          setTimeout(function() {
            expect(spy.callCount).to.be(3);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(1);
            expect(records[0].intersectionRatio).to.be(1);
            expect(records[0].target).to.be(targetEl1);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          rootEl.parentNode.removeChild(rootEl);
          setTimeout(function() {
            expect(spy.callCount).to.be(4);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(1);
            expect(records[0].intersectionRatio).to.be(0);
            expect(records[0].target).to.be(targetEl1);
            done();
          }, ASYNC_TIMEOUT);
        }
      ], done);
    });


    it('handles sub-root element scrolling', function(done) {
      io = new IntersectionObserver(function(records) {
        expect(records.length).to.be(1);
        expect(records[0].intersectionRatio).to.be(1);
        done();
      }, {root: rootEl});

      io.observe(targetEl3);
      setTimeout(function() {
        parentEl.scrollLeft = 40;
      }, 0);
    });


    it('supports CSS transitions and transforms', function(done) {
      if (!('transition' in document.body.style)) this.skip();

      io = new IntersectionObserver(function(records) {
        expect(records.length).to.be(1);
        expect(records[0].intersectionRatio).to.be(1);
        done();
      }, {root: rootEl, threshold: [1]});

      io.observe(targetEl1);
      setTimeout(function() {
        targetEl1.style.top = '200px';
        targetEl1.style.left = '200px';
        targetEl1.style.transform = 'translateX(-40px) translateY(-40px)';
      }, 0);
    });


    it('uses the viewport when no root is specified', function(done) {
      var viewportWidth = document.documentElement.clientWidth;
      var viewportHeight = document.documentElement.clientHeight;

      io = new IntersectionObserver(function(records) {
        expect(records.length).to.be(1);
        expect(records[0].rootBounds.top).to.be(0);
        expect(records[0].rootBounds.left).to.be(0);
        expect(records[0].rootBounds.right).to.be(viewportWidth);
        expect(records[0].rootBounds.width).to.be(viewportWidth);
        expect(records[0].rootBounds.bottom).to.be(viewportHeight);
        expect(records[0].rootBounds.height).to.be(viewportHeight);
        done();
      });
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
        expect(lastestRecords.length).to.be(1);
        expect(lastestRecords[0].intersectionRatio).to.be(1);
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
            expect(spy.callCount).to.be(1);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(2);
            expect(records[0].target).to.be(targetEl1);
            expect(records[0].intersectionRatio).to.be(1);
            expect(records[1].target).to.be(targetEl2);
            expect(records[1].intersectionRatio).to.be(1);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          io.unobserve(targetEl1);
          targetEl1.style.top = targetEl2.style.top = '0px';
          targetEl1.style.left = targetEl2.style.left = '-40px';
          setTimeout(function() {
            expect(spy.callCount).to.be(2);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(1);
            expect(records[0].target).to.be(targetEl2);
            expect(records[0].intersectionRatio).to.be(0);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          io.unobserve(targetEl2);
          targetEl1.style.top = targetEl2.style.top = '0px';
          targetEl1.style.left = targetEl2.style.left = '0px';
          setTimeout(function() {
            expect(spy.callCount).to.be(2);
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
            expect(spy.callCount).to.be(1);
            var records = sortRecords(spy.lastCall.args[0]);
            expect(records.length).to.be(2);
            expect(records[0].target).to.be(targetEl1);
            expect(records[0].intersectionRatio).to.be(1);
            expect(records[1].target).to.be(targetEl2);
            expect(records[1].intersectionRatio).to.be(1);
            done();
          }, ASYNC_TIMEOUT);
        },
        function(done) {
          io.disconnect();
          targetEl1.style.top = targetEl2.style.top = '0px';
          targetEl1.style.left = targetEl2.style.left = '-40px';
          setTimeout(function() {
            expect(spy.callCount).to.be(1);
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
