/* eslint-env mocha, browser */
/* global proclaim, it */

var currentScriptDuringSynchronousEval = document.currentScript;

it('returns the current script element when invoked during synchronous evaluation', function () {
	var cs = currentScriptDuringSynchronousEval;

	proclaim.isNotNull(cs);
	proclaim.isTypeOf(cs, 'object');
	proclaim.equal(cs.nodeType, 1);  // Node.ELEMENT_NODE
	proclaim.equal(cs.nodeName, 'SCRIPT');
	proclaim.equal(cs.tagName.toUpperCase(), 'SCRIPT');
	proclaim.equal(cs.ownerDocument, document);

	// The rest of this test is highly dependent on the inner workings of
	// Polyfill.io's test runner...
	proclaim.equal(cs.src, '');
	proclaim.include(cs.innerHTML, 'describe(\'document.currentScript\',');
});

it('returns null when not invoked during synchronous evaluation', function () {
	proclaim.isNull(document.currentScript);
});
