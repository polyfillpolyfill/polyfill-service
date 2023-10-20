
// queueMicrotask
/* global Promise */
self.queueMicrotask = function queueMicrotask(microtask) {
  if (arguments.length < 1) {
    throw new TypeError(
      "queueMicrotask requires at least 1 argument, but only 0 were passed"
    );
  }

  if (typeof microtask != "function") {
    throw new TypeError("Argument 1 of queueMicrotask is not callable.");
  }

  Promise.resolve()
    .then(microtask)["catch"](function(e) {

      // TODO: implement a ErrorEvent polyfill and use that instead
      // new ErrorEvent("error", {
      //   message: e.message,
      //   filename: e.filename,
      //   lineno: e.lineno,
      //   colno: e.colno,
      //   error: e,
      //   bubbles: true,
      //   cancelable: true,
      //   composed: false
      // })

      var event = new Event('error', {
        cancelable: true,
        bubbles: true,
        composed: false
      });
      event.message = e.message;
      event.filename = e.filename
      event.lineno = e.lineno;
      event.error = e;

      self.dispatchEvent(
        event
      );


    
    });
};
