
// Demos
Array.from(document.querySelectorAll('.demo')).forEach(function(el) {
	var xhr = new XMLHttpRequest();
	xhr.open("get", el.getAttribute('data-src'));
	xhr.addEventListener('load', function() {
	  el.textContent = this.responseText;
	});
	xhr.send();
});

// Perf charts
var chart1, data1, chart2, data2, drawCharts;
drawCharts = function() {
	chart1.draw(data1, {
		chartArea:{left:0,top:0,width:'100%',height:'90%'},
		hAxis: {title: 'Time (by hour, last 7 days)'},
		vAxis: {textPosition: 'in'},
		legend: {position: 'none'},
		bar: {groupWidth: '95%'}
	});
	chart2.draw(data2, {
		pieHole: 0.6,
		chartArea:{left:'5%',top:'5%',width:'100%',height:'90%'},
		legend: {position: 'labeled'},
		pieSliceText: 'none'
	});
	chart3.draw(data3, {
		chartArea:{left:30,top:10,width:'100%',height:'80%'},
		legend: {position: 'none'},
		hAxis: {textPosition: 'none'},
		vAxis: {minValue: 0}
	});
}
if (document.getElementById('chart-requests')) {
	google.load('visualization', '1.0', {'packages':['corechart']});
	window.onresize = drawCharts;
	google.setOnLoadCallback(function() {
		var chartel = document.getElementById('chart-requests');
		data1 = google.visualization.arrayToDataTable(
			Array.from(chartel.querySelectorAll('tr')).map(function(rowel) {
				return Array.from(rowel.querySelectorAll('td,th')).map(function(cellel) {
					return isNaN(cellel.textContent) ? cellel.textContent : parseFloat(cellel.textContent);
				});
			})
		);
		chart1 = new google.visualization.ColumnChart(chartel);

		chartel = document.getElementById('chart-hitratio');
		data2 = google.visualization.arrayToDataTable(
			Array.from(chartel.querySelectorAll('tr')).map(function(rowel) {
				return Array.from(rowel.querySelectorAll('td,th')).map(function(cellel) {
					return isNaN(cellel.textContent) ? cellel.textContent : parseFloat(cellel.textContent);
				});
			})
		);
		chart2 = new google.visualization.PieChart(chartel);

		chartel = document.getElementById('chart-resptime');
		data3 = google.visualization.arrayToDataTable(
			Array.from(chartel.querySelectorAll('tr')).map(function(rowel) {
				return Array.from(rowel.querySelectorAll('td,th')).map(function(cellel) {
					return isNaN(cellel.textContent) ? cellel.textContent : parseFloat(cellel.textContent);
				});
			})
		);
		chart3 = new google.visualization.LineChart(chartel);

		drawCharts();
	});
}
