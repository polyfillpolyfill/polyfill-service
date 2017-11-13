(function (global){'use strict';

  // a WeakMap fallback for DOM nodes only used as key
  var DOMMap = global.WeakMap || (function () {

    var
      counter = 0,
      dispatched = false,
      drop = false,
      value
    ;

    function dispatch(key, ce, shouldDrop) {
      drop = shouldDrop;
      dispatched = false;
      value = undefined;
      key.dispatchEvent(ce);
    }

    function Handler(value) {
      this.value = value;
    }

    Handler.prototype.handleEvent = function handleEvent(e) {
      dispatched = true;
      if (drop) {
        e.currentTarget.removeEventListener(e.type, this, false);
      } else {
        value = this.value;
      }
    };

    function DOMMap() {
      counter++; // make id clashing highly improbable
      this.__ce__ = new Event(('@DOMMap:' + counter) + Math.random());
    }

    DOMMap.prototype = {
      'constructor': DOMMap,
      'delete': function del(key) {
        return dispatch(key, this.__ce__, true), dispatched;
      },
      'get': function get(key) {
        dispatch(key, this.__ce__, false);
        var v = value;
        value = undefined;
        return v;
      },
      'has': function has(key) {
        return dispatch(key, this.__ce__, false), dispatched;
      },
      'set': function set(key, value) {
        dispatch(key, this.__ce__, true);
        key.addEventListener(this.__ce__.type, new Handler(value), false);
        return this;
      },
    };

    return DOMMap;

  }());

  function Dict() {}
  Dict.prototype = (Object.create || Object)(null);

  // https://dom.spec.whatwg.org/#interface-eventtarget

  function createEventListener(type, callback, options) {
    function eventListener(e) {
      if (eventListener.once) {
        e.currentTarget.removeEventListener(
          e.type,
          callback,
          eventListener
        );
        eventListener.removed = true;
      }
      if (eventListener.passive) {
        e.preventDefault = createEventListener.preventDefault;
      }
      if (typeof eventListener.callback === 'function') {
        /* jshint validthis: true */
        eventListener.callback.call(this, e);
      } else if (eventListener.callback) {
        eventListener.callback.handleEvent(e);
      }
      if (eventListener.passive) {
        delete e.preventDefault;
      }
    }
    eventListener.type = type;
    eventListener.callback = callback;
    eventListener.capture = !!options.capture;
    eventListener.passive = !!options.passive;
    eventListener.once = !!options.once;
    // currently pointless but specs say to use it, so ...
    eventListener.removed = false;
    return eventListener;
  }

  createEventListener.preventDefault = function preventDefault() {
    global.console && global.console.warn && global.console.warn('Ignored attempt to preventDefault an event from a passive listener');
  };

  var
    Event = global.CustomEvent,
    dE = global.dispatchEvent,
    aEL = global.addEventListener,
    rEL = global.removeEventListener,
    counter = 0,
    increment = function () { counter++; },
    indexOf = [].indexOf || function indexOf(value){
      var length = this.length;
      while(length--) {
        if (this[length] === value) {
          break;
        }
      }
      return length;
    },
    getListenerKey = function (options) {
      return ''.concat(
        options.capture ? '1' : '0',
        options.passive ? '1' : '0',
        options.once ? '1' : '0'
      );
    },
    augment
  ;

  try {
    aEL('_', increment, {once: true});
    dE(new Event('_'));
    dE(new Event('_'));
    rEL('_', increment, {once: true});
  } catch(o_O) {}

  if (counter !== 1) {
    (function () {
      var dm = new DOMMap();
      function createAEL(aEL) {
        return function addEventListener(type, handler, options) {
          if (options && typeof options !== 'boolean') {
            var
              info = dm.get(this),
              key = getListenerKey(options),
              i, tmp, wrap
            ;
            if (!info) dm.set(this, (info = new Dict()));
            if (!(type in info)) info[type] = {
              handler: [],
              wrap: []
            };
            tmp = info[type];
            i = indexOf.call(tmp.handler, handler);
            if (i < 0) {
              i = tmp.handler.push(handler) - 1;
              tmp.wrap[i] = (wrap = new Dict());
            } else {
              wrap = tmp.wrap[i];
            }
            if (!(key in wrap)) {
              wrap[key] = createEventListener(type, handler, options);
              aEL.call(this, type, wrap[key], wrap[key].capture);
            }
          } else {
            aEL.call(this, type, handler, options);
          }
        };
      }
      function createREL(rEL) {
        return function removeEventListener(type, handler, options) {
          if (options && typeof options !== 'boolean') {
            var
              info = dm.get(this),
              key, i, tmp, wrap
            ;
            if (info && (type in info)) {
              tmp = info[type];
              i = indexOf.call(tmp.handler, handler);
              if (-1 < i) {
                key = getListenerKey(options);
                wrap = tmp.wrap[i];
                if (key in wrap) {
                  rEL.call(this, type, wrap[key], wrap[key].capture);
                  delete wrap[key];
                  // return if there are other wraps
                  for (key in wrap) return;
                  // otherwise remove all the things
                  tmp.handler.splice(i, 1);
                  tmp.wrap.splice(i, 1);
                  // if there are no other handlers
                  if (tmp.handler.length === 0)
                    // drop the info[type] entirely
                    delete info[type];
                }
              }
            }
          } else {
            rEL.call(this, type, handler, options);
          }
        };
      }

      augment = function (Constructor) {
        if (!Constructor) return;
        var proto = Constructor.prototype;
        proto.addEventListener = createAEL(proto.addEventListener);
        proto.removeEventListener = createREL(proto.removeEventListener);
      };

      if (global.EventTarget) {
        augment(EventTarget);
      } else {
        augment(global.Text);
        augment(global.Element || global.HTMLElement);
        augment(global.HTMLDocument);
        augment(global.Window || {prototype:global});
        augment(global.XMLHttpRequest);
      }

    }());
  }

}(self));
