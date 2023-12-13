
// document
if ((typeof WorkerGlobalScope === "undefined") && (typeof importScripts !== "function")) {

	if (self.HTMLDocument) { // IE8

		// HTMLDocument is an extension of Document.  If the browser has HTMLDocument but not Document, the former will suffice as an alias for the latter.
		self.Document = self.HTMLDocument;

	} else {

		// Create an empty function to act as the missing constructor for the document object, attach the document object as its prototype.  The function needs to be anonymous else it is hoisted and causes the feature detect to prematurely pass, preventing the assignments below being made.
		self.Document = self.HTMLDocument = document.constructor = (new Function('return function Document() {}')());
		self.Document.prototype = document;
	}
}
