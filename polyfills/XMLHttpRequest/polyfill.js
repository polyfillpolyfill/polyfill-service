(function(global) {
  if (!('window' in global && 'document' in global))
    return;

  //----------------------------------------------------------------------
  //
  // XMLHttpRequest
  // https://xhr.spec.whatwg.org
  //
  //----------------------------------------------------------------------

  // XMLHttpRequest interface
  // Needed for: IE7-
  global.XMLHttpRequest = global.XMLHttpRequest || function() {
    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (_) { }
    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (_) { }
    try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (_) { }
    throw Error("This browser does not support XMLHttpRequest.");
  };

  // XMLHttpRequest interface constants
  // Needed for IE8-
  XMLHttpRequest.UNSENT = 0;
  XMLHttpRequest.OPENED = 1;
  XMLHttpRequest.HEADERS_RECEIVED = 2;
  XMLHttpRequest.LOADING = 3;
  XMLHttpRequest.DONE = 4;

  // FormData interface
  // Needed for: IE9-
  (function() {
    if ('FormData' in global)
      return;

    function FormData(form) {
      this._data = [];
      if (!form) return;
      for (var i = 0; i < form.elements.length; ++i) {
        var element = form.elements[i];
        if (element.name !== '')
          this.append(element.name, element.value);
      }
    }

    FormData.prototype = {
      append: function(name, value /*, filename */) {
        if ('Blob' in global && value instanceof global.Blob)
          throw TypeError("Blob not supported");
        name = String(name);
        this._data.push([name, value]);
      },

      toString: function() {
        return this._data.map(function(pair) {
          return encodeURIComponent(pair[0]) + '=' + encodeURIComponent(pair[1]);
        }).join('&');
      }
    };

    global.FormData = FormData;
    var send = global.XMLHttpRequest.prototype.send;
    global.XMLHttpRequest.prototype.send = function(body) {
      if (body instanceof FormData) {
        this.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        arguments[0] = body.toString();
      }
      return send.apply(this, arguments);
    };
  }());

}(this));
