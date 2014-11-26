var testReport = require('./polyfillTestReport')();
var polyfillsBySize = require('./polyfillsBySize')();

var polyfillsUnder1k = polyfillsBySize.filter(function(polyfill){
	return polyfill.size < 1;
});

function hasTest(polyfill){
	for(var i= 0, l=testReport.hasTests.length; i<l; i++){
		if(testReport.hasTests[i].name === polyfill.name.trim()){
			return true;
		}
	}

	return false;
}

var suggestedPolyfills = polyfillsUnder1k.filter(hasTest);

console.log('The following Polyfills are < 1k and have tests:');
console.log('   ');
suggestedPolyfills.forEach(function(p){
	console.log(p.name);
});


