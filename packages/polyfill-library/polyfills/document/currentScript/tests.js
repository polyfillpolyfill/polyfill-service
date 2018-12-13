/* eslint-env mocha, browser */
/* global proclaim */

var currentScriptDuringSynchronousEval = document.currentScript;

it('returns the current script element when invoked during synchronous evaluation', function () {
	var cs = currentScriptDuringSynchronousEval;
	proclaim.isNotNull(cs);
	proclaim.isTypeOf(cs, 'object');
	proclaim.equal(cs.nodeType, 1); // Node.ELEMENT_NODE
	proclaim.equal(cs.nodeName, 'SCRIPT');
	proclaim.equal(cs.tagName.toUpperCase(), 'SCRIPT');
	proclaim.equal(cs.ownerDocument, document);
	
	// The rest of this test is highly dependent on the inner workings of
	// Polyfill.io's test runner...
	proclaim.include(cs.src, 'http://localhost:9876/base/polyfills/document/currentScript/tests.js');
	proclaim.equal(cs.innerHTML, '');
});

it('returns null when not invoked during synchronous evaluation', function () {
	proclaim.isNull(document.currentScript);
});

// TOdO: Investigate why this fails when run under Karma iframe mode
it.skip('returns the current script element when invoked during dynamic evaluation', function () {
	var script = document.createElement('script');
	script.id = 'rnd' + (Math.random() * 1e9 | 0);
	script.innerHTML = 'if (document.currentScript === document.getElementById("' + script.id + '")) document.currentScript.className = "' + script.id + '";';
	document.body.appendChild(script);
	proclaim.equal(script.id, script.className);
	document.body.removeChild(script);
});
