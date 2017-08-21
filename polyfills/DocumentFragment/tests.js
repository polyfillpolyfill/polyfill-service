/* eslint-env mocha, browser*/
/* global proclaim, it */

it('is the DocumentFragment constructor', function () {
	proclaim.equal(self.DocumentFragment, document.createDocumentFragment().constructor);
});
