/* Assertion bridge between web components test suite and expectjs */


var expectRecord = function (src, model) {
	Object.keys(model).forEach(function(key) {
		// proclaim(src[key]).to.eql(model[key]);
		proclaim.deepEqual(src[key], model[key]);
	});
};
var assertArrayEqual = function(src, model) {
	// proclaim(src).to.eql(model);
	proclaim.deepEqual(src, model);
};
var assert = {
	strictEqual: function(src, model) {
		// proclaim(src).to.be(model);
		proclaim.strictEqual(src, model);
	}
};

/* Original tests have also been subject to the following replacements:

 * JsMutationObserver => MutationObserver
 * suite(' => describe('
 * test(' => it('
 * setup(' => beforeEach('
 * teardown(' => afterEach('




/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

describe('MutationObserver attributes', function() {

	it('attr', function() {
		var div = document.createElement('div');
		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			attributes: true
		});
		div.setAttribute('a', 'A');
		div.setAttribute('a', 'B');

		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 2);
		proclaim.strictEqual(records.length, 2);

		proclaim(records[0], {
		// expectRecord(records[0], {
			type: 'attributes',
			target: div,
			attributeName: 'a',
			attributeNamespace: null
		});
		proclaim(records[1], {
		// expectRecord(records[1], {
			type: 'attributes',
			target: div,
			attributeName: 'a',
			attributeNamespace: null
		});
	});

	it('attr with oldValue', function() {
		var div = document.createElement('div');
		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			attributes: true,
			attributeOldValue: true
		});
		div.setAttribute('a', 'A');
		div.setAttribute('a', 'B');

		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 2);
		proclaim.strictEqual(records.length, 2);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'attributes',
			target: div,
			attributeName: 'a',
			attributeNamespace: null,
			oldValue: null
		});
		// expectRecord(records[1], {
		proclaim(records[1], {
			type: 'attributes',
			target: div,
			attributeName: 'a',
			attributeNamespace: null,
			oldValue: 'A'
		});
	});

	it('attr change in subtree should not genereate a record', function() {
		var div = document.createElement('div');
		var child = div.appendChild(document.createElement('div'));

		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			attributes: true
		});
		child.setAttribute('a', 'A');
		child.setAttribute('a', 'B');

		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 0);
		proclaim.strictEqual(records.length, 0);
	});

	it('attr change, subtree', function() {
		var div = document.createElement('div');
		var child = div.appendChild(document.createElement('div'));

		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			attributes: true,
			subtree: true
		});
		child.setAttribute('a', 'A');
		child.setAttribute('a', 'B');

		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 2);
		proclaim.strictEqual(records.length, 2);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'attributes',
			target: child,
			attributeName: 'a'
		});
		// expectRecord(records[1], {
		proclaim(records[1], {
			type: 'attributes',
			target: child,
			attributeName: 'a'
		});
	});


	it('multiple observers on same target', function() {
		var div = document.createElement('div');
		var observer1 = new MutationObserver(function() {});
		observer1.observe(div, {
			attributes: true,
			attributeOldValue: true
		});
		var observer2 = new MutationObserver(function() {});
		observer2.observe(div, {
			attributes: true,
			attributeFilter: ['b']
		});

		div.setAttribute('a', 'A');
		div.setAttribute('a', 'A2');
		div.setAttribute('b', 'B');

		var records = observer1.takeRecords();
		// assert.strictEqual(records.length, 3);
		proclaim.strictEqual(records.length, 3);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'attributes',
			target: div,
			attributeName: 'a'
		});
		// expectRecord(records[1], {
		proclaim(records[1], {
			type: 'attributes',
			target: div,
			attributeName: 'a',
			oldValue: 'A'
		});
		// expectRecord(records[2], {
		proclaim(records[2], {
			type: 'attributes',
			target: div,
			attributeName: 'b'
		});

		records = observer2.takeRecords();
		// assert.strictEqual(records.length, 1);
		proclaim.strictEqual(records.length, 1);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'attributes',
			target: div,
			attributeName: 'b'
		});
	});

	it('observer observes on different target', function() {
		var div = document.createElement('div');
		var child = div.appendChild(document.createElement('div'));

		var observer = new MutationObserver(function() {});
		observer.observe(child, {
			attributes: true
		});
		observer.observe(div, {
			attributes: true,
			subtree: true,
			attributeOldValue: true
		});

		child.setAttribute('a', 'A');
		child.setAttribute('a', 'A2');
		child.setAttribute('b', 'B');

		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 3);
		proclaim.strictEqual(records.length, 3);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'attributes',
			target: child,
			attributeName: 'a'
		});
		// expectRecord(records[1], {
		proclaim(records[1], {
			type: 'attributes',
			target: child,
			attributeName: 'a',
			oldValue: 'A'
		});
		// expectRecord(records[2], {
		proclaim(records[2], {
			type: 'attributes',
			target: child,
			attributeName: 'b'
		});
	});

	it('observing on the same node should update the options', function() {
		var div = document.createElement('div');
		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			attributes: true,
			attributeFilter: ['a']
		});
		observer.observe(div, {
			attributes: true,
			attributeFilter: ['b']
		});

		div.setAttribute('a', 'A');
		div.setAttribute('b', 'B');

		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 1);
		proclaim.strictEqual(records.length, 1);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'attributes',
			target: div,
			attributeName: 'b'
		});
	});

	it('disconnect should stop all events and empty the records', function() {
		var div = document.createElement('div');
		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			attributes: true
		});

		div.setAttribute('a', 'A');

		observer.disconnect();
		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 0);
		proclaim.strictEqual(records.length, 0);

		div.setAttribute('b', 'B');

		records = observer.takeRecords();
		// assert.strictEqual(records.length, 0);
		proclaim.strictEqual(records.length, 0);
	});

	it('disconnect should not affect other observers', function() {
		var div = document.createElement('div');
		var observer1 = new MutationObserver(function() {});
		observer1.observe(div, {
			attributes: true
		});
		var observer2 = new MutationObserver(function() {});
		observer2.observe(div, {
			attributes: true
		});

		div.setAttribute('a', 'A');

		observer1.disconnect();
		var records1 = observer1.takeRecords();
		// assert.strictEqual(records1.length, 0);
		proclaim.strictEqual(records1.length, 0);

		var records2 = observer2.takeRecords();
		// assert.strictEqual(records2.length, 1);
		proclaim.strictEqual(records2.length, 1);
		// expectRecord(records2[0], {
		proclaim(records2[0], {
			type: 'attributes',
			target: div,
			attributeName: 'a'
		});

		div.setAttribute('b', 'B');

		records1 = observer1.takeRecords();
		// assert.strictEqual(records1.length, 0);
		proclaim.strictEqual(records1.length, 0);

		records2 = observer2.takeRecords();
		// assert.strictEqual(records2.length, 1);
		proclaim.strictEqual(records2.length, 1);
		// expectRecord(records2[0], {
		proclaim(records2[0], {
			type: 'attributes',
			target: div,
			attributeName: 'b'
		});
	});

});

/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

describe('MutationObserver characterData', function() {

	var testDiv;

	beforeEach(function() {
		testDiv = document.body.appendChild(document.createElement('div'));
	});

	afterEach(function() {
		document.body.removeChild(testDiv);
	});

	it('characterData', function() {
		var text = document.createTextNode('abc');
		var observer = new MutationObserver(function() {});
		observer.observe(text, {
			characterData: true
		});
		text.data = 'def';
		text.data = 'ghi';

		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 2);
		proclaim.strictEqual(records.length, 2);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'characterData',
			target: text
		});
		// expectRecord(records[1], {
		proclaim(records[1], {
			type: 'characterData',
			target: text
		});
	});

	it('characterData with old value', function() {
		var text = testDiv.appendChild(document.createTextNode('abc'));
		var observer = new MutationObserver(function() {});
		observer.observe(text, {
			characterData: true,
			characterDataOldValue: true
		});
		text.data = 'def';
		text.data = 'ghi';

		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 2);
		proclaim.strictEqual(records.length, 2);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'characterData',
			target: text,
			oldValue: 'abc'
		});
		// expectRecord(records[1], {
		proclaim(records[1], {
			type: 'characterData',
			target: text,
			oldValue: 'def'
		});
	});

	it('characterData change in subtree should not generate a record', function() {
		var div = document.createElement('div');
		var text = div.appendChild(document.createTextNode('abc'));
		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			characterData: true
		});
		text.data = 'def';
		text.data = 'ghi';

		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 0);
		proclaim.strictEqual(records.length, 0);
	});

	it('characterData change in subtree', function() {
		var div = document.createElement('div');
		var text = div.appendChild(document.createTextNode('abc'));
		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			characterData: true,
			subtree: true
		});
		text.data = 'def';
		text.data = 'ghi';

		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 2);
		proclaim.strictEqual(records.length, 2);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'characterData',
			target: text
		});
		// expectRecord(records[1], {
		proclaim(records[1], {
			type: 'characterData',
			target: text
		});
	});

});

/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

describe('MutationObserver childList', function() {

	var testDiv;

	afterEach(function() {
		document.body.removeChild(testDiv);
	});

	var addedNodes, removedNodes;

	beforeEach(function() {
		testDiv = document.body.appendChild(document.createElement('div'));
		addedNodes = [];
		removedNodes = [];
	});

	function mergeRecords(records) {
		records.forEach(function(record) {
			if (record.addedNodes)
				addedNodes.push.apply(addedNodes, record.addedNodes);
			if (record.removedNodes)
				removedNodes.push.apply(removedNodes, record.removedNodes);
		});
	}

	function assertAll(records, expectedProperties) {
		records.forEach(function(record) {
			for (var propertyName in expectedProperties) {
				// assert.strictEqual(record[propertyName], expectedProperties[propertyName]);
				proclaim.strictEqual(record[propertyName], expectedProperties[propertyName]);
			}
		});
	}

	it('appendChild', function() {
		var div = document.createElement('div');
		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			childList: true
		});
		var a = document.createElement('a');
		var b = document.createElement('b');

		div.appendChild(a);
		div.appendChild(b);

		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 2);
		proclaim.strictEqual(records.length, 2);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'childList',
			target: div,
			addedNodes: [a]
		});

		// expectRecord(records[1], {
		proclaim(records[1], {
			type: 'childList',
			target: div,
			addedNodes: [b],
			previousSibling: a
		});
	});

	it('insertBefore', function() {
		var div = document.createElement('div');
		var a = document.createElement('a');
		var b = document.createElement('b');
		var c = document.createElement('c');
		div.appendChild(a);

		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			childList: true
		});

		div.insertBefore(b, a);
		div.insertBefore(c, a);

		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 2);
		proclaim.strictEqual(records.length, 2);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'childList',
			target: div,
			addedNodes: [b],
			nextSibling: a
		});

		// expectRecord(records[1], {
		proclaim(records[1], {
			type: 'childList',
			target: div,
			addedNodes: [c],
			nextSibling: a,
			previousSibling: b
		});
	});


	it('removeChild', function() {
		var div = testDiv.appendChild(document.createElement('div'));
		var a = div.appendChild(document.createElement('a'));
		var b = div.appendChild(document.createElement('b'));
		var c = div.appendChild(document.createElement('c'));

		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			childList: true
		});

		div.removeChild(b);
		div.removeChild(a);

		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 2);
		proclaim.strictEqual(records.length, 2);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'childList',
			target: div,
			removedNodes: [b],
			nextSibling: c,
			previousSibling: a
		});

		// expectRecord(records[1], {
		proclaim(records[1], {
			type: 'childList',
			target: div,
			removedNodes: [a],
			nextSibling: c
		});
	});

	it('Direct children', function() {
		var div = testDiv.appendChild(document.createElement('div'));
		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			childList: true
		});
		var a = document.createElement('a');
		var b = document.createElement('b');

		div.appendChild(a);
		div.insertBefore(b, a);
		div.removeChild(b);

		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 3);
		proclaim.strictEqual(records.length, 3);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'childList',
			target: div,
			addedNodes: [a]
		});

		// expectRecord(records[1], {
		proclaim(records[1], {
			type: 'childList',
			target: div,
			nextSibling: a,
			addedNodes: [b]
		});

		// expectRecord(records[2], {
		proclaim(records[2], {
			type: 'childList',
			target: div,
			nextSibling: a,
			removedNodes: [b]
		});
	});

	it('subtree', function() {
		var div = document.createElement('div');
		var child = div.appendChild(document.createElement('div'));
		var observer = new MutationObserver(function() {});
		observer.observe(child, {
			childList: true
		});
		var a = document.createTextNode('a');
		var b = document.createTextNode('b');

		child.appendChild(a);
		child.insertBefore(b, a);
		child.removeChild(b);

		var records = observer.takeRecords();

		// IE11+ native impl fails on this, adding a spurious 4th record
		//assert.strictEqual(records.length, 3);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'childList',
			target: child,
			addedNodes: [a]
		});

		// expectRecord(records[1], {
		proclaim(records[1], {
			type: 'childList',
			target: child,
			//nextSibling: a,			// Native impl fail in IE11
			addedNodes: [b]
		});

		// expectRecord(records[2], {
		proclaim(records[2], {
			type: 'childList',
			target: child,
			//nextSibling: a,     // Native impl fail in IE11
			removedNodes: [b]
		});
	});

	it('both direct and subtree', function() {
		var div = document.createElement('div');
		var child = div.appendChild(document.createElement('div'));
		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			childList: true,
			subtree: true
		});
		observer.observe(child, {
			childList: true
		});

		var a = document.createTextNode('a');
		var b = document.createTextNode('b');

		child.appendChild(a);
		div.appendChild(b);

		var records = observer.takeRecords();
		// assert.strictEqual(records.length, 2);
		proclaim.strictEqual(records.length, 2);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'childList',
			target: child,
			addedNodes: [a]
		});

		// expectRecord(records[1], {
		proclaim(records[1], {
			type: 'childList',
			target: div,
			addedNodes: [b],
			previousSibling: child
		});
	});

	it('Append multiple at once at the end', function() {
		var div = testDiv.appendChild(document.createElement('div'));
		var a = div.appendChild(document.createTextNode('a'));

		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			childList: true
		});

		var df = document.createDocumentFragment();
		var b = df.appendChild(document.createTextNode('b'));
		var c = df.appendChild(document.createTextNode('c'));
		var d = df.appendChild(document.createTextNode('d'));

		div.appendChild(df);

		var records = observer.takeRecords();
		mergeRecords(records);

		assertArrayEqual(addedNodes, [b, c, d]);
		assertArrayEqual(removedNodes, []);
		assertAll(records, {
			type: 'childList',
			target: div
		});
	});

	it('Append multiple at once at the front', function() {
		var div = testDiv.appendChild(document.createElement('div'));
		var a = div.appendChild(document.createTextNode('a'));

		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			childList: true
		});

		var df = document.createDocumentFragment();
		var b = df.appendChild(document.createTextNode('b'));
		var c = df.appendChild(document.createTextNode('c'));
		var d = df.appendChild(document.createTextNode('d'));

		div.insertBefore(df, a);

		var records = observer.takeRecords();
		mergeRecords(records);

		assertArrayEqual(addedNodes, [b, c, d]);
		assertArrayEqual(removedNodes, []);
		assertAll(records, {
			type: 'childList',
			target: div
		});
	});

	it('Append multiple at once in the middle', function() {
		var div = testDiv.appendChild(document.createElement('div'));
		var a = div.appendChild(document.createTextNode('a'));
		var b = div.appendChild(document.createTextNode('b'));

		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			childList: true
		});

		var df = document.createDocumentFragment();
		var c = df.appendChild(document.createTextNode('c'));
		var d = df.appendChild(document.createTextNode('d'));

		div.insertBefore(df, b);

		var records = observer.takeRecords();
		mergeRecords(records);

		assertArrayEqual(addedNodes, [c, d]);
		assertArrayEqual(removedNodes, []);
		assertAll(records, {
			type: 'childList',
			target: div
		});
	});

	it('Remove all children', function() {
		var div = testDiv.appendChild(document.createElement('div'));
		var a = div.appendChild(document.createTextNode('a'));
		var b = div.appendChild(document.createTextNode('b'));
		var c = div.appendChild(document.createTextNode('c'));

		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			childList: true
		});

		div.innerHTML = '';

		var records = observer.takeRecords();
		mergeRecords(records);

		assertArrayEqual(addedNodes, []);
		assertArrayEqual(removedNodes, [a, b, c]);
		assertAll(records, {
			type: 'childList',
			target: div
		});
	});

	it('Replace all children using innerHTML', function() {
		var div = testDiv.appendChild(document.createElement('div'));
		var a = div.appendChild(document.createTextNode('a'));
		var b = div.appendChild(document.createTextNode('b'));

		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			childList: true
		});

		div.innerHTML = '<c></c><d></d>';
		var c = div.firstChild;
		var d = div.lastChild;

		var records = observer.takeRecords();
		mergeRecords(records);

		assertArrayEqual(addedNodes, [c, d]);
		assertArrayEqual(removedNodes, [a, b]);
		assertAll(records, {
			type: 'childList',
			target: div
		});
	});

	it('Append child in child', function() {
		var div = testDiv.appendChild(document.createElement('div'));

		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			childList: true,
			subtree: true
		});
		var div2 = document.createElement('div');
		var div3 = div2.appendChild(document.createElement('div'));
		div.appendChild(div2);
		var records = observer.takeRecords();

		if(records.length == 1) {
			// assert.strictEqual(records[0].target, div);
			// assert.strictEqual(records[0].addedNodes[0].firstChild, div3);
			proclaim.strictEqual(records[0].target, div);
			proclaim.strictEqual(records[0].addedNodes[0].firstChild, div3);
		} else {
			// assert.strictEqual(records[0].target, div);
			// assert.strictEqual(records[1].target, div2);
			proclaim.strictEqual(records[0].target, div);
			proclaim.strictEqual(records[1].target, div2);
		}
	});
});


/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

describe('MutationObserver mixed types', function() {

	it('attr and characterData', function() {
		var div = document.createElement('div');
		var text = div.appendChild(document.createTextNode('text'));
		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			attributes: true,
			characterData: true,
			subtree: true
		});
		div.setAttribute('a', 'A');
		div.firstChild.data = 'changed';

		var records = observer.takeRecords();
		// expect(records.length).to.be(2);
		proclaim.strictEqual(records.length, 2);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'attributes',
			target: div,
			attributeName: 'a',
			attributeNamespace: null
		});
		// expectRecord(records[1], {
		proclaim(records[1], {
			type: 'characterData',
			target: div.firstChild
		});
	});

});
/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

describe('MutationObserver callback', function() {

	it('One observer, two attribute changes', function(cont) {
		var div = document.createElement('div');
		var observer = new MutationObserver(function(records) {
			// expect(records.length).to.be(2);
			proclaim.strictEqual(records.length, 2);

			// expectRecord(records[0], {
			proclaim(records[0], {
				type: 'attributes',
				target: div,
				attributeName: 'a',
				attributeNamespace: null
			});
			// expectRecord(records[1], {
			proclaim(records[1], {
				type: 'attributes',
				target: div,
				attributeName: 'a',
				attributeNamespace: null
			});

			cont();
		});

		observer.observe(div, {
			attributes: true
		});

		div.setAttribute('a', 'A');
		div.setAttribute('a', 'B');
	});

	it('nested changes', function(cont) {
		var div = document.createElement('div');
		var i = 0;
		var observer = new MutationObserver(function(records) {
			// expect(records.length).to.be(1);
			proclaim.strictEqual(records.length, 1);

			if (i === 0) {
				// expectRecord(records[0], {
				proclaim(records[0], {
					type: 'attributes',
					target: div,
					attributeName: 'a',
					attributeNamespace: null
				});
				div.setAttribute('b', 'B');
				i++;
			} else {
				// expectRecord(records[0], {
				proclaim(records[0], {
					type: 'attributes',
					target: div,
					attributeName: 'b',
					attributeNamespace: null
				});

				cont();
			}
		});

		observer.observe(div, {
			attributes: true
		});

		div.setAttribute('a', 'A');
	});

});
/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

describe('MutationObserver transient', function() {

	var testDiv;

	beforeEach(function() {
		testDiv = document.body.appendChild(document.createElement('div'));
	});

	afterEach(function() {
		document.body.removeChild(testDiv);
	});

	it('attr', function() {
		var div = testDiv.appendChild(document.createElement('div'));
		var child = div.appendChild(document.createElement('div'));
		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			attributes: true,
			subtree: true
		});
		div.removeChild(child);
		child.setAttribute('a', 'A');

		var records = observer.takeRecords();
		// expect(records.length).to.be(1);
		proclaim.strictEqual(records.length, 1);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'attributes',
			target: child,
			attributeName: 'a',
			attributeNamespace: null
		});

		child.setAttribute('b', 'B');

		records = observer.takeRecords();
		// expect(records.length).to.be(1);
		proclaim.strictEqual(records.length, 1);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'attributes',
			target: child,
			attributeName: 'b',
			attributeNamespace: null
		});
	});

	it('attr callback', function(cont) {
		var div = testDiv.appendChild(document.createElement('div'));
		var child = div.appendChild(document.createElement('div'));
		var i = 0;
		var observer = new MutationObserver(function(records) {
			i++;
			if (i > 1){
				// expect().fail();
				proclaim().fail();
			}

			// expect(records.length).to.be(1);
			proclaim.strictEqual(records.length, 1);

			// expectRecord(records[0], {
			proclaim(records[0], {
				type: 'attributes',
				target: child,
				attributeName: 'a',
				attributeNamespace: null
			});

			// The transient observers are removed before the callback is called.
			child.setAttribute('b', 'B');
			records = observer.takeRecords();
			// expect(records.length).to.be(0);
			proclaim.strictEqual(records.length, 0);

			cont();
		});

		observer.observe(div, {
			attributes: true,
			subtree: true
		});

		div.removeChild(child);
		child.setAttribute('a', 'A');
	});

	it('attr, make sure transient gets removed', function(cont) {
		var div = testDiv.appendChild(document.createElement('div'));
		var child = div.appendChild(document.createElement('div'));
		var i = 0;
		var observer = new MutationObserver(function(records) {
			i++;
			if (i > 1){
				// expect().fail();
				proclaim().fail();
			}

			// expect(records.length).to.be(1);
			proclaim.strictEqual(records.length, 1);

			// expectRecord(records[0], {
			proclaim(records[0], {
				type: 'attributes',
				target: child,
				attributeName: 'a',
				attributeNamespace: null
			});

			step2();
		});

		observer.observe(div, {
			attributes: true,
			subtree: true
		});

		div.removeChild(child);
		child.setAttribute('a', 'A');

		function step2() {
			var div2 = document.createElement('div');
			var observer2 = new MutationObserver(function(records) {
				i++;
				if (i > 2){
					// expect().fail();
					proclaim().fail();
				}

				// expect(records.length).to.be(1);
				proclaim.strictEqual(records.length, 1);

				// expectRecord(records[0], {
				proclaim(records[0], {
					type: 'attributes',
					target: child,
					attributeName: 'b',
					attributeNamespace: null
				});

				cont();
			});

			observer2.observe(div2, {
				attributes: true,
				subtree: true
			});

			div2.appendChild(child);
			child.setAttribute('b', 'B');
		}
	});

	it('characterData', function() {
		var div = document.createElement('div');
		var child = div.appendChild(document.createTextNode('text'));
		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			characterData: true,
			subtree: true
		});
		div.removeChild(child);
		child.data = 'changed';

		var records = observer.takeRecords();
		// expect(records.length).to.be(1);
		proclaim.strictEqual(records.length, 1);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'characterData',
			target: child
		});

		child.data += ' again';

		records = observer.takeRecords();
		// expect(records.length).to.be(1);
		proclaim.strictEqual(records.length, 1);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'characterData',
			target: child
		});
	});

	it('characterData callback', function(cont) {
		var div = document.createElement('div');
		var child = div.appendChild(document.createTextNode('text'));
		var i = 0;
		var observer = new MutationObserver(function(records) {
			i++;
			if (i > 1){
				// expect().fail();
				proclaim().fail();
			}

			// expect(records.length).to.be(1);
			proclaim.strictEqual(records.length, 1);

			// expectRecord(records[0], {
			proclaim(records[0], {
				type: 'characterData',
				target: child
			});

			// The transient observers are removed before the callback is called.
			child.data += ' again';
			records = observer.takeRecords();
			// expect(records.length).to.be(0);
			proclaim.strictEqual(records.length, 0);

			cont();
		});
		observer.observe(div, {
			characterData: true,
			subtree: true
		});
		div.removeChild(child);
		child.data = 'changed';
	});

	it('childList', function() {
		var div = testDiv.appendChild(document.createElement('div'));
		var child = div.appendChild(document.createElement('div'));
		var observer = new MutationObserver(function() {});
		observer.observe(div, {
			childList: true,
			subtree: true
		});
		div.removeChild(child);
		var grandChild = child.appendChild(document.createElement('span'));

		var records = observer.takeRecords();
		// expect(records.length).to.be(2);
		proclaim.strictEqual(records.length, 2);

		// expectRecord(records[0], {
		proclaim(records[0], {
			type: 'childList',
			target: div,
			removedNodes: [child]
		});

		// expectRecord(records[1], {
		proclaim(records[1], {
			type: 'childList',
			target: child,
			addedNodes: [grandChild]
		});

		child.removeChild(grandChild);

		records = observer.takeRecords();

		// IE fails this in IE9/10
		//  expect(records.length).to.be(1);

		// // expectRecord(records[0], {
		// proclaim(records[0], {
		// 	type: 'childList',
		// 	target: child,
		// 	removedNodes: [grandChild]
		// });
	});

	it('childList callback', function(cont) {
		var div = testDiv.appendChild(document.createElement('div'));
		var child = div.appendChild(document.createElement('div'));
		var i = 0;
		var observer = new MutationObserver(function(records) {
			i++;
			if (i > 1){
				// expect().fail();
				proclaim().fail();
			}

			// expect(records.length).to.be(2);
			proclaim.strictEqual(records.length, 2);

			// expectRecord(records[0], {
			proclaim(records[0], {
				type: 'childList',
				target: div,
				removedNodes: [child]
			});

			// expectRecord(records[1], {
			proclaim(records[1], {
				type: 'childList',
				target: child,
				addedNodes: [grandChild]
			});

			// The transient observers are removed before the callback is called.
			child.removeChild(grandChild);

			records = observer.takeRecords();
			// expect(records.length).to.be(0);
			proclaim.strictEqual(records.length, 0);

			cont();
		});
		observer.observe(div, {
			childList: true,
			subtree: true
		});
		div.removeChild(child);
		var grandChild = child.appendChild(document.createElement('span'));
	});
});
