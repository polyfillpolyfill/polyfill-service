(function(extend, global){
  "use strict";
  var isCallable = (function(toString){
      var s = toString.call(toString),
          u = typeof u;
      return typeof global.alert === "object" ?
        function isCallable(f){
          return s === toString.call(f) || (!!f && typeof f.toString == u && typeof f.valueOf == u && /^\s*\bfunction\b/.test("" + f));
        }:
        function isCallable(f){
          return s === toString.call(f);
        }
      ;
  })(extend.prototype.toString);
  // isNode & isElement from http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
  //Returns true if it is a DOM node
  var isNode = function isNode(o){
    return (
      typeof Node === "object" ? o instanceof Node :
      o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
  }
  //Returns true if it is a DOM element
  var isElement = function isElement(o){
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
  );
  }
  var _isImmediateSupported = (function(){
    return !!global.setImmediate;
  })();
  var _doCheckCallback = (function(){
    if(_isImmediateSupported){
      return function _doCheckCallback(f){
        return setImmediate(f);
      };
    }else{
      return function _doCheckCallback(f){
        return setTimeout(f, 10);
      };
    }
  })();
  var _clearCheckCallback = (function(){
    if(_isImmediateSupported){
      return function _clearCheckCallback(id){
        clearImmediate(id);
      };
    }else{
      return function _clearCheckCallback(id){
        clearTimeout(id);
      };
    }
  })();
  var isNumeric=function isNumeric(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
  };
  var sameValue = function sameValue(x, y){
    if(x===y){
      return x !== 0 || 1 / x === 1 / y;
    }
    return x !== x && y !== y;
  };
  var isAccessorDescriptor = function isAccessorDescriptor(desc){
    if (typeof(desc) === 'undefined'){
      return false;
    }
    return ('get' in desc || 'set' in desc);
  };
  var isDataDescriptor = function isDataDescriptor(desc){
    if (typeof(desc) === 'undefined'){
      return false;
    }
    return ('value' in desc || 'writable' in desc);
  };

  var validateArguments = function validateArguments(O, callback, accept){
    if(typeof(O)!=='object'){
      // Throw Error
      throw new TypeError("Object.observeObject called on non-object");
    }
    if(isCallable(callback)===false){
      // Throw Error
      throw new TypeError("Object.observeObject: Expecting function");
    }
    if(Object.isFrozen(callback)===true){
      // Throw Error
      throw new TypeError("Object.observeObject: Expecting unfrozen function");
    }
    if (accept !== undefined) {
      if (!Array.isArray(accept)) {
        throw new TypeError("Object.observeObject: Expecting acceptList in the form of an array");
      }
    }
  };

  var Observer = (function Observer(){
    var wraped = [];
    var Observer = function Observer(O, callback, accept){
      validateArguments(O, callback, accept);
      if (!accept) {
        accept = ["add", "update", "delete", "reconfigure", "setPrototype", "preventExtensions"];
      }
      Object.getNotifier(O).addListener(callback, accept);
      if(wraped.indexOf(O)===-1){
        wraped.push(O);
      }else{
        Object.getNotifier(O)._checkPropertyListing();
      }
    };

    Observer.prototype.deliverChangeRecords = function Observer_deliverChangeRecords(O){
      Object.getNotifier(O).deliverChangeRecords();
    };

    wraped.lastScanned = 0;
    var f = (function f(wrapped){
            return function _f(){
              var i = 0, l = wrapped.length, startTime = new Date(), takingTooLong=false;
              for(i=wrapped.lastScanned; (i<l)&&(!takingTooLong); i++){
                if(_indexes.indexOf(wrapped[i]) > -1){
                  Object.getNotifier(wrapped[i])._checkPropertyListing();
                  takingTooLong=((new Date())-startTime)>100; // make sure we don't take more than 100 milliseconds to scan all objects
                }else{
                  wrapped.splice(i, 1);
                  i--;
                  l--;
                }
              }
              wrapped.lastScanned=i<l?i:0; // reset wrapped so we can make sure that we pick things back up
              _doCheckCallback(_f);
            };
          })(wraped);
    _doCheckCallback(f);
    return Observer;
  })();

  var Notifier = function Notifier(watching){
  var _listeners = [], _acceptLists = [], _updates = [], _updater = false, properties = [], values = [];
    var self = this;
    Object.defineProperty(self, '_watching', {
                enumerable: true,
                get: (function(watched){
                  return function(){
                    return watched;
                  };
                })(watching)
              });
    var wrapProperty = function wrapProperty(object, prop){
      var propType = typeof(object[prop]), descriptor = Object.getOwnPropertyDescriptor(object, prop);
      if((prop==='getNotifier')||isAccessorDescriptor(descriptor)||(!descriptor.enumerable)){
        return false;
      }
      if((object instanceof Array)&&isNumeric(prop)){
        var idx = properties.length;
        properties[idx] = prop;
        values[idx] = object[prop];
        return true;
      }
      (function(idx, prop){
        properties[idx] = prop;
        values[idx] = object[prop];
        Object.defineProperty(object, prop, {
          get: function(){
            return values[idx];
          },
          set: function(value){
            if(!sameValue(values[idx], value)){
              Object.getNotifier(object).queueUpdate(object, prop, 'update', values[idx]);
              values[idx] = value;
            }
          }
        });
      })(properties.length, prop);
      return true;
    };
    self._checkPropertyListing = function _checkPropertyListing(dontQueueUpdates){
      var object = self._watching, keys = Object.keys(object), i=0, l=keys.length;
      var newKeys = [], oldKeys = properties.slice(0), updates = [];
      var prop, queueUpdates = !dontQueueUpdates, propType, value, idx, aLength;

      if(object instanceof Array){
        aLength = self._oldLength;//object.length;
        //aLength = object.length;
      }

      for(i=0; i<l; i++){
        prop = keys[i];
        value = object[prop];
        propType = typeof(value);
        if((idx = properties.indexOf(prop))===-1){
          if(wrapProperty(object, prop)&&queueUpdates){
            self.queueUpdate(object, prop, 'add', null, object[prop]);
          }
        }else{
          if(!(object instanceof Array)||(isNumeric(prop))){
            if(values[idx] !== value){
              if(queueUpdates){
                self.queueUpdate(object, prop, 'update', values[idx], value);
              }
              values[idx] = value;
            }
          }
          oldKeys.splice(oldKeys.indexOf(prop), 1);
        }
      }

      if(object instanceof Array && object.length !== aLength){
        if(queueUpdates){
          self.queueUpdate(object, 'length', 'update', aLength, object);
        }
        self._oldLength = object.length;
      }

      if(queueUpdates){
        l = oldKeys.length;
        for(i=0; i<l; i++){
          idx = properties.indexOf(oldKeys[i]);
          self.queueUpdate(object, oldKeys[i], 'delete', values[idx]);
          properties.splice(idx,1);
          values.splice(idx,1);
        };
      }
    };
    self.addListener = function Notifier_addListener(callback, accept){
      var idx = _listeners.indexOf(callback);
      if(idx===-1){
        _listeners.push(callback);
        _acceptLists.push(accept);
      }
      else {
        _acceptLists[idx] = accept;
      }
    };
    self.removeListener = function Notifier_removeListener(callback){
      var idx = _listeners.indexOf(callback);
      if(idx>-1){
        _listeners.splice(idx, 1);
        _acceptLists.splice(idx, 1);
      }
    };
    self.listeners = function Notifier_listeners(){
      return _listeners;
    };
    self.queueUpdate = function Notifier_queueUpdate(what, prop, type, was){
      this.queueUpdates([{
        type: type,
        object: what,
        name: prop,
        oldValue: was
      }]);
    };
    self.queueUpdates = function Notifier_queueUpdates(updates){
      var self = this, i = 0, l = updates.length||0, update;
      for(i=0; i<l; i++){
        update = updates[i];
        _updates.push(update);
      }
      if(_updater){
        _clearCheckCallback(_updater);
      }
      _updater = _doCheckCallback(function(){
        _updater = false;
        self.deliverChangeRecords();
      });
    };
    self.deliverChangeRecords = function Notifier_deliverChangeRecords(){
      var i = 0, l = _listeners.length,
          //keepRunning = true, removed as it seems the actual implementation doesn't do this
          // In response to BUG #5
          retval;
      for(i=0; i<l; i++){
        if(_listeners[i]){
          var currentUpdates;
          if (_acceptLists[i]) {
            currentUpdates = [];
            for (var j = 0, updatesLength = _updates.length; j < updatesLength; j++) {
              if (_acceptLists[i].indexOf(_updates[j].type) !== -1) {
                currentUpdates.push(_updates[j]);
              }
            }
          }
          else {
            currentUpdates = _updates;
          }
          if (currentUpdates.length) {
            if(_listeners[i]===console.log){
              console.log(currentUpdates);
            }else{
              _listeners[i](currentUpdates);
            }
          }
        }
      }
      _updates=[];
    };
    self.notify = function Notifier_notify(changeRecord) {
      if (typeof changeRecord !== "object" || typeof changeRecord.type !== "string") {
        throw new TypeError("Invalid changeRecord with non-string 'type' property");
      }
      changeRecord.object = watching;
      self.queueUpdates([changeRecord]);
    };
    self._checkPropertyListing(true);
  };

  var _notifiers=[], _indexes=[];
  extend.getNotifier = function Object_getNotifier(O){
  var idx = _indexes.indexOf(O), notifier = idx>-1?_notifiers[idx]:false;
    if(!notifier){
      idx = _indexes.length;
      _indexes[idx] = O;
      notifier = _notifiers[idx] = new Notifier(O);
    }
    return notifier;
  };
  extend.observe = function Object_observe(O, callback, accept){
    // For Bug 4, can't observe DOM elements tested against canry implementation and matches
    if(!isElement(O)){
      return new Observer(O, callback, accept);
    }
  };
  extend.unobserve = function Object_unobserve(O, callback){
    validateArguments(O, callback);
    var idx = _indexes.indexOf(O),
        notifier = idx>-1?_notifiers[idx]:false;
    if (!notifier){
      return;
    }
    notifier.removeListener(callback);
    if (notifier.listeners().length === 0){
      _indexes.splice(idx, 1);
      _notifiers.splice(idx, 1);
    }
  };
})(Object, this);
