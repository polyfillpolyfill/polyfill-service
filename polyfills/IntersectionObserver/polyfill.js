/*
Copyright 2016 Google Inc. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
   http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
(function(scope) {
  // TODO: rootMargin are completely ignored for now

  var POLL_INTERVAL = 100;

  // Constructor
  var IntersectionObserver = function(callback, options) {
    options = options || {};

    if(!(callback instanceof Function)) {
      throw('callback needs to be a function');
    }

    if(options.root && !(options.root instanceof HTMLElement)) {
      throw('Root needs to be an HTMLElement');
    }

    this._callback = callback;
    this._root = options.root || null;
    this._rootMargin = options.rootMargin || [0, 0, 0, 0];
    this._thresholds = options.threshold || 0;
    this._init();
  };

  IntersectionObserver.prototype = {
    //
    // Public API
    //
    get root() {
      return this._root || document;
    },

    get rootMargin() {
      return '0';
    },

    get thresholds() {
      // 0 means call callback on every change
      // See note at http://rawgit.com/WICG/IntersectionObserver/master/index.html#intersection-observer-init
      if(this._thresholds === 0) {
        return 0;
      }
      if(this._thresholds instanceof Array) {
        return this._thresholds;
      }
      return [this._thresholds];
    },

    observe: function(target) {
      if(!(target instanceof HTMLElement)) {
        throw('Target needs to be an HTMLelement');
      }

      var root = this.root;
      var ancestor = target.parentNode;
      if(!root.contains(target)) {
        throw('Target must be descendant of root');
      }

      this._mutationObserver.observe(target, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
      this._observationTargets.set(target, {});
    },

    unobserve: function(target) {
      this._observationTargets.delete(target);
    },

    disconnect: function() {
      this._observationTargets.clear();
      this.root.removeEventListener('scroll', this._boundUpdate);
      this._mutationObserver.disconnect();
      this._descheduleCallback();
    },

    takeRecords: function() {
      this._update();
      this._descheduleCallback();
      var copy = this._queue.slice();
      this._queue = [];
      return copy;
    },

    //
    // Private API
    //
    _init: function() {
      this._observationTargets = new Map();
      this._boundUpdate = throttle(this._update.bind(this), POLL_INTERVAL);
      this.root.addEventListener('scroll', this._boundUpdate);
      this._mutationObserver = new MutationObserver(this._boundUpdate);
      this._queue = [];
    },

    _update: function() {
      var rootRect = this._rootRect();
      this._observationTargets.forEach(function(oldIntersectionEntry, target) {
        var targetRect = getBoundingClientRect(target);
        var intersectionRect = intersectRects(rootRect, targetRect);
        if(!intersectionRect) {
          return;
        }
        var targetArea = targetRect.width * targetRect.height;
        var intersectionArea = intersectionRect.width * intersectionRect.height;
        var intersectionRatio = intersectionArea / targetArea;
        if(!this._hasCrossedThreshold(oldIntersectionEntry.intersectionRatio, intersectionRatio)) {
          return;
        }
        var intersectionEntry = {
          time: scope.performance.now(),
          rootBounds: rootRect,
          boundingClientRect: targetRect,
          intersectionRect: intersectionRect,
          intersectionRatio: intersectionRatio,
          target: target
        };
        Object.freeze(intersectionEntry);
        this._queue.push(intersectionEntry);
        this._scheduleCallback();
        this._observationTargets.set(target, intersectionEntry);
      }.bind(this));
    },

    _scheduleCallback: function() {
      if(this._timeoutId) {
        return;
      }
      this._timeoutId = scope.setTimeout(function() {
        this._descheduleCallback();
        this._callback(this._queue, this);
        this._queue = [];
      }.bind(this), POLL_INTERVAL);
    },

    _descheduleCallback: function() {
      if(!this._timeoutId) {
        return;
      }
      scope.clearTimeout(this._timeoutId);
      this._timeoutId = null;
    },

    _rootRect: function() {
      if(this._root) {
        return getBoundingClientRect(this.root);
      }
      return {
        top: 0,
        left: 0,
        right: scope.innerWidth,
        width: scope.innerWidth,
        bottom: scope.innerHeight,
        height: scope.innerHeight
      };
    },

    // FIXME: so hack, much performance, very JSON
    _hasCrossedThreshold: function(oldRatio, newRatio) {
      if(this.thresholds === 0) {
        return newRatio != oldRatio;
      }
      var b1 = this.thresholds.map(function(threshold) {
        return threshold <= oldRatio;
      });
      var b2 = this.thresholds.map(function(threshold) {
        return threshold <= newRatio;
      });
      return JSON.stringify(b1) !== JSON.stringify(b2);
    }
  };

  var intersectRects = function(rect1, rect2) {
    var top = Math.max(rect1.top, rect2.top);
    var bottom = Math.min(rect1.bottom, rect2.bottom);
    var left = Math.max(rect1.left, rect2.left);
    var right = Math.min(rect1.right, rect2.right);
    var intersectionRect = {
      top: top,
      bottom: bottom,
      left: left,
      right: right,
      width: right-left,
      height: bottom-top
    };
    if(top > bottom) {
      intersectionRect.height = 0;
    }
    if(left > right) {
      intersectionRect.width = 0;
    }
    return intersectionRect;
  };

  scope.IntersectionObserver = IntersectionObserver;

  var throttle = function(fn, int) {
    var timer = null;
    return function () {
      if (timer) {
        return;
      }
      fn.apply(this, arguments);
      timer = setTimeout(function () {
        timer = null;
      }, int);
    };
  };

  var getBoundingClientRect = function(el) {
    var r = el.getBoundingClientRect();
    r.width = r.width || r.right - r.left;
    r.height = r.height || r.bottom - r.top;
    return r;
  };
})(this);
