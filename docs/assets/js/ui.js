/* global google */
'use strict';

// Demos
Array.from(document.querySelectorAll('.demo')).forEach(function(el) {
	var code = document.createElement('pre');
	var xhr = new XMLHttpRequest();
	xhr.open("get", el.getAttribute('data-src'));
	xhr.addEventListener('load', function() {
		el.textContent = this.responseText;
	});
	xhr.send();
	code.classList.add('prettyprint');
	code.innerHTML = '<code>&lt;script src="https://cdn.polyfill.io' + el.getAttribute('data-src') + '"&gt;&lt;/script&gt;</code>';
	el.parentNode.insertBefore(code, el);
});

// Perf charts
function charts() { // eslint-disable-line no-unused-vars
	var chart1;
	var data1;
	var chart2;
	var data2;
	var chart3;
	var data3;
	var	drawCharts = function() {
		chart1 && chart1.draw(data1, {
			chartArea: {
				left: 0,
				top: 0,
				width: '100%',
				height: '90%'
			},
			hAxis: {
				title: 'Time (by day)'
			},
			vAxis: {
				textPosition: 'in',
				minValue: 0
			},
			legend: {
				position: 'none'
			}
		});
		chart2 && chart2.draw(data2, {
			pieHole: 0.6,
			chartArea: {
				left: '5%',
				top: '5%',
				width: '100%',
				height: '90%'
			},
			legend: {
				position: 'labeled'
			},
			pieSliceText: 'none'
		});
		chart3 && chart3.draw(data3, {
			chartArea: {
				left: 30,
				top: 10,
				width: '100%',
				height: '80%'
			},
			legend: {
				position: 'none'
			},
			hAxis: {
				textPosition: 'none'
			},
			vAxis: {
				minValue: 0
			}
		});
	};
	var chartel = document.getElementById('chart-requests');

	if (chartel) {
		google.load('visualization', '1.0', {
			packages: ['corechart'],
			callback: function() {
				if (chartel) {
					data1 = google.visualization.arrayToDataTable(
						Array.from(chartel.querySelectorAll('tr')).map(function(rowel) {
							return Array.from(rowel.querySelectorAll('td,th')).map(function(cellel) {
								return isNaN(cellel.textContent) ? cellel.textContent : parseFloat(cellel.textContent);
							});
						})
					);
					chart1 = new google.visualization.LineChart(chartel);
				}

				chartel = document.getElementById('chart-hitratio');
				if (chartel) {
					data2 = google.visualization.arrayToDataTable(
						Array.from(chartel.querySelectorAll('tr')).map(function(rowel) {
							return Array.from(rowel.querySelectorAll('td,th')).map(function(cellel) {
								return isNaN(cellel.textContent) ? cellel.textContent : parseFloat(cellel.textContent);
							});
						})
					);
					chart2 = new google.visualization.PieChart(chartel);
				}

				chartel = document.getElementById('chart-resptime');
				if (chartel) {
					data3 = google.visualization.arrayToDataTable(
						Array.from(chartel.querySelectorAll('tr')).map(function(rowel) {
							return Array.from(rowel.querySelectorAll('td,th')).map(function(cellel) {
								return isNaN(cellel.textContent) ? cellel.textContent : parseFloat(cellel.textContent);
							});
						})
					);
					chart3 = new google.visualization.LineChart(chartel);
				}

				drawCharts();
			}
		});
		window.onresize = drawCharts;
	}
}

// Test current browser
(function() {
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
}());

// Notes toggle
document.addEventListener('DOMContentLoaded', function() {
	Array.from(document.querySelectorAll('.notes-toggle')).forEach(function(el) {
		el.addEventListener('click', function() {
			el.closest('.feature').classList.toggle('show-notes');
		});
	});
});
