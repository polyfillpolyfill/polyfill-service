/* eslint-env mocha, browser */
/* global proclaim */

describe('dataset', function () {
	var element;

	beforeEach(function() {
		element = document.createElement('div');
		element.innerHTML = '<h1 id="dataset-tests" data-empty data-id="42" data-name-of-cheese="Red Leicester"></h1>';
		document.body.appendChild(element);
	});

	afterEach(function() {
		document.body.removeChild(element);
	});

	it('get', function () {

		var el = document.getElementById('dataset-tests');

		proclaim.equal(el.dataset.empty, '');
		proclaim.equal(el.dataset.id, '42');
		proclaim.equal(el.dataset.nameOfCheese, 'Red Leicester');
	});

	it('set', function () {
		var el = document.getElementById('dataset-tests');

		el.dataset.empty = 'not-empty';
		proclaim.equal(el.dataset.empty, 'not-empty');
		proclaim.equal(el.getAttribute('data-empty'), 'not-empty');
	});
});
