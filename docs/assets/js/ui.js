/* global google */
'use strict';

function initDemos() {
	Array.from(document.querySelectorAll('.demo')).forEach(function(el) {
		var code = document.createElement('pre');
		var xhr = new XMLHttpRequest();
		xhr.open("get", el.getAttribute('data-src'));
		xhr.addEventListener('load', function() {
			el.textContent = this.responseText;
		});
		xhr.send();
		code.classList.add('prettyprint');
		code.innerHTML = '<code>&lt;script src="' + el.getAttribute('data-src') + '"&gt;&lt;/script&gt;</code>';
		el.textContent = 'Loading...';
		el.parentNode.insertBefore(code, el);
	});
}

function initCharts() {
	var drawFns = [];

	if (!document.getElementById('chart-requests') || !google || !google.charts) return;

	google.charts.load('current', {'packages':['corechart']});

	google.charts.setOnLoadCallback(function() {
		var chartel = document.getElementById('chart-requests');
		if (!chartel) return;
		var chart = new google.visualization.LineChart(chartel);
		var fn = chart.draw.bind(chart,
			google.visualization.arrayToDataTable(
				Array.from(chartel.querySelectorAll('tr')).map(function(rowel) {
					return Array.from(rowel.querySelectorAll('td,th')).map(function(cellel) {
						return isNaN(cellel.textContent) ? cellel.textContent : parseFloat(cellel.textContent);
					});
				})
			), {
				chartArea: { left: 0, top: 0, width: '100%', height: '90%' },
				hAxis: { title: 'Time (by day)' },
				vAxis: { textPosition: 'in', minValue: 0 },
				legend: {position: 'none' }
			}
		);
		drawFns.push(fn);
		fn();
	});

	google.charts.setOnLoadCallback(function() {
		var chartel = document.getElementById('chart-hitratio');
		if (!chartel) return;
		var chart = new google.visualization.PieChart(chartel);
		var fn = chart.draw.bind(chart,
			google.visualization.arrayToDataTable(
				Array.from(chartel.querySelectorAll('tr')).map(function(rowel) {
					return Array.from(rowel.querySelectorAll('td,th')).map(function(cellel) {
						return isNaN(cellel.textContent) ? cellel.textContent : parseFloat(cellel.textContent);
					});
				})
			), {
				pieHole: 0.6,
				chartArea: { left: '5%', top: '5%', width: '100%', height: '90%' },
				legend: { position: 'labeled' },
				pieSliceText: 'none'
			}
		);
		drawFns.push(fn);
		fn();
	});

	google.charts.setOnLoadCallback(function() {
		var chartel = document.getElementById('chart-resptime');
		if (!chartel) return;
		var chart = new google.visualization.LineChart(chartel);
		var fn = chart.draw.bind(chart,
			google.visualization.arrayToDataTable(
				Array.from(chartel.querySelectorAll('tr')).map(function(rowel) {
					return Array.from(rowel.querySelectorAll('td,th')).map(function(cellel) {
						return isNaN(cellel.textContent) ? cellel.textContent : parseFloat(cellel.textContent);
					});
				})
			), {
				chartArea: { left: 30, top: 10, width: '100%', height: '80%' },
				legend: { position: 'none' },
				hAxis: { textPosition: 'none' },
				vAxis: { minValue: 0 }
			}
		);
		drawFns.push(fn);
		fn();
	});

	window.addEventListener('resize', function() {
		drawFns.forEach(function(fn) { fn(); });
	});
}

function initTestCurrentBrowser() {
	var testsRunning = false;
	var resultsByFeature = {};

	function runTests() {
		window.receiveTestResult = processLiveResult;
		if ('postMessage' in window) {
			window.addEventListener("message", function(msg) {
				var data;
				try {
					data = JSON.parse(msg.data);
				} catch (e) {
					return;
				}
				processLiveResult(data.featureName, data.result, data.mode);
			}, false);
		}
		['control', 'all'].forEach(function(mode) {
			var ifr = document.createElement('iframe');
			ifr.className = 'testFrame testFrame--' + mode;
			document.body.appendChild(ifr);
			ifr.src = '/test/director?mode=' + mode;
		});
	}

	function processLiveResult(featureName, result, mode) {
		resultsByFeature[featureName] = resultsByFeature[featureName] || {};
		resultsByFeature[featureName][mode] = result;
		if ('control' in resultsByFeature[featureName] && 'all' in resultsByFeature[featureName]) {
			var status =
				(resultsByFeature[featureName].control === 'pass') ? 'native' :
				(resultsByFeature[featureName].all === 'pass') ? 'polyfilled' :
				(resultsByFeature[featureName].all === 'fail') ? 'missing' :
				'unknown';
			var resultCell = document.querySelector('#' + slugify(featureName) + ' .compatibility__live');
			if (resultCell) {
				resultCell.innerHTML =
					'<span class="status-' + status + '">' + status + '</span>';
			}
		}
	}

	function slugify(str) {
		return str.replace(/[^\w]/g, '_');
	}
	Array.from(document.querySelectorAll('.compatMode')).forEach(function(radio) {
		radio.addEventListener('change', function() {
			Array.from(document.querySelectorAll('.compatMode')).forEach(function(el) {
				if (el.checked === true) {
					var cl = document.querySelector('.compatibility').classList;
					cl.remove('compatibility--data', 'compatibility--live');
					cl.add('compatibility--' + el.value);
					if (el.value === 'live' && !testsRunning) {
						runTests();
						testsRunning = true;
					}
				}
			});
		});
	});
}

function initNotesToggles() {
	Array.from(document.querySelectorAll('.notes-toggle')).forEach(function(el) {
		el.addEventListener('click', function() {
			el.closest('.feature').classList.toggle('show-notes');
		});
	});
}

function initFeatureFilter() {
	var filterInput = document.getElementById('filter-features');
	var featuresCache = {};
	var featuresRows;

	if (!filterInput) return;

	featuresRows = document.querySelectorAll('tr.feature');
	Array.from(featuresRows).forEach(function (el) {
		featuresCache[el.getAttribute('data-feature-name')] = el;
	});
	filterInput.addEventListener('keyup', filterFeatures);
	filterInput.addEventListener('paste', filterFeatures);

	function resetFeaturesList() {
		return Array.from(featuresRows).forEach(function(el) {
			el.removeAttribute('aria-hidden');
		});
	}

	function filterFeatures(e) {
		var inputVal = e.target.value;

		if (e.type === 'paste') {
			var clipboardData = e.clipboardData || window.clipboardData;
			inputVal = clipboardData.getData('Text');
		}

		if (inputVal === '') resetFeaturesList();

		Object.keys(featuresCache).map(function (key) {
			var featureEl = featuresCache[key];
			return (featureEl.getAttribute('data-feature-name').toUpperCase().indexOf(inputVal.toUpperCase()) > -1) ?
				featureEl.removeAttribute('aria-hidden') : featureEl.setAttribute('aria-hidden', true);
		});
	}
}

function init() { // eslint-disable-line no-unused-vars
	initDemos();
	initNotesToggles();
	initTestCurrentBrowser();
	initCharts();
	initFeatureFilter();
}
